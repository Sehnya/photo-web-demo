import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    logoAlt?: string;
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    cartCount?: number;
    onCartClick?: () => void;
}

const CardNav: React.FC<CardNavProps> = ({
                                             logoAlt = 'Logo',
                                             items,
                                             className = '',
                                             ease = 'power3.out',
                                             baseColor = '#fff',
                                             menuColor,
                                             buttonBgColor,
                                             buttonTextColor,
                                             cartCount = 0,
                                             onCartClick
                                         }) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 68;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 68, overflow: 'hidden' });
        const cards = Array.from(navEl.querySelectorAll('.nav-card')) as HTMLElement[];
        gsap.set(cards, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isExpanded]);

    // Close the menu on route changes so it can be reopened after navigation
    useLayoutEffect(() => {
        const onHashChange = () => {
            // Always force-reset on route change to avoid stale timelines
            closeMenu(true);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const closeMenu = (forceReset = false) => {
        const tl = tlRef.current;
        setIsHamburgerOpen(false);
        if (tl && isExpanded) {
            tl.eventCallback('onReverseComplete', () => {
                setIsExpanded(false);
                // Recreate a fresh timeline to avoid stale state after navigation
                tl.kill();
                const fresh = createTimeline();
                if (fresh) tlRef.current = fresh;
            });
            tl.reverse();
        } else if (forceReset) {
            // Ensure height is reset and timeline is fresh
            if (navRef.current) gsap.set(navRef.current, { height: 68, overflow: 'hidden' });
            if (tl) tl.kill();
            const fresh = createTimeline();
            if (fresh) tlRef.current = fresh;
            setIsExpanded(false);
        }
    };

    const toggleMenu = () => {
        let tl = tlRef.current;
        if (!tl) {
            tl = createTimeline();
            if (tl) tlRef.current = tl;
        }
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            closeMenu();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] max-w-[1200px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[68px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[68px] flex items-center justify-between p-3 pl-[1.1rem] z-[2]">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                            } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                            } group-hover:opacity-75`}
                        />
                    </div>

                    <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
                        <a
                            href="#/"
                            aria-label={logoAlt}
                            className="logo select-none font-semibold tracking-tight text-[14px] md:text-[16px] whitespace-nowrap no-underline hover:opacity-80 transition-opacity"
                            style={{ color: menuColor || '#000' }}
                            onClick={() => closeMenu(true)}
                        >
                            BRANDEN ADAMS PHOTOGRAPHY
                        </a>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <a
                            href="#/book"
                            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-pointer transition-colors duration-300 items-center no-underline"
                            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                        >
                            Book Your Shoot
                        </a>
                        <button
                            type="button"
                            aria-label="Open cart"
                            onClick={onCartClick}
                            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-black/10 hover:bg-black/5 transition-colors"
                            style={{ color: menuColor || '#000' }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45A1.99 1.99 0 0 0 10 19h9v-2h-8.42a.25.25 0 0 1-.22-.37l.94-1.7h5.7a2 2 0 0 0 1.79-1.11l3.58-7.16A1 1 0 0 0 21.5 5H7.42l-.66-1.34A1 1 0 0 0 5.84 3H3v2h2l2 4"/>
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">{cartCount}</span>
                            )}
                        </button>
                        <a href="#/login" className="hidden md:inline-flex items-center justify-center h-10 px-3 rounded-lg border border-black/10 hover:bg-black/5 no-underline" style={{ color: menuColor || '#000' }}>Log in</a>
                        <a href="#/signup" className="hidden md:inline-flex items-center justify-center h-10 px-3 rounded-lg bg-black text-white no-underline">Sign up</a>
                    </div>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[68px] bottom-0 p-3 flex flex-col items-stretch gap-3 justify-start z-[1] ${
                        isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                    } md:flex-row md:items-end md:gap-[14px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                                {item.label}
                            </div>
                            <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                                        href={lnk.href}
                                        aria-label={lnk.ariaLabel}
                                        onClick={() => closeMenu(true)}
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
