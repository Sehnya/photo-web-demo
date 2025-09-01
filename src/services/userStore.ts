/**
 * UserStore: minimal cloud-like data layer abstraction.
 *
 * Default implementation: localStorage. In production, replace with Firebase or Supabase.
 *
 * To switch to a real cloud DB:
 * - Firebase Auth/Firestore: map createPendingUser -> create auth user with email/password disabled; store verificationCode/expiresAt in Firestore; send email via Firebase Extensions or SendGrid; on verify, set a `verified:true` flag and allow login.
 * - Supabase: use supabase.auth.signUp for email/password; leverage email OTP; or store a custom verification code in a table and send via a serverless function.
 *
 * NOTE: This demo stores data in localStorage in plain text and is NOT secure.
 */

export type PendingUser = {
  id: string; // email serves as id for simplicity
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string; // WARNING: plain text for demo only
  marketingOptIn: boolean;
  verificationCode: string;
  expiresAt: number; // epoch ms
};

export type User = {
  id: string; // email
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string; // WARNING: plain text for demo only
  marketingOptIn: boolean;
  verified: boolean;
  createdAt: number;
};

export type SubscriptionConsent = {
  email: string;
  marketingOptIn: boolean;
  timestamp: number;
};

export interface IUserStore {
  createPendingUser(data: Omit<PendingUser, 'verificationCode' | 'expiresAt' | 'id'> & { email: string }): Promise<{ code: string; expiresAt: number }>;
  resendVerificationCode(email: string): Promise<{ code: string; expiresAt: number }>;
  verifyUser(email: string, code: string): Promise<boolean>;
  getUserByEmail(email: string): Promise<User | null>;
  signIn(email: string, password: string): Promise<{ ok: boolean; reason?: string; user?: User }>;
  saveSubscriptionConsent(consent: SubscriptionConsent): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  setCurrentUser(user: User | null): Promise<void>;
}

const LS_KEYS = {
  pending: 'demo.pendingUsers',
  users: 'demo.users',
  session: 'demo.currentUser',
  subs: 'demo.subscriptions'
};

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generateCode(): string {
  // 6-digit code via crypto if available; fallback to Math.random
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const arr = new Uint32Array(1);
    (crypto as Crypto).getRandomValues(arr);
    return (arr[0] % 1_000_000).toString().padStart(6, '0');
  }
  return Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
}

export const userStore: IUserStore = {
  async createPendingUser(data) {
    const users = readJSON<User[]>(LS_KEYS.users, []);
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      // If user already exists and verified, block. If unverified, allow resend.
      throw new Error('An account with this email already exists. Please log in.');
    }
    const pendings = readJSON<PendingUser[]>(LS_KEYS.pending, []);
    const now = Date.now();
    const code = generateCode();
    const expiresAt = now + 15 * 60 * 1000; // 15 minutes
    const record: PendingUser = {
      id: data.email.toLowerCase(),
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      password: data.password,
      marketingOptIn: data.marketingOptIn,
      verificationCode: code,
      expiresAt
    };
    const filtered = pendings.filter(p => p.email !== record.email);
    filtered.push(record);
    writeJSON(LS_KEYS.pending, filtered);
    // TODO: Send email with code using provider (SendGrid, Postmark, etc.)
    return { code, expiresAt };
  },

  async resendVerificationCode(email: string) {
    const pendings = readJSON<PendingUser[]>(LS_KEYS.pending, []);
    const p = pendings.find(x => x.email === email.toLowerCase());
    const code = generateCode();
    const expiresAt = Date.now() + 15 * 60 * 1000;
    if (p) {
      p.verificationCode = code;
      p.expiresAt = expiresAt;
      writeJSON(LS_KEYS.pending, pendings);
    } else {
      // Create stub pending if none exists yet
      const stub: PendingUser = {
        id: email.toLowerCase(),
        email: email.toLowerCase(),
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        marketingOptIn: false,
        verificationCode: code,
        expiresAt
      };
      pendings.push(stub);
      writeJSON(LS_KEYS.pending, pendings);
    }
    // TODO: Send email with new code
    return { code, expiresAt };
  },

  async verifyUser(email: string, code: string) {
    const pendings = readJSON<PendingUser[]>(LS_KEYS.pending, []);
    const idx = pendings.findIndex(p => p.email === email.toLowerCase());
    if (idx === -1) return false;
    const p = pendings[idx];
    if (Date.now() > p.expiresAt) return false;
    if (p.verificationCode !== code) return false;

    const users = readJSON<User[]>(LS_KEYS.users, []);
    const user: User = {
      id: p.email,
      email: p.email,
      firstName: p.firstName,
      lastName: p.lastName,
      phone: p.phone,
      password: p.password,
      marketingOptIn: p.marketingOptIn,
      verified: true,
      createdAt: Date.now()
    };
    const existingIdx = users.findIndex(u => u.email === user.email);
    if (existingIdx >= 0) users.splice(existingIdx, 1);
    users.push(user);
    writeJSON(LS_KEYS.users, users);

    pendings.splice(idx, 1);
    writeJSON(LS_KEYS.pending, pendings);
    return true;
  },

  async getUserByEmail(email: string) {
    const users = readJSON<User[]>(LS_KEYS.users, []);
    return users.find(u => u.email === email.toLowerCase()) || null;
  },

  async signIn(email: string, password: string) {
    const users = readJSON<User[]>(LS_KEYS.users, []);
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) return { ok: false, reason: 'No account found for this email.' };
    if (!user.verified) return { ok: false, reason: 'Please verify your email before logging in.' };
    if (user.password !== password) return { ok: false, reason: 'Invalid credentials.' };
    return { ok: true, user };
  },

  async saveSubscriptionConsent(consent: SubscriptionConsent) {
    const subs = readJSON<SubscriptionConsent[]>(LS_KEYS.subs, []);
    subs.push(consent);
    writeJSON(LS_KEYS.subs, subs);
  },

  async getCurrentUser() {
    return readJSON<User | null>(LS_KEYS.session, null);
  },

  async setCurrentUser(user: User | null) {
    if (user) writeJSON(LS_KEYS.session, user);
    else localStorage.removeItem(LS_KEYS.session);
  }
};

export default userStore;
