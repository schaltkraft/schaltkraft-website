'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportOnce } from '@/lib/animations';

interface ContactTeaserBlockProps {
    data: {
        headline?: string;
        text?: string;
    }
}

export function ContactTeaserBlock({ data }: ContactTeaserBlockProps) {
    return (
        <section className="py-16 md:py-24 bg-zinc-900 border-t border-white/10">
            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                    {/* Text Side */}
                    <motion.div
                        className="lg:sticky lg:top-32"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={staggerContainer}
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase mb-4 md:mb-6"
                        >
                            {data.headline || 'Kontaktieren Sie uns'}
                        </motion.h2>
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg md:text-xl text-zinc-400 mb-6 md:mb-8 max-w-md"
                        >
                            {data.text || 'Wir freuen uns auf Ihre Anfrage.'}
                        </motion.p>
                        <motion.div
                            className="hidden lg:flex flex-col gap-6 md:gap-8 mt-8 md:mt-12"
                            variants={staggerContainer}
                        >
                            <motion.div className="flex flex-col gap-6" variants={fadeInUp}>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Rufen Sie uns an</h3>
                                        <p className="text-zinc-400 mb-1 text-sm">Mo-Fr, 07:30 - 17:00 Uhr</p>
                                        <a href="tel:+41715217777" className="text-white hover:text-brand-orange transition-colors font-semibold text-lg">+41 71 521 77 77</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 border border-brand-orange/20">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white mb-1">Schreiben Sie uns</h3>
                                        <p className="text-zinc-400 mb-1 text-sm">Wir antworten innerhalb von 24h</p>
                                        <a href="mailto:info@schaltkraft.ch" className="text-white hover:text-brand-orange transition-colors font-semibold text-lg">info@schaltkraft.ch</a>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="border-t border-white/10 pt-6 md:pt-8" variants={fadeInUp}>
                                <h3 className="font-bold text-white mb-4">Warum Schaltkraft AG?</h3>
                                <ul className="space-y-2 md:space-y-3 text-zinc-400">
                                    <li className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span className="text-sm md:text-base">Über 20 Jahre Erfahrung im Anlagenbau</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span className="text-sm md:text-base">100% Swiss Made Qualität aus Romanshorn</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-orange shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span className="text-sm md:text-base">Persönliche Beratung und Betreuung</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        className="bg-black/50 p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                        variants={fadeInRight}
                    >
                        <ContactForm compact />
                    </motion.div>
                </div>
            </PageContainer>
        </section>
    );
}
