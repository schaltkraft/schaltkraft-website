'use client';

import { Button } from '@/components/ui/button';

export function ContactForm() {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-400">E-Mail</label>
                <input type="email" className="w-full h-14 bg-zinc-900 border border-white/10 px-4 text-white focus:border-brand-orange focus:outline-none transition-colors" placeholder="ihre@email.ch" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-400">Betreff</label>
                <select className="w-full h-14 bg-zinc-900 border border-white/10 px-4 text-white focus:border-brand-orange focus:outline-none transition-colors appearance-none">
                    <option>Bitte wählen...</option>
                    <option>Offerten</option>
                    <option>Rechnungen</option>
                    <option>Rückruf</option>
                    <option>Sonstige Anliegen</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-zinc-400">Nachricht</label>
                <textarea rows={5} className="w-full bg-zinc-900 border border-white/10 p-4 text-white focus:border-brand-orange focus:outline-none transition-colors" placeholder="Ihre Nachricht an uns..."></textarea>
            </div>
            <Button className="w-full h-14 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold uppercase tracking-widest text-lg">
                Absenden
            </Button>
        </form>
    );
}
