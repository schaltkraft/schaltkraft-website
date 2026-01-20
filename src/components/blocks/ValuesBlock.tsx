'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Award, Lightbulb, Users, Leaf, Shield, Zap, Target, Flag, GraduationCap, Wrench, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface ValuesBlockProps {
    data: any;
}

export function ValuesBlock({ data }: ValuesBlockProps) {
    const items = data.items || [];

    const iconMap: Record<string, any> = {
        quality: Shield,
        shield: Shield,
        innovation: Zap,
        zap: Zap,
        partnerschaft: Users,
        partnership: Users,
        users: Users,
        sustainability: Leaf,
        leaf: Leaf,
        trophy: Award,
        target: Target,
        flag: Flag,
        graduationcap: GraduationCap,
        wrench: Wrench,
        heart: Heart
    };

    return (
        <section className="section-padding-compact bg-black border-y border-white/10">
            <PageContainer>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    variants={staggerContainer}
                >
                    {items.map((item: any, idx: number) => {
                        const iconKey = typeof item.icon === 'string' ? item.icon.toLowerCase() : 'shield';
                        const Icon = iconMap[iconKey] || Shield;

                        return (
                            <motion.div
                                key={idx}
                                className="flex flex-col gap-3 md:gap-4 group"
                                variants={fadeInUp}
                            >
                                <motion.div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange mb-1 md:mb-2"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider text-white border-l-2 border-brand-orange pl-3 md:pl-4">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </PageContainer>
        </section>
    );
}
