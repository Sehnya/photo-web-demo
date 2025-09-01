import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
    imageSrc: React.ComponentProps<'img'>['src'];
    altText?: string;
    captionText?: string;
    containerHeight?: React.CSSProperties['height'];
    containerWidth?: React.CSSProperties['width'];
    imageHeight?: React.CSSProperties['height'];
    imageWidth?: React.CSSProperties['width'];
    scaleOnHover?: number;
    baseScale?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    overlayContent?: React.ReactNode;
    displayOverlayContent?: boolean;
    baseBackgroundColor?: string;
    hoverBackgroundColor?: string;
    objectPosition?: string;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

function toRgba(color: string, alpha: number) {
    if (!color || color === 'transparent') return `rgba(0,0,0,0)`;
    // If already rgba or rgb
    if (color.startsWith('rgba') || color.startsWith('rgb')) {
        // try to replace alpha if rgba, otherwise append
        try {
            const nums = color.replace(/rgba?\(|\)/g, '').split(',').map(v => v.trim());
            const [r, g, b] = nums.map((v, i) => (i < 3 ? parseInt(v, 10) : v));
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } catch { /* fallthrough */ }
    }
    // Hex formats: #RRGGBB or #RGB
    if (color[0] === '#') {
        let hex = color.slice(1);
        if (hex.length === 3) {
            hex = hex.split('').map(ch => ch + ch).join('');
        }
        if (hex.length === 6) {
            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    }
    // Fallback to no shadow if unknown
    return `rgba(0,0,0,0)`;
}

export default function TiltedCard({
                                       imageSrc,
                                       altText = 'Tilted card image',
                                       captionText = '',
                                       containerHeight = '300px',
                                       containerWidth = '100%',
                                       imageHeight = '300px',
                                       imageWidth = '300px',
                                       scaleOnHover = 1.1,
                                       baseScale = 0.78,
                                       rotateAmplitude = 14,
                                       showMobileWarning = true,
                                       showTooltip = true,
                                       overlayContent = null,
                                       displayOverlayContent = false,
                                       baseBackgroundColor = 'transparent',
                                       hoverBackgroundColor = 'transparent',
                                       objectPosition = '50% 20%'
                                   }: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(baseScale, springValues);
    const opacity = useSpring(0);
    const rotateFigcaption = useSpring(0, {
        stiffness: 350,
        damping: 30,
        mass: 1
    });

    const [lastY, setLastY] = useState(0);
    const [hovered, setHovered] = useState(false);

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);

        const velocityY = offsetY - lastY;
        rotateFigcaption.set(-velocityY * 0.6);
        setLastY(offsetY);
    }

    function handleMouseEnter() {
        scale.set(baseScale * scaleOnHover);
        opacity.set(1);
        setHovered(true);
    }

    function handleMouseLeave() {
        opacity.set(0);
        scale.set(baseScale);
        rotateX.set(0);
        rotateY.set(0);
        rotateFigcaption.set(0);
        setHovered(false);
    }

    return (
        <figure
            ref={ref}
            className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative rounded-[15px] [transform-style:preserve-3d]"
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    rotateX,
                    rotateY,
                    scale
                }}
                animate={{
                    boxShadow: hovered
                        ? `0 0 0 3px ${toRgba(hoverBackgroundColor, 0.8)}, 0 22px 60px -12px ${toRgba(hoverBackgroundColor, 0.45)}, 0 12px 30px -18px ${toRgba(hoverBackgroundColor, 0.3)}`
                        : `0 0 0 2px ${toRgba(baseBackgroundColor, 0.6)}, 0 10px 28px -14px ${toRgba(baseBackgroundColor, 0.28)}`
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 24, mass: 1.2 }}
            >
                {/* Background layer that changes color on hover (below the image) */}
                <motion.div
                    className="absolute inset-0 rounded-[15px] z-[0]"
                    style={{ backgroundColor: baseBackgroundColor }}
                    animate={{ backgroundColor: hovered ? hoverBackgroundColor : baseBackgroundColor }}
                    transition={{ type: 'spring', stiffness: 100, damping: 30, mass: 2 }}
                />
                <motion.img
                    src={imageSrc}
                    alt={altText}
                    className="absolute top-0 left-0 z-[1] object-cover rounded-[15px] will-change-transform [transform:translateZ(0)]"
                    style={{
                        width: imageWidth,
                        height: imageHeight,
                        objectPosition
                    }}
                />
                {/* Foreground overlay tint so color is visible even if image fills the card */}
                <motion.div
                    className="absolute inset-0 rounded-[15px] z-[2] pointer-events-none"
                    style={{ backgroundColor: hoverBackgroundColor, opacity: 0 }}
                    animate={{ opacity: hovered ? 0.28 : 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1.2 }}
                />

                {displayOverlayContent && overlayContent && (
                    <motion.div className="absolute top-0 left-0 z-[3] will-change-transform [transform:translateZ(30px)]">
                        {overlayContent}
                    </motion.div>
                )}
            </motion.div>

            {showTooltip && (
                <motion.figcaption
                    className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
                    style={{
                        x,
                        y,
                        opacity,
                        rotate: rotateFigcaption
                    }}
                >
                    {captionText}
                </motion.figcaption>
            )}
        </figure>
    );
}
