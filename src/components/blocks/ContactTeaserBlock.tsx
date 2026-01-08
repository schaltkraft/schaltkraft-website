'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';

interface ContactTeaserBlockProps {
    data: {
        headline?: string;
        text?: string;
    }
}

export function ContactTeaserBlock({ data }: ContactTeaserBlockProps) {
    return (
        <section className="py-24 bg-zinc-900 border-t border-white/10">
            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Side */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-6">
                            {data.headline || 'Kontaktieren Sie uns'}
                        </h2>
                        <p className="text-xl text-zinc-400 mb-8 max-w-md">
                            {data.text || 'Wir freuen uns auf Ihre Anfrage.'}
                        </p>
                    </div>

                    {/* Form Placeholder Side */}
                    <div className="bg-black/50 p-8 rounded border border-white/10">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <div className="h-12 w-full bg-zinc-800 rounded px-4 flex items-center text-zinc-500 border border-white/5">
                                    E-Mail Adresse
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-12 w-full bg-zinc-800 rounded px-4 flex items-center justify-between text-zinc-500 border border-white/5">
                                    <span>Betreff wählen</span>
                                    <span className="text-xs">▼</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-32 w-full bg-zinc-800 rounded p-4 text-zinc-500 border border-white/5">
                                    Nachricht
                                </div>
                            </div>
                            <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 uppercase tracking-wide">
                                Absenden
                            </Button>
                        </form>
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
