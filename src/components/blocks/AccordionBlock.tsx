'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';

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
        <>
            {data.headline && (
                <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-12 uppercase">
                    {data.headline}
                </h2>
            )}

            <div className={isNested ? "w-full border-t border-white/10" : "max-w-3xl border-t border-white/10"}>
                {data.items.map((item, index) => (
                    <div key={index} className="border-b border-white/10 hover:border-white/30 transition-colors">
                        <button
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            className="w-full py-6 flex items-center justify-between group text-left"
                        >
                            <span className={cn(
                                "text-lg md:text-xl font-bold uppercase tracking-wider transition-colors",
                                activeIndex === index ? "text-brand-orange" : "text-white group-hover:text-zinc-300"
                            )}>
                                {item.title}
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-6 h-6 text-zinc-500 transition-transform duration-300 group-hover:text-white",
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
                                    <div className="pb-8 text-zinc-400 leading-relaxed">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
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
