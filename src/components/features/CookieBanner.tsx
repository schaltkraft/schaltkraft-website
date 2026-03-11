'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user already accepted cookies
        const hasAccepted = localStorage.getItem('schaltkraft_cookie_consent_v2');

        if (!hasAccepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('schaltkraft_cookie_consent_v2', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-[600px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="flex-1 text-sm text-zinc-300">
                        <p className="mb-2">
                            <strong className="text-white block mb-1">Hinweis zu Cookies & Datenschutz</strong>
                            Wir verwenden auf unserer Website eine interaktive Google Maps Karte zur Anfahrtsbeschreibung. Beim Laden dieser Karte kommuniziert Ihr Browser mit Google-Servern.
                        </p>
                        <p>
                            Weitere Informationen finden Sie in unserer{' '}
                            <Link href="/datenschutz" className="text-brand-orange hover:text-white underline transition-colors">
                                Datenschutzerklärung
                            </Link>.
                        </p>
                    </div>

                    <div className="w-full md:w-auto shrink-0 flex justify-end">
                        <Button
                            onClick={acceptCookies}
                            className="bg-brand-orange hover:bg-white text-white hover:text-brand-orange w-full md:w-auto whitespace-nowrap"
                        >
                            Verstanden
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
