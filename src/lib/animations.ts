'use client';

import { Variants } from 'framer-motion';

// Fade in from bottom
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Fade in from left
export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -40
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Fade in from right
export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 40
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Simple fade in
export const fadeIn: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

// Scale up
export const scaleUp: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

// Stagger container (slower)
export const staggerContainerSlow: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

// Slide in bar (for accent lines)
export const slideInBar: Variants = {
    hidden: {
        scaleX: 0,
        originX: 0
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

// Card hover
export const cardHover = {
    rest: {
        scale: 1,
        y: 0
    },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
};

// Viewport settings for scroll animations
export const viewportOnce = {
    once: true,
    margin: '-50px',
    amount: 0.2 as const
};

export const viewportMultiple = {
    once: false,
    margin: '-50px',
    amount: 0.3 as const
};
