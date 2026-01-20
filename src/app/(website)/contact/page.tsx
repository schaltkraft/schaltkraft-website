'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';

// LinkedIn icon component
function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

// Instagram icon component
function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );
}

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 bg-zinc-950 text-white">
            <PageContainer>
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
                    {/* Left: Info */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading uppercase mb-8 md:mb-12"
                        >
                            Kontakt
                        </motion.h1>

                        <motion.div variants={staggerContainer} className="space-y-8 md:space-y-12">
                            <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white/50 mb-2">Adresse</h3>
                                    <p className="text-lg md:text-xl leading-relaxed">
                                        Schaltkraft AG<br />
                                        Mittliszelgstrasse 5<br />
                                        8590 Romanshorn
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <Mail className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white/50 mb-2">E-Mail</h3>
                                    <a href="mailto:info@schaltkraft.ch" className="text-lg md:text-xl hover:text-brand-orange transition-colors">
                                        info@schaltkraft.ch
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <Phone className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white/50 mb-2">Telefon</h3>
                                    <a href="tel:+41715217777" className="text-lg md:text-xl font-bold hover:text-brand-orange transition-colors">
                                        +41 71 521 77 77
                                    </a>
                                </div>
                            </motion.div>

                            {/* Social Media Links */}
                            <motion.div variants={fadeInUp} className="pt-4 md:pt-6">
                                <h3 className="text-base md:text-lg font-bold uppercase tracking-wider text-white/50 mb-4">Social Media</h3>
                                <div className="flex gap-4">
                                    <motion.a
                                        href="https://www.linkedin.com/company/schaltkraft/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-300"
                                        aria-label="LinkedIn"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <LinkedInIcon className="w-6 h-6" />
                                    </motion.a>
                                    <motion.a
                                        href="https://www.instagram.com/schaltkraft"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-300"
                                        aria-label="Instagram"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <InstagramIcon className="w-6 h-6" />
                                    </motion.a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        className="bg-white/5 p-6 md:p-8 lg:p-12 rounded-sm border border-white/10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={fadeInRight}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold font-heading uppercase mb-6 md:mb-8">Kontaktformular</h2>
                        <ContactForm />
                    </motion.div>
                </div>

                {/* Google Maps Embed */}
                <motion.div
                    className="mt-12 md:mt-16 lg:mt-24 w-full h-[300px] md:h-[400px] lg:h-[500px] bg-zinc-900 border border-white/10 rounded-sm overflow-hidden grayscale invert brightness-75 hover:grayscale-0 hover:invert-0 hover:brightness-100 transition-all duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2692.5197450579126!2d9.361538099999997!3d47.55767509999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479afd3fbdeec307%3A0xacaf207ad21ed9a0!2sMittliszelgstrasse%205%2C%208590%20Romanshorn!5e0!3m2!1sde!2sch!4v1767729282939!5m2!1sde!2sch"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                </motion.div>
            </PageContainer>
        </main>
    );
}
