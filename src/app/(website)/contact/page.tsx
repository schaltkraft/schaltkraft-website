import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/features/contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakt | Schaltkraft AG',
    description: 'Wir freuen uns auf Ihre Anfrage.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 lg:pt-48 bg-zinc-950 text-white">
            <PageContainer>
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Info */}
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-bold font-heading uppercase mb-12">
                            Kontakt
                        </h1>

                        <div className="space-y-12">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider text-white/50 mb-2">Adresse</h3>
                                    <p className="text-xl leading-relaxed">
                                        Schaltkraft AG<br />
                                        Mittliszelgstrasse 5<br />
                                        8590 Romanshorn
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider text-white/50 mb-2">E-Mail</h3>
                                    <a href="mailto:info@schaltkraft.ch" className="text-xl hover:text-brand-orange transition-colors">
                                        info@schaltkraft.ch
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider text-white/50 mb-2">Telefon</h3>
                                    <a href="tel:+41715217777" className="text-xl font-bold hover:text-brand-orange transition-colors">
                                        +41 71 521 77 77
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white/5 p-8 lg:p-12 rounded-sm border border-white/10">
                        <h2 className="text-3xl font-bold font-heading uppercase mb-8">Kontaktformular</h2>
                        <ContactForm />
                    </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-16 lg:mt-24 w-full h-[400px] lg:h-[500px] bg-zinc-900 border border-white/10 rounded-sm overflow-hidden grayscale invert brightness-75 hover:grayscale-0 hover:invert-0 hover:brightness-100 transition-all duration-500">
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
                </div>
            </PageContainer>
        </main>
    );
}
