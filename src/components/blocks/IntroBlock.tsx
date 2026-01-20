'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Target, Flag, Users, Leaf, Award, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '@/lib/animations';

interface IntroBlockProps {
    data: any;
    isNested?: boolean;
    index?: number;
}

export function IntroBlock({ data, isNested, index = 0 }: IntroBlockProps) {
    const text = data?.text || "";
    const links = data?.links || [];
    const imagePosition = data?.imagePosition?.toLowerCase();
    const isReversed = imagePosition === 'right' ? true : imagePosition === 'left' ? false : index % 2 === 1;

    const TextSection = (
        <motion.div
            className={`flex flex-col gap-6 md:gap-8 ${isReversed ? 'order-2 lg:order-1' : 'order-2'}`}
            variants={isReversed ? fadeInRight : fadeInLeft}
        >
            <IntroContent data={data} text={text} links={links} />
        </motion.div>
    );

    const ImageSectionWithOrder = (
        <motion.div
            className={`relative aspect-[4/3] rounded-xl md:rounded-[2rem] overflow-hidden group bg-zinc-900 border border-white/10 ${isReversed ? 'order-1 lg:order-2' : 'order-1'}`}
            variants={isReversed ? fadeInLeft : fadeInRight}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {data.image ? (
                <>
                    <div className="absolute inset-0 border-2 border-white/10 z-10 rounded-xl md:rounded-[2rem] group-hover:border-brand-orange/50 transition-colors duration-500" />
                    <img
                        src={data.image}
                        alt={data.headline || "Intro"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                    />
                </>
            ) : (data.icons && data.icons.length > 0) ? (
                <div className="w-full h-full p-6 md:p-8 grid grid-cols-2 gap-4 items-center justify-center">
                    {data.icons.map((iconStr: string, i: number) => {
                        const iconKey = iconStr.toLowerCase();
                        let Icon = Shield;
                        if (iconKey === 'zap') Icon = Zap;
                        if (iconKey === 'target') Icon = Target;
                        if (iconKey === 'users') Icon = Users;
                        if (iconKey === 'flag') Icon = Flag;

                        return (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center justify-center gap-2 text-brand-orange"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-800 border-2 border-brand-orange/20 flex items-center justify-center mb-1">
                                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/50">{iconStr}</span>
                            </motion.div>
                        )
                    })}
                </div>
            ) : null}
        </motion.div>
    );

    const Content = (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer}
        >
            {(data.image || (data.icons && data.icons.length > 0)) ? (
                <div className={`grid ${isNested ? 'gap-6 md:gap-8' : 'lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24'} items-center`}>
                    {ImageSectionWithOrder}
                    {TextSection}
                </div>
            ) : (
                <div className={isNested ? "flex flex-col gap-6 md:gap-8" : "max-w-4xl mx-auto flex flex-col gap-6 md:gap-8"}>
                    <motion.div variants={fadeInUp}>
                        <IntroContent data={data} text={text} links={links} />
                    </motion.div>
                </div>
            )}
        </motion.div>
    );

    if (isNested) {
        return <div className="py-8 md:py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="section-padding-compact bg-zinc-950">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}

function IntroContent({ data, text, links }: { data: any, text: string, links: any[] }) {
    return (
        <>
            {data.subheadline && (
                <motion.span
                    className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm"
                    variants={fadeInUp}
                >
                    {data.subheadline}
                </motion.span>
            )}
            <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[0.95] font-heading text-white mb-4 md:mb-6"
                variants={fadeInUp}
            >
                {data.headline}
            </motion.h2>

            <motion.div
                className="text-zinc-400 text-base md:text-lg leading-relaxed whitespace-pre-line"
                variants={fadeInUp}
            >
                {text}
            </motion.div>

            {links && links.length > 0 && (
                <motion.div
                    className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-4"
                    variants={fadeInUp}
                >
                    {links.map((link: any, idx: number) => (
                        <Link key={idx} href={link.url || '#'}>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant={idx === 0 ? "primary" : "secondary"}
                                    className={idx === 0
                                        ? "bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-11 md:h-12 uppercase text-sm md:text-base"
                                        : "bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold h-11 md:h-12 uppercase text-sm md:text-base"}
                                >
                                    {link.label}
                                    {idx === 0 && <ArrowRight className="ml-2 w-4 h-4" />}
                                </Button>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            )}
        </>
    );
}
