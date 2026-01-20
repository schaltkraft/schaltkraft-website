'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, fadeIn, scaleUp, staggerContainer, viewportOnce } from '@/lib/animations';
import React from 'react';

// Animated section wrapper
interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
    children: React.ReactNode;
    variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleUp';
    delay?: number;
    className?: string;
}

export function AnimatedSection({
    children,
    variant = 'fadeInUp',
    delay = 0,
    className = '',
    ...props
}: AnimatedSectionProps) {
    const variants = {
        fadeInUp,
        fadeInLeft,
        fadeInRight,
        fadeIn,
        scaleUp
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={variants[variant]}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.section>
    );
}

// Animated div wrapper
interface AnimatedDivProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleUp';
    delay?: number;
    className?: string;
}

export function AnimatedDiv({
    children,
    variant = 'fadeInUp',
    delay = 0,
    className = '',
    ...props
}: AnimatedDivProps) {
    const variants = {
        fadeInUp,
        fadeInLeft,
        fadeInRight,
        fadeIn,
        scaleUp
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={variants[variant]}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for lists
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: 'div' | 'ul' | 'section';
}

export function StaggerContainer({
    children,
    className = '',
    as = 'div'
}: StaggerContainerProps) {
    const Component = motion[as] as any;

    return (
        <Component
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </Component>
    );
}

// Stagger item
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
    as?: 'div' | 'li' | 'article';
}

export function StaggerItem({
    children,
    className = '',
    as = 'div'
}: StaggerItemProps) {
    const Component = motion[as] as any;

    return (
        <Component
            variants={fadeInUp}
            className={className}
        >
            {children}
        </Component>
    );
}

// Re-export motion for direct use
export { motion };
