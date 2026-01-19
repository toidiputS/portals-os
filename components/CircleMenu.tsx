'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState } from 'react';
import { Menu, X, Home, Projector, DollarSign, BookOpen, FlaskConical, User, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONSTANTS = {
    itemSize: 52,
    containerSize: 400,
    openStagger: 0.02,
    closeStagger: 0.07,
    innerRadius: 75, // Radius for grandchildren
    outerRadius: 170 // Radius for children
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
    const { x: finalX, y: finalY } = pointOnCircle(index, totalItems, CONSTANTS.innerRadius);
    const [hovering, setHovering] = useState(false);
    const controls = useAnimationControls();
    const pwaId = `${parentLabel}-${index}`;

    React.useEffect(() => {
        if (isOpen && shouldAnimate) {
            const animate = async () => {
                await controls.start({
                    x: parentPosition.x,
                    y: parentPosition.y,
                    opacity: 1,
                    scale: 0.3,
                    transition: { duration: 0 }
                });

                await controls.start({
                    x: 0,
                    y: 0,
                    scale: 0.8,
                    rotate: -360,
                    transition: {
                        delay: (totalItems - 1 - index) * 0.015,
                        duration: 0.5,
                        ease: 'easeOut'
                    }
                });

                await controls.start({
                    rotate: -360 - (index * 360) / totalItems,
                    transition: {
                        duration: 0.3,
                        ease: 'easeInOut'
                    }
                });

                await controls.start({
                    x: finalX,
                    y: finalY,
                    rotate: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                    }
                });
            };
            animate();
        } else if (!isOpen && shouldAnimate) {
            const animate = async () => {
                await controls.start({
                    x: 0,
                    y: 0,
                    rotate: 360,
                    transition: {
                        delay: index * 0.02,
                        duration: 0.3,
                        ease: 'easeIn'
                    }
                });

                await controls.start({
                    x: parentPosition.x,
                    y: parentPosition.y,
                    scale: 0.3,
                    opacity: 0,
                    rotate: 720,
                    transition: {
                        duration: 0.4,
                        ease: 'easeIn'
                    }
                });
            };
            animate();
        }
    }, [isOpen, controls, finalX, finalY, index, totalItems, parentPosition, shouldAnimate]);

    return (
        <motion.button
            animate={controls}
            initial={{ x: parentPosition.x, y: parentPosition.y, opacity: 0, scale: 0.3 }}
            whileHover={{
                scale: 0.9,
                transition: {
                    duration: 0.1,
                    delay: 0
                }
            }}
            style={{
                height: CONSTANTS.itemSize - 12,
                width: CONSTANTS.itemSize - 12,
                zIndex: zIndex,
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
}

const MenuItem = ({ icon, label, href, index, totalItems, isOpen, parentPosition, children, zIndex, onChildClick, parentLetter, onGrandchildClick }: MenuItemProps) => {
    const { x: finalX, y: finalY } = pointOnCircle(index, totalItems, CONSTANTS.outerRadius);
    const [hovering, setHovering] = useState(false);
    const [childrenOpen, setChildrenOpen] = useState(false);
    const [shouldAnimateKids, setShouldAnimateKids] = useState(false);
    const [hasAnimatedParent, setHasAnimatedParent] = useState(false);
    const controls = useAnimationControls();

    React.useEffect(() => {
        if (isOpen && !hasAnimatedParent) {
            setHasAnimatedParent(true);
            const animate = async () => {
                await controls.start({
                    x: parentPosition.x,
                    y: parentPosition.y,
                    opacity: 1,
                    scale: 0.5,
                    transition: { duration: 0 }
                });

                await controls.start({
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 360,
                    transition: {
                        delay: (totalItems - 1 - index) * CONSTANTS.openStagger,
                        duration: 0.6,
                        ease: 'easeOut'
                    }
                });

                await controls.start({
                    rotate: 360 + (index * 360) / totalItems,
                    transition: {
                        duration: 0.4,
                        ease: 'easeInOut'
                    }
                });

                await controls.start({
                    x: finalX,
                    y: finalY,
                    rotate: 0,
                    transition: {
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                    }
                });
            };
            animate();
        } else if (!isOpen && hasAnimatedParent) {
            setHasAnimatedParent(false);
            setChildrenOpen(false);
            setShouldAnimateKids(false);
            const animate = async () => {
                await controls.start({
                    x: 0,
                    y: 0,
                    rotate: -360,
                    transition: {
                        delay: index * CONSTANTS.closeStagger,
                        duration: 0.4,
                        ease: 'easeIn'
                    }
                });

                await controls.start({
                    x: parentPosition.x,
                    y: parentPosition.y,
                    scale: 0.5,
                    opacity: 0,
                    rotate: -720,
                    transition: {
                        duration: 0.5,
                        ease: 'easeIn'
                    }
                });
            };
            animate();
        }
    }, [isOpen, controls, finalX, finalY, index, totalItems, parentPosition, hasAnimatedParent]);

    const childParentPosition = {
        x: 0,
        y: 0
    };

    return (
        <>
            <motion.button
                animate={controls}
                initial={{ x: parentPosition.x, y: parentPosition.y, opacity: 0, scale: 0.5 }}
                whileHover={{
                    scale: childrenOpen ? 0.85 : 1.15,
                    transition: {
                        duration: 0.1,
                        delay: 0
                    }
                }}
                style={{
                    height: CONSTANTS.itemSize - 2,
                    width: CONSTANTS.itemSize - 2,
                    zIndex: zIndex,
                    scale: childrenOpen ? 0.7 : 1,
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
                }}
                className={STYLES.item.container}
                onMouseEnter={() => {
                    setHovering(true);
                    if (children && children.length > 0 && childrenOpen) {
                        // Just bring to top, don't animate kids
                        onChildClick();
                    }
                }}
                onMouseLeave={() => setHovering(false)}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (children && children.length > 0) {
                        // Toggle kids on/off playground (with animation)
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
    onGrandchildClick
}: {
    items: Array<{
        label: string;
        icon: React.ReactNode;
        href: string;
        children?: Array<{ label: string; icon: React.ReactNode; href: string }>;
    }>;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    showTrigger?: boolean;
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
    onGrandchildClick?: (pwa: { id: string; label: string; parentLabel: string }) => void;
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

    // Use external state if provided, otherwise use internal state
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = externalSetIsOpen !== undefined ? externalSetIsOpen : setInternalIsOpen;

    const parentPosition = {
        x: 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 - 32 - CONSTANTS.outerRadius : 0
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none overflow-hidden"
                style={{
                    width: CONSTANTS.containerSize,
                    height: CONSTANTS.containerSize
                }}
            >
                <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                    {items.map((item, index) => {
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

                        return (
                            <MenuItem
                                key={`menu-item-${index}`}
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
                            />
                        );
                    })}
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
