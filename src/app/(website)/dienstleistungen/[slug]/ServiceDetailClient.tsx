'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '@/lib/animations';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Hero Client Component with animations
interface ServiceHeroClientProps {
    title: string;
    subline?: string;
}

export function ServiceHeroClient({ title, subline }: ServiceHeroClientProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
        >
            {/* Breadcrumb */}
            <motion.div variants={fadeInUp} className="mb-6 md:mb-8 flex items-center gap-3">
                <Link href="/dienstleistungen" className="group flex items-center gap-2 text-zinc-500 hover:text-brand-orange transition-colors uppercase tracking-widest text-xs font-bold">
                    <span className="w-6 md:w-8 h-[1px] bg-zinc-700 group-hover:bg-brand-orange transition-colors"></span>
                    Dienstleistungen
                </Link>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end">
                <div className="lg:col-span-8">
                    <motion.h1
                        variants={fadeInUp}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold font-heading uppercase text-white leading-[0.95] mb-6 md:mb-8 break-words hyphens-auto"
                    >
                        {title}
                    </motion.h1>
                    {subline && (
                        <motion.p
                            variants={fadeInUp}
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl border-l-4 border-brand-orange pl-4 md:pl-6 py-2"
                        >
                            {subline}
                        </motion.p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// Content wrapper with animations
interface ServiceContentClientProps {
    children: React.ReactNode;
}

export function ServiceContentClient({ children }: ServiceContentClientProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInUp}
        >
            {children}
        </motion.div>
    );
}

// Sidebar with animations
export function ServiceSidebarClient() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeInRight}
            className="lg:sticky lg:top-32"
        >
            {/* CTA Card */}
            <div className="p-6 md:p-8 bg-zinc-900 border border-white/5 relative overflow-hidden group rounded-sm">
                <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-bl-full -mr-12 -mt-12"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.5 }}
                />

                <h3 className="text-xl md:text-2xl font-heading font-bold uppercase text-white mb-2 relative z-10">
                    Projekt starten
                </h3>
                <p className="text-zinc-400 mb-6 md:mb-8 relative z-10 leading-relaxed text-sm">
                    Haben Sie Fragen oder benötigen Sie eine maßgeschneiderte Lösung? Unser Engineering-Team hilft Ihnen gerne weiter.
                </p>

                <Link href="/contact" className="block relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button className="w-full bg-brand-orange hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest py-5 md:py-6 transition-all duration-300">
                            Kontaktieren <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </motion.div>
                </Link>

                {/* Quick Facts / Standards */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10 relative z-10">
                    <motion.div
                        className="space-y-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-start gap-3 md:gap-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10 text-brand-orange text-sm">
                                ✓
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase">Swiss Made</h4>
                                <p className="text-xs text-zinc-500 mt-1">Fertigung in Romanshorn</p>
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex items-start gap-3 md:gap-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10 text-brand-orange text-sm">
                                ✓
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm uppercase">Zertifiziert</h4>
                                <p className="text-xs text-zinc-500 mt-1">ISO 9001 & EN 61439</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
