'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Settings, FileCheck, Layers, PenTool, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface FeatureItem {
    title: string;
    description?: string;
    icon?: string;
}

interface FeatureGridBlockProps {
    data: {
        headline?: string;
        items: FeatureItem[];
    };
    isNested?: boolean;
}

const iconMap: Record<string, any> = {
    check: CheckCircle2,
    zap: Zap,
    settings: Settings,
    file: FileCheck,
    layers: Layers,
    pen: PenTool,
    layout: LayoutTemplate,
    shield: ShieldCheck
};

export function FeatureGridBlock({ data, isNested }: FeatureGridBlockProps) {
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
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-8 md:mb-12 uppercase"
                >
                    {data.headline}
                </motion.h2>
            )}

            <motion.div
                className={`grid grid-cols-1 sm:grid-cols-2 ${isNested ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-4 md:gap-6`}
                variants={staggerContainer}
            >
                {data.items.map((item, index) => {
                    const Icon = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : CheckCircle2;

                    return (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -5 }}
                            className="bg-zinc-900/50 border border-white/5 p-5 md:p-8 rounded-sm hover:bg-zinc-900 hover:border-brand-orange/30 transition-all duration-300 group"
                        >
                            <motion.div
                                className="mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12 rounded bg-zinc-800 flex items-center justify-center text-brand-orange"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </motion.div>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white uppercase mb-2 md:mb-3 leading-tight">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );

    if (isNested) {
        return <div className="py-8 md:py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="py-12 md:py-16 lg:py-24 bg-zinc-950">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}
