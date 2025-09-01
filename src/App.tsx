import React from 'react';
import ScrollVelocity from './components/ScrollVelocity';
import TiltedCard from './components/TiltedCard';
import TargetCursor from "./components/TargetCursor.tsx";
import CardNav from './components/CardNav';
import { AnimatePresence, motion } from 'motion/react';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Book from './pages/Book';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Schedule from './pages/Schedule';
import Checkout from './pages/Checkout';

export default function App() {
    type CartItem = { id: string; title: string; price: number; qty: number };
    const [cart, setCart] = React.useState<CartItem[]>(() => {
        try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
    });
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const [stateCode, setStateCode] = React.useState<string>('CA');

    React.useEffect(() => {
        try { localStorage.setItem('cart', JSON.stringify(cart)); } catch {}
    }, [cart]);

    const addPackageToCart = (pkg: { id: string; title: string; price: number }) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === pkg.id);
            if (existing) {
                return prev.map(i => i.id === pkg.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { id: pkg.id, title: pkg.title, price: pkg.price, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeItem = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
    const changeQty = (id: string, delta: number) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

    const taxRates: Record<string, number> = { CA: 0.0825, NY: 0.088, TX: 0.0625, FL: 0.06, IL: 0.1025, Other: 0.05 };
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const taxRate = taxRates[stateCode] ?? taxRates.Other;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const items = [
        {
            label: "About",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Your Photographer", ariaLabel: "About Branden", href: "#/about" },
                { label: "Your Shoot", ariaLabel: "About The Shoot", href: "#/about/shoot" }
            ]
        },
        {
            label: "Portfolio",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Gallery", ariaLabel: "Image Gallery", href: "#/portfolio" },
                { label: "Reviews", ariaLabel: "Client Reviews", href: "#/portfolio/reviews" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#000000",
            textColor: "#fff",
            links: [
                { label: "Book Your Shoot", ariaLabel: "Booking Information", href: "#/book"},
                { label: "Schedule", ariaLabel: "Schedule your shoot", href: "#/schedule" },
                { label: "Instagram", ariaLabel: "Instagram", href: "https://instagram.com" },

            ]
        }
    ];

    const [route, setRoute] = React.useState<string>(window.location.hash || "#/");

    React.useEffect(() => {
        const onHashChange = () => setRoute(window.location.hash || "#/");
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const pageKey = route.replace('#', '') || '/';
    return (
        <main className="grid min-h-screen place-items-start w-full">
            <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
            />

            <CardNav
                logo={'BRANDEN ADAMS PHOTOGRAPHY'}
                items={items}
                baseColor="#fff"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
                cartCount={cart.reduce((n, i) => n + i.qty, 0)}
                onCartClick={() => setIsCartOpen(true)}
            />

            <AnimatePresence mode="wait">
                {pageKey === '/' && (
                    <motion.section
                        key="home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex flex-col items-center justify-center gap-4 z-0 bg-black text-white font-sans font-black overflow-hidden min-h-screen w-full"
                    >
                        <div className={'absolute md:top-[28%] top-24 left-1/2 -translate-x-1/2 text-center text-2xl md:text-5xl font-black text-white z-10 hidden md:flex flex-col md:flex-row gap-4 md:gap-64 '}>
                            <p className={'text-white cursor-target'}> CREATE.</p>
                            <p className={' text-white cursor-target'}> CAPTURE.</p>
                            <p className={' text-white cursor-target'} > CONNECT  </p>
                        </div>
                        {/* Desktop marquee */}
                        <div className="hidden md:block absolute top-[20%] h-100vh w-[200vw] bg-black p-0 m-0 z-0 overflow-hidden pointer-events-none">
                            <ScrollVelocity
                                texts={[' BRANDEN • ADAMS • PHOTOGRAPHY •']}
                                velocity={100}
                                className="custom-scroll-text relative"
                                scrollerStyle= {{ fontSize: '25vh', lineHeight: '50vh', opacity: 1, textShadow: '0 0 10px #fff' }}
                            />
                        </div>

                        {/* Desktop cards */}
                        <div className="hidden md:block absolute z-10 top-[55%] left-[5%] rotate-3 cursor-target">
                            <TiltedCard
                                imageSrc="/photo-1.png"
                                captionText={ 'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="500px"
                                containerWidth="300px"
                                imageHeight="100%"
                                imageWidth="300px"
                                rotateAmplitude={12}
                                scaleOnHover={1.1}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#FF7A00"
                            />
                        </div>
                        <div className="hidden md:block absolute z-10 top-[55%] left-[43%] -rotate-3 cursor-target">
                            <TiltedCard
                                imageSrc="/photo-2.png"
                                captionText={ 'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="500px"
                                containerWidth="300px"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={12}
                                scaleOnHover={1.1}
                                showMobileWarning={false}
                                showTooltip={true}
                                displayOverlayContent={true}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#8B4513"
                            />
                        </div>
                        <div className="hidden md:block absolute z-10 top-[55%] right-[5%] -rotate-6 cursor-target">
                            <TiltedCard
                                imageSrc="/photo-3.png"
                                captionText={ 'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="500px"
                                containerWidth="300px"
                                imageHeight="100%"
                                imageWidth="300px"
                                rotateAmplitude={12}
                                scaleOnHover={1.1}
                                showMobileWarning={false}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#FF69B4"
                            />
                        </div>

                        {/* Mobile marquee */}
                        <div className="md:hidden absolute top-20 left-0 right-0 w-[200vw] bg-black z-0 overflow-hidden">
                            <ScrollVelocity
                                texts={['BRANDEN • ADAMS • PHOTOGRAPHY']}
                                velocity={60}
                                className="custom-scroll-text relative"
                                scrollerStyle={{ fontSize: '12vh', lineHeight: '24vh', opacity: 1, textShadow: '0 0 6px #fff' }}
                            />
                        </div>

                        {/* Mobile cards stacked with interleaved words */}
                        <div className="md:hidden relative z-10 w-full mt-40 mb-10 flex flex-col items-center gap-6 px-4">
                            <TiltedCard
                                imageSrc="/photo-1.png"
                                captionText={'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="360px"
                                containerWidth="80vw"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={10}
                                scaleOnHover={1.08}
                                showMobileWarning={false}
                                showTooltip={false}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#FF7A00"
                            />
                            {/* Word after first image (mobile only) */}
                            <div className="md:hidden text-white text-3xl font-black tracking-tight">CREATE.</div>
                            <TiltedCard
                                imageSrc="/photo-2.png"
                                captionText={'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="360px"
                                containerWidth="80vw"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={10}
                                scaleOnHover={1.08}
                                showMobileWarning={false}
                                showTooltip={false}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#8B4513"
                            />
                            {/* Word after second image (mobile only) */}
                            <div className="md:hidden text-white text-3xl font-black tracking-tight">CAPTURE.</div>
                            <TiltedCard
                                imageSrc="/photo-3.png"
                                captionText={'BRANDENADAMSPHOTOGRAPHY'}
                                containerHeight="360px"
                                containerWidth="80vw"
                                imageHeight="100%"
                                imageWidth="100%"
                                rotateAmplitude={10}
                                scaleOnHover={1.08}
                                showMobileWarning={false}
                                baseBackgroundColor="transparent"
                                hoverBackgroundColor="#FF69B4"
                            />
                            {/* Word after third image (mobile only) */}
                            <div className="md:hidden text-white text-3xl font-black tracking-tight">CONNECT.</div>
                        </div>
                    </motion.section>
                )}

                {pageKey.startsWith('/about') && (
                    <motion.section key="about" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <About />
                    </motion.section>
                )}
                {pageKey.startsWith('/portfolio') && (
                    <motion.section key="portfolio" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <Portfolio />
                    </motion.section>
                )}
                {pageKey.startsWith('/contact') && (
                    <motion.section key="contact" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <Contact />
                    </motion.section>
                )}
                {pageKey.startsWith('/book') && (
                    <motion.section key="book" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <Book onAddPackage={(pkg) => addPackageToCart(pkg)} />
                    </motion.section>
                )}
                {pageKey.startsWith('/login') && (
                    <motion.section key="login" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="w-full flex flex-col items-center">
                        <Login />
                    </motion.section>
                )}
                {pageKey.startsWith('/signup') && (
                    <motion.section key="signup" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="w-full flex flex-col items-center">
                        <Signup />
                    </motion.section>
                )}
                {pageKey.startsWith('/schedule') && (
                    <motion.section key="schedule" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <Schedule />
                    </motion.section>
                )}
                {pageKey.startsWith('/checkout') && (
                    <motion.section key="checkout" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="w-full flex flex-col items-center">
                        <Checkout />
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black z-[98]"
                            onClick={() => setIsCartOpen(false)}
                        />
                        <motion.aside
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                            className="fixed right-0 top-0 bottom-0 w-[88vw] sm:w-[420px] bg-white text-black z-[99] shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between px-4 h-14 border-b">
                                <div className="font-semibold">Your Cart</div>
                                <button className="px-3 py-1 rounded-md bg-black text-white text-sm" onClick={() => setIsCartOpen(false)}>Close</button>
                            </div>
                            <div className="flex-1 overflow-auto p-4 space-y-4">
                                {cart.length === 0 ? (
                                    <div className="text-center text-gray-500 py-10">Your cart is empty.</div>
                                ) : (
                                    cart.map(item => (
                                        <div key={item.id} className="flex items-center gap-3 border rounded-lg p-3">
                                            <div className="flex-1">
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-sm text-gray-600">${'{'}item.price.toFixed(2){'}'} each</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="px-2 py-1 border rounded" onClick={() => changeQty(item.id, -1)}>-</button>
                                                <span className="w-6 text-center">{item.qty}</span>
                                                <button className="px-2 py-1 border rounded" onClick={() => changeQty(item.id, 1)}>+</button>
                                            </div>
                                            <div className="w-20 text-right font-semibold">${'{'}(item.price * item.qty).toFixed(2){'}'}</div>
                                            <button className="ml-2 text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="border-t p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm text-gray-600" htmlFor="stateSel">State of Residence</label>
                                    <select id="stateSel" className="border rounded px-2 py-1"
                                        value={stateCode}
                                        onChange={(e) => setStateCode(e.target.value)}
                                    >
                                        <option value="CA">CA</option>
                                        <option value="NY">NY</option>
                                        <option value="TX">TX</option>
                                        <option value="FL">FL</option>
                                        <option value="IL">IL</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${'{'}subtotal.toFixed(2){'}'}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Tax ({'${'}(taxRate * 100).toFixed(2){'}'}%)</span>
                                    <span>${'{'}tax.toFixed(2){'}'}</span>
                                </div>
                                <div className="flex items-center justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${'{'}total.toFixed(2){'}'}</span>
                                </div>
                                <button disabled={cart.length===0} className="w-full h-11 rounded-md bg-black text-white disabled:opacity-50" onClick={() => { setIsCartOpen(false); window.location.hash = '#/checkout'; }}>Checkout</button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </main>
    )
}