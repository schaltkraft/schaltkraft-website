import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Über Uns | Schaltkraft AG',
    description: 'Erfahren Sie mehr über Schaltkraft AG.',
};

export default async function AboutPage() {
    // Slug 'about-us' logic
    // If content is managed in "Pages" collection with slug "about-us", fetch it.
    const page = await getPage('about-us');

    if (!page) {
        // Fallback if CMS page doesn't exist yet but code needs to run
        return (
            <main className="min-h-screen pt-32 pb-20 bg-zinc-950 text-white">
                <PageContainer>
                    <h1 className="text-5xl font-bold uppercase mb-8">Über Uns</h1>
                    <p className="text-xl text-zinc-400 mb-8">
                        Inhalt wird geladen... (Bitte erstellen Sie die Seite 'about-us' im CMS)
                    </p>
                    <div className="bg-zinc-900 p-8 rounded border border-white/10">
                        <h2 className="text-2xl font-bold mb-4">Werte & Philosophie</h2>
                        <p className="mb-4">Die Schaltkraft AG ist spezialisiert auf...</p>
                        <Link href="/team" className="text-brand-orange hover:text-white underline">
                            Zum Team
                        </Link>
                    </div>
                </PageContainer>
            </main>
        )
    }

    return <SectionRenderer blocks={page.blocks} />;
}
