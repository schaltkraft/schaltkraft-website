'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface TimelineStep {
    title: string;
    description?: string;
}

interface TimelineBlockProps {
    data: {
        headline?: string;
        steps: TimelineStep[];
    };
    isNested?: boolean;
}

export function TimelineBlock({ data, isNested }: TimelineBlockProps) {
    const Content = (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
        >
            {data.headline && (
                <motion.h2
                    variants={fadeInUp}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-10 md:mb-16 uppercase"
                >
                    {data.headline}
                </motion.h2>
            )}

            <div className={isNested ? "relative" : "relative max-w-4xl mx-auto"}>
                {/* Vertical Line - hidden on mobile */}
                <div className="absolute left-[15px] md:left-[19px] top-4 bottom-4 w-[2px] bg-white/10 hidden sm:block" />

                <motion.div className="space-y-8 md:space-y-12" variants={staggerContainer}>
                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-12 group"
                        >
                            {/* Dot/Number */}
                            <motion.div
                                className="shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900 border border-white/20 text-brand-orange font-bold text-xs sm:text-sm z-10 group-hover:border-brand-orange transition-all duration-300"
                                whileHover={{ scale: 1.15 }}
                            >
                                {index + 1}
                            </motion.div>

                            {/* Content */}
                            <div className="pt-0 sm:pt-1 flex-1">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-2">
                                    {step.title}
                                </h3>
                                {step.description && (
                                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );

    if (isNested) {
        return <div className="py-8 md:py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="py-12 md:py-16 lg:py-24 bg-zinc-950 relative overflow-hidden">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}
