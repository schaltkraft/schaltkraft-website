'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface AccordionItem {
    title: string;
    content: string;
}

interface AccordionBlockProps {
    data: {
        headline?: string;
        items: AccordionItem[];
    };
    isNested?: boolean;
}

export function AccordionBlock({ data, isNested }: AccordionBlockProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
                className={isNested ? "w-full border-t border-white/10" : "max-w-3xl border-t border-white/10"}
                variants={fadeInUp}
            >
                {data.items.map((item, index) => (
                    <div key={index} className="border-b border-white/10 hover:border-white/30 transition-colors">
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full py-4 md:py-6 flex items-center justify-between group text-left"
                        >
                            <span className={cn(
                                "text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider transition-colors pr-4",
                                activeIndex === index ? "text-brand-orange" : "text-white group-hover:text-zinc-300"
                            )}>
                                {item.title}
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 md:w-6 md:h-6 text-zinc-500 transition-transform duration-300 group-hover:text-white shrink-0",
                                    activeIndex === index ? "rotate-180 text-brand-orange" : ""
                                )}
                            />
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-6 md:pb-8 text-zinc-400 leading-relaxed text-sm md:text-base">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
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
