/**
 * payments.ts
 * Minimal frontend-only Stripe checkout integration using Stripe Payment Links.
 *
 * Why Payment Links?
 * - Frontend-only: No server required. You can paste hosted checkout URLs.
 * - Supports Apple Pay, Google Pay, and Link automatically when enabled on your Stripe account.
 * - Easiest way to get production-grade checkout fast; later you can upgrade to Checkout Sessions or Payment Element.
 *
 * How to use:
 * 1) In your Stripe Dashboard, create Payment Links for each package (Headshots, Classic, etc.).
 * 2) Paste those URLs below in productPaymentLinks mapping.
 * 3) Optionally set a global fallback PAYMENT_LINK for a catch-all checkout (e.g., a page that lets buyers pick the package again).
 * 4) Ensure Apple Pay/Google Pay/Link are enabled in your Stripe account settings (Payment methods).
 *
 * Upgrading later (server-powered):
 * - Create a server endpoint that makes a Checkout Session or PaymentIntent with the cart.
 * - Use Stripe.js to redirect to Checkout or render the Payment Element.
 * - Payment Element also supports Apple Pay/Google Pay/Link via the Payment Request Button.
 */

export type ProductId = 'headshots' | 'classic' | 'creative' | 'location' | 'branding';

// Map your product/package IDs to their Stripe Payment Link URLs
export const productPaymentLinks: Record<ProductId, string | null> = {
  headshots: null, // e.g., 'https://buy.stripe.com/test_XXXXXXXXXXXX'
  classic: null,
  creative: null,
  location: null,
  branding: null,
};

// Optional: a global Payment Link where customers can pick packages or quantities again
export const PAYMENT_LINK_FALLBACK: string | null = null; // e.g., 'https://buy.stripe.com/test_globalXXXX'

export function getPaymentLinkForProduct(productId: ProductId): string | null {
  return productPaymentLinks[productId] || null;
}
