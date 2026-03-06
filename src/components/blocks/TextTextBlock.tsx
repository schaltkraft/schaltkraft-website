'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInLeft, fadeInRight } from '@/lib/animations';

interface TextTextBlockProps {
    data: {
        titleLeft?: string;
        textLeft?: string;
        titleRight?: string;
        textRight?: string;
    };
    isNested?: boolean;
    index?: number;
}

export function TextTextBlock({ data, isNested = false, index = 0 }: TextTextBlockProps) {
    const isEven = index % 2 === 0;

    // Decide background color based on index or nested state
    const bgClass = isNested ? "bg-transparent" : (isEven ? "bg-white" : "bg-zinc-50");

    return (
        <section className={`py-16 md:py-24 lg:py-32 relative overflow-hidden ${bgClass}`}>
            <PageContainer>
                <motion.div
                    className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                >
                    {/* Left Column */}
                    <motion.div variants={fadeInLeft} className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
                            {data.titleLeft}
                        </h2>
                        <div className="w-12 h-1 bg-brand-orange" />
                        <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                            {data.textLeft}
                        </p>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div variants={fadeInRight} className="flex flex-col gap-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
                            {data.titleRight}
                        </h2>
                        <div className="w-12 h-1 bg-brand-orange" />
                        <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                            {data.textRight}
                        </p>
                    </motion.div>

                </motion.div>
            </PageContainer>
        </section>
    );
}
