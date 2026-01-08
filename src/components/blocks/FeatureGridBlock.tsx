'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Settings, FileCheck, Layers, PenTool, LayoutTemplate, ShieldCheck } from 'lucide-react';

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
        <>
            {data.headline && (
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-12 uppercase">
                    {data.headline}
                </h2>
            )}

            <div className={`grid sm:grid-cols-2 ${isNested ? 'lg:grid-cols-2' : 'lg:grid-cols-4'} gap-6`}>
                {data.items.map((item, index) => {
                    // Default to 'check' if no icon or unknown icon
                    const Icon = (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : CheckCircle2;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900/50 border border-white/5 p-8 rounded-sm hover:bg-zinc-900 hover:border-brand-orange/30 transition-all duration-300 group"
                        >
                            <div className="mb-6 w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase mb-3 leading-tight">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </>
    );

    if (isNested) {
        return <div className="py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="py-16 md:py-24 bg-zinc-950">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}
