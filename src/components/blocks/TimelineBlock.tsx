'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';

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
        <>
            {data.headline && (
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-16 uppercase">
                    {data.headline}
                </h2>
            )}

            <div className={isNested ? "relative" : "relative max-w-4xl mx-auto"}>
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/10 hidden md:block" />

                <div className="space-y-12">
                    {data.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 group"
                        >
                            {/* Dot/Number */}
                            <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-white/20 text-brand-orange font-bold text-sm z-10 group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <div className="pt-1">
                                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-2">
                                    {step.title}
                                </h3>
                                {step.description && (
                                    <p className="text-zinc-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );

    if (isNested) {
        return <div className="py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}
