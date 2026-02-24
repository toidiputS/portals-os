'use client';

import { AnimatePresence, motion, useAnimationControls, animate, useMotionValue, useTransform, useAnimationFrame, usePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X, Home, Projector, DollarSign, BookOpen, FlaskConical, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
    itemSize: 52,
    containerSize: 400,
    openStagger: 0.02,
    closeStagger: 0.07,
    innerRadius: 65, // Radius for grandchildren
    outerRadius: 120 // Radius for children
};

const STYLES: Record<string, Record<string, string>> = {
    trigger: {
        container:
            'rounded-full flex items-center bg-foreground justify-center cursor-pointer outline-none ring-0 hover:brightness-125 transition-all duration-100 z-50',
        active: 'bg-foreground'
    },
    item: {
        container:
            'rounded-full flex items-center justify-center absolute cursor-pointer border-2 border-white/30 shadow-lg hover:border-purple-400/60 transition-colors',
        label: 'text-xs text-white absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap'
    },
    grandchild: {
        container:
            'rounded-full flex items-center justify-center absolute cursor-pointer border-2 border-white/30 shadow-lg hover:border-purple-400/60 transition-colors text-white',
        label: 'text-xs text-white absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap'
    }
};

const pointOnCircle = (i: number, n: number, r: number, cx = 0, cy = 0) => {
    const theta = (2 * Math.PI * i) / n - Math.PI / 2;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    return { x, y };
};

interface GrandchildProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    index: number;
    totalItems: number;
    isOpen: boolean;
    parentPosition: { x: number; y: number };
    zIndex: number;
    shouldAnimate: boolean;
    parentLabel: string;
    onGrandchildClick?: (pwa: { id: string; label: string; parentLabel: string }) => void;
}

const Grandchild = ({ icon, label, href, index, totalItems, isOpen, parentPosition, zIndex, shouldAnimate, parentLabel, onGrandchildClick }: GrandchildProps) => {
    const baseTheta = (Math.PI * 2 * index) / totalItems - Math.PI / 2;
    const [hovering, setHovering] = useState(false);
    const pwaId = `${parentLabel}-${index}`;

    const orbitOffset = useMotionValue(0);
    const alignOffset = useMotionValue(baseTheta - Math.PI * 2);
    const radiusVal = useMotionValue(0);

    // Grandchildren spawn from the center
    const xVal = useMotionValue(parentPosition.x);
    const yVal = useMotionValue(parentPosition.y);
    const scaleVal = useMotionValue(0.3);
    const opacityVal = useMotionValue(0);

    const x = useTransform(() => xVal.get() + Math.cos(orbitOffset.get() + alignOffset.get()) * radiusVal.get());
    const y = useTransform(() => yVal.get() + Math.sin(orbitOffset.get() + alignOffset.get()) * radiusVal.get());

    const isOrbiting = React.useRef(false);
    // Grandchildren don't unmount when closed, they rely on `shouldAnimate` and `isOpen` as toggles!
    // We shouldn't use `usePresence` for grandchildren if they are always conditionally passed `isOpen`.
    // Wait, the children array maps over them but they are conditionally triggered via `shouldAnimate`.

    React.useEffect(() => {
        if (isOpen && shouldAnimate) {
            const animateIn = async () => {
                opacityVal.set(1);
                scaleVal.set(0.3);
                xVal.set(parentPosition.x);
                yVal.set(parentPosition.y);
                alignOffset.set(baseTheta - Math.PI * 2);
                radiusVal.set(0);

                const delay = (totalItems - 1 - index) * 0.015;

                animate(scaleVal, 0.8, { duration: 0.5, ease: 'easeOut', delay });
                animate(xVal, 0, { duration: 0.5, ease: 'easeOut', delay });
                await animate(yVal, 0, { duration: 0.5, ease: 'easeOut', delay });

                animate(alignOffset, baseTheta, { duration: 0.3, ease: 'easeInOut' });
                await animate(radiusVal, CONSTANTS.innerRadius, { type: 'spring', stiffness: 200, damping: 20 });

                isOrbiting.current = true;
            };
            animateIn();
        } else if (!isOpen && shouldAnimate) {
            isOrbiting.current = false;
            setHovering(false);

            const animateOut = async () => {
                const delay = index * 0.02;

                animate(alignOffset, alignOffset.get() + Math.PI * 2, { duration: 0.3, ease: 'easeIn', delay });
                await animate(radiusVal, 0, { duration: 0.3, ease: 'easeIn', delay });

                animate(scaleVal, 0.3, { duration: 0.4, ease: 'easeIn' });
                animate(opacityVal, 0, { duration: 0.4, ease: 'easeIn' });
                animate(xVal, parentPosition.x, { duration: 0.4, ease: 'easeIn' });
                await animate(yVal, parentPosition.y, { duration: 0.4, ease: 'easeIn' });
            };
            animateOut();
        }
    }, [isOpen, shouldAnimate]);

    // Dynamic repositioning
    const prevTotalRef = React.useRef(totalItems);
    React.useEffect(() => {
        if (isOpen && shouldAnimate && prevTotalRef.current !== totalItems) {
            animate(alignOffset, baseTheta, { type: 'spring', stiffness: 150, damping: 20, mass: 1 });
        }
        prevTotalRef.current = totalItems;
    }, [totalItems, baseTheta, isOpen, shouldAnimate]);

    // Continuous Rotation (Astrolabe effect - clockwise slightly faster)
    useAnimationFrame((time, delta) => {
        if (isOrbiting.current) {
            const speed = (Math.PI * 2) / 80000;
            orbitOffset.set(orbitOffset.get() + delta * speed);
        }
    });

    return (
        <motion.div style={{ x, y, opacity: opacityVal, scale: scaleVal, position: 'absolute', zIndex }}>
            <motion.button
                whileHover={{ scale: 1.25, transition: { duration: 0.1 } }}
                style={{
                    height: CONSTANTS.itemSize - 12,
                    width: CONSTANTS.itemSize - 12,
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
                }}
                className={STYLES.grandchild.container}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onGrandchildClick) {
                        onGrandchildClick({ id: pwaId, label, parentLabel });
                    } else if (href !== '#') {
                        window.location.href = href;
                    }
                }}
            >
                {icon}
                {hovering && <p className={STYLES.grandchild.label}>{label}</p>}
            </motion.button>
        </motion.div>
    );
};

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    index: number;
    totalItems: number;
    isOpen: boolean;
    parentPosition: { x: number; y: number };
    children?: Array<{ label: string; icon: React.ReactNode; href: string }>;
    zIndex: number;
    onChildClick: () => void;
    parentLetter?: string;
    onGrandchildClick?: (pwa: { id: string; label: string; parentLabel: string }) => void;
    colorHex?: string;
    nodeData?: any;
    radius?: number;
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, parentPosition, children, zIndex, onChildClick, parentLetter, onGrandchildClick, colorHex, radius = CONSTANTS.outerRadius }: MenuItemProps) => {
    const baseTheta = (Math.PI * 2 * index) / totalItems - Math.PI / 2;
    const [hovering, setHovering] = useState(false);
    const [childrenOpen, setChildrenOpen] = useState(false);
    const [shouldAnimateKids, setShouldAnimateKids] = useState(false);

    const orbitOffset = useMotionValue(0);
    const alignOffset = useMotionValue(baseTheta - Math.PI * 2);
    const radiusVal = useMotionValue(0);

    const xVal = useMotionValue(parentPosition.x);
    const yVal = useMotionValue(parentPosition.y);
    const scaleVal = useMotionValue(0.5);
    const opacityVal = useMotionValue(0);

    const x = useTransform(() => xVal.get() + Math.cos(orbitOffset.get() + alignOffset.get()) * radiusVal.get());
    const y = useTransform(() => yVal.get() + Math.sin(orbitOffset.get() + alignOffset.get()) * radiusVal.get());

    const isOrbiting = React.useRef(false);
    const hasRanEntrance = React.useRef(false);

    const [isPresent, safeToRemove] = usePresence();

    React.useEffect(() => {
        if (isPresent && !hasRanEntrance.current) {
            hasRanEntrance.current = true;

            opacityVal.set(0);
            scaleVal.set(0.5);
            xVal.set(parentPosition.x);
            yVal.set(parentPosition.y);
            alignOffset.set(baseTheta - Math.PI * 2);
            radiusVal.set(0);

            const animateIn = async () => {
                const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
                const delay = isMobile ? index * 0.05 : (totalItems - 1 - index) * CONSTANTS.openStagger;

                animate(opacityVal, 1, { duration: 0.1, delay });
                animate(scaleVal, 1, { duration: 0.6, ease: 'easeOut', delay });
                animate(xVal, 0, { duration: 0.6, ease: 'easeOut', delay });
                await animate(yVal, 0, { duration: 0.6, ease: 'easeOut', delay });

                animate(alignOffset, baseTheta, { duration: 0.4, ease: 'easeInOut' });
                await animate(radiusVal, radius, { type: 'spring', stiffness: 200, damping: 20 });

                isOrbiting.current = true;
            };
            animateIn();

        } else if (!isPresent) {
            isOrbiting.current = false;
            setChildrenOpen(false);
            setShouldAnimateKids(false);
            setHovering(false);

            const animateOut = async () => {
                const delay = index * CONSTANTS.closeStagger;

                animate(alignOffset, alignOffset.get() - Math.PI * 2, { duration: 0.4, ease: 'easeIn', delay });
                await animate(radiusVal, 0, { duration: 0.4, ease: 'easeIn', delay });

                animate(scaleVal, 0.5, { duration: 0.5, ease: 'easeIn' });
                animate(opacityVal, 0, { duration: 0.5, ease: 'easeIn' });
                animate(xVal, parentPosition.x, { duration: 0.5, ease: 'easeIn' });
                await animate(yVal, parentPosition.y, { duration: 0.5, ease: 'easeIn' });

                safeToRemove();
            };
            animateOut();
        }
    }, [isPresent]);

    // Dynamic repositioning
    const prevTotalParentRef = React.useRef(totalItems);
    React.useEffect(() => {
        if (isPresent && hasRanEntrance.current && prevTotalParentRef.current !== totalItems) {
            animate(alignOffset, baseTheta, { type: 'spring', stiffness: 150, damping: 20, mass: 1 });
            animate(radiusVal, radius, { type: 'spring', stiffness: 150, damping: 20, mass: 1 });
        }
        prevTotalParentRef.current = totalItems;
    }, [totalItems, baseTheta, radius, isPresent]);

    // Continuous Rotation (Counter-clockwise slow orbit)
    useAnimationFrame((time, delta) => {
        if (isOrbiting.current) {
            const speed = (Math.PI * 2) / 120000;
            orbitOffset.set(orbitOffset.get() - delta * speed);
        }
    });

    const childParentPosition = { x: 0, y: 0 };

    return (
        <>
            <motion.div
                style={{
                    x,
                    y,
                    opacity: opacityVal,
                    scale: scaleVal,
                    position: 'absolute',
                    zIndex: zIndex
                }}
            >
                <motion.button
                    animate={{
                        scale: childrenOpen ? 0.7 : 1,
                    }}
                    whileHover={{
                        scale: childrenOpen ? 0.85 : 1.15,
                        transition: { duration: 0.1 }
                    }}
                    style={{
                        height: CONSTANTS.itemSize - 2,
                        width: CONSTANTS.itemSize - 2,
                        background: colorHex
                            ? `linear-gradient(135deg, ${colorHex}40 0%, ${colorHex}20 50%, #0f0f23 100%)`
                            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
                        ...(colorHex && {
                            borderColor: hovering || childrenOpen ? colorHex : `${colorHex}60`,
                            boxShadow: hovering || childrenOpen ? `0 0 15px ${colorHex}80` : `0 0 10px ${colorHex}40`
                        })
                    }}
                    className={STYLES.item.container}
                    onMouseEnter={() => {
                        setHovering(true);
                        if (children && children.length > 0 && childrenOpen) {
                            onChildClick();
                        }
                    }}
                    onMouseLeave={() => setHovering(false)}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (children && children.length > 0) {
                            onChildClick();
                            setShouldAnimateKids(true);
                            setChildrenOpen(!childrenOpen);
                        } else if (href !== '#') {
                            window.location.href = href;
                        }
                    }}
                >
                    {icon}
                    {hovering && <p className={STYLES.item.label}>{label}</p>}
                </motion.button>
            </motion.div>

            {children && children.length > 0 && children.map((child, childIndex) => (
                <Grandchild
                    key={`grandchild-${index}-${childIndex}`}
                    icon={parentLetter ? <span className="text-[10px] font-bold leading-none">{parentLetter}{String(childIndex + 1).padStart(2, '0')}</span> : child.icon}
                    label={child.label}
                    href={child.href}
                    index={childIndex}
                    totalItems={children.length}
                    isOpen={childrenOpen && isOpen}
                    parentPosition={childParentPosition}
                    zIndex={zIndex}
                    shouldAnimate={shouldAnimateKids}
                    parentLabel={label}
                    onGrandchildClick={onGrandchildClick}
                />
            ))}
        </>
    );
};

interface MenuTriggerProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    itemsLength: number;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
}

const MenuTrigger = ({
    setIsOpen,
    isOpen,
    itemsLength,
    openIcon,
    closeIcon
}: MenuTriggerProps) => {
    const animate = useAnimationControls();
    const shakeAnimation = useAnimationControls();

    const scaleTransition = Array.from({ length: itemsLength - 1 })
        .map((_, index) => index + 1)
        .reduce((acc, _, index) => {
            const increasedValue = index * 0.15;
            acc.push(1 + increasedValue);
            return acc;
        }, [] as number[]);

    const spiralAnimation = async () => {
        shakeAnimation.start({
            translateX: [0, 2, -2, 0, 2, -2, 0],
            transition: {
                duration: CONSTANTS.closeStagger,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop'
            }
        });
        for (let i = 0; i < scaleTransition.length; i++) {
            await animate.start({
                height: Math.min(
                    CONSTANTS.itemSize * scaleTransition[i],
                    CONSTANTS.itemSize + CONSTANTS.itemSize / 2
                ),
                width: Math.min(
                    CONSTANTS.itemSize * scaleTransition[i],
                    CONSTANTS.itemSize + CONSTANTS.itemSize / 2
                ),
                backgroundColor: `color-mix(in srgb, var(--foreground) ${Math.max(
                    100 - i * 10,
                    40
                )}%, var(--background))`,
                transition: {
                    duration: CONSTANTS.closeStagger / 2,
                    ease: 'linear'
                }
            });
            if (i !== scaleTransition.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
            }
        }

        shakeAnimation.stop();
        shakeAnimation.start({
            translateX: 0,
            transition: {
                duration: 0
            }
        });

        animate.start({
            height: CONSTANTS.itemSize,
            width: CONSTANTS.itemSize,
            backgroundColor: 'var(--foreground)',
            transition: {
                duration: 0.1,
                ease: 'backInOut'
            }
        });
    };

    return (
        <motion.div animate={shakeAnimation} className="z-50">
            <motion.button
                animate={animate}
                style={{
                    height: CONSTANTS.itemSize,
                    width: CONSTANTS.itemSize
                }}
                className={cn(STYLES.trigger.container, isOpen && STYLES.trigger.active)}
                onClick={() => {
                    spiralAnimation();
                    setIsOpen(!isOpen);
                }}
            >
                <AnimatePresence mode="popLayout">
                    {isOpen ? (
                        <motion.span
                            key="menu-close"
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'blur(0px)'
                            }}
                            exit={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                        >
                            {closeIcon}
                        </motion.span>
                    ) : (
                        <motion.span
                            key="menu-open"
                            initial={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: 1,
                                filter: 'blur(0px)'
                            }}
                            exit={{
                                opacity: 0,
                                filter: 'blur(10px)'
                            }}
                            transition={{
                                duration: 0.2
                            }}
                        >
                            {openIcon}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </motion.div>
    );
};

export const CircleMenu = ({
    items,
    isOpen: externalIsOpen,
    setIsOpen: externalSetIsOpen,
    showTrigger = true,
    openIcon = <Menu size={18} className="text-background" />,
    closeIcon = <X size={18} className="text-background" />,
    onGrandchildClick,
    radius
}: {
    items: Array<{
        label: string;
        icon: React.ReactNode;
        href: string;
        children?: Array<{ label: string; icon: React.ReactNode; href: string }>;
        colorHex?: string;
        nodeData?: any;
    }>;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    showTrigger?: boolean;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
    onGrandchildClick?: (pwa: { id: string; label: string; parentLabel: string }) => void;
    radius?: number;
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);
    const [dynamicRadius, setDynamicRadius] = useState(radius || 120);

    React.useEffect(() => {
        if (radius) return;
        const updateRadius = () => {
            const minDim = Math.min(window.innerWidth, window.innerHeight);
            // Outer rim of the portal is roughly 35-40% of the screen dimension
            setDynamicRadius(minDim * 0.38);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, [radius]);

    // Use external state if provided, otherwise use internal state
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

    const parentPosition = {
        x: 0,
        // The container is fixed 50% down the screen, so +innerHeight/2 reaches the bottom edge.
        // -60px accounts for the Speedbump taskbar height where the nodes should emerge from.
        y: typeof window !== 'undefined' ? window.innerHeight / 2 - 60 : 0
    };

    return (
        <>
            {showTrigger && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <MenuTrigger
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        itemsLength={items.length}
                        openIcon={openIcon}
                        closeIcon={closeIcon}
                    />
                </div>
            )}

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                style={{
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                    <AnimatePresence mode="popLayout">
                        {isOpen && items.map((item, index) => {
                            // Extract letter from icon or label
                            let parentLetter = '';
                            if (typeof item.icon === 'object' && item.icon && 'props' in item.icon) {
                                const iconProps = (item.icon as any).props;
                                if (iconProps.children) {
                                    parentLetter = iconProps.children;
                                }
                            }
                            if (!parentLetter) {
                                parentLetter = item.label.charAt(0);
                            }

                            const itemKey = item.nodeData?.id && (item as any).domainId
                                ? `menu-item-${(item as any).domainId}-${item.nodeData.id}`
                                : `menu-item-${index}`;

                            return (
                                <MenuItem
                                    key={itemKey}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    index={index}
                                    totalItems={items.length}
                                    isOpen={isOpen}
                                    parentPosition={parentPosition}
                                    children={item.children}
                                    zIndex={lastClickedIndex === index ? 100 : 10}
                                    onChildClick={() => setLastClickedIndex(index)}
                                    parentLetter={parentLetter}
                                    onGrandchildClick={onGrandchildClick}
                                    colorHex={item.colorHex}
                                    radius={dynamicRadius}
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default function CircleMenuDemo() {
    const grandchildren = [
        { label: 'Sub 1', icon: <Home size={12} />, href: '#' },
        { label: 'Sub 2', icon: <Projector size={12} />, href: '#' },
        { label: 'Sub 3', icon: <DollarSign size={12} />, href: '#' },
        { label: 'Sub 4', icon: <BookOpen size={12} />, href: '#' },
        { label: 'Sub 5', icon: <FlaskConical size={12} />, href: '#' }
    ];

    // VIP gets BOO (6th kid - the Wiki)
    const vipChildren = [
        ...grandchildren,
        { label: 'BOO (Wiki)', icon: <BookOpen size={12} />, href: '#' }
    ];

    return (
        <div className="w-full h-screen flex items-center justify-center bg-background">
            <CircleMenu
                items={[
                    { label: 'VIP-AIFred', icon: <span className="text-xs font-bold">VIP</span>, href: '#', children: vipChildren },
                    { label: 'Alpha', icon: <span className="text-xs font-bold">A</span>, href: '#', children: grandchildren },
                    { label: 'Beta', icon: <span className="text-xs font-bold">B</span>, href: '#', children: grandchildren },
                    { label: 'Delta', icon: <span className="text-xs font-bold">D</span>, href: '#', children: grandchildren },
                    { label: 'Epsilon', icon: <span className="text-xs font-bold">E</span>, href: '#', children: grandchildren },
                    { label: 'Gamma', icon: <span className="text-xs font-bold">G</span>, href: '#', children: grandchildren },
                    { label: 'Kappa', icon: <span className="text-xs font-bold">Κ</span>, href: '#', children: grandchildren },
                    { label: 'Oracle', icon: <span className="text-xs font-bold">ORC</span>, href: '#' },
                    { label: 'Lambda', icon: <span className="text-xs font-bold">L</span>, href: '#', children: grandchildren },
                    { label: 'Omni', icon: <span className="text-xs font-bold">O</span>, href: '#', children: grandchildren },
                    { label: 'Pi', icon: <span className="text-xs font-bold">P</span>, href: '#', children: grandchildren },
                    { label: 'Rho', icon: <span className="text-xs font-bold">R</span>, href: '#', children: grandchildren },
                    { label: 'Sigma', icon: <span className="text-xs font-bold">S</span>, href: '#', children: grandchildren },
                    { label: 'Tau', icon: <span className="text-xs font-bold">Τ</span>, href: '#', children: grandchildren }
                ]}
            />
        </div>
    );
}
