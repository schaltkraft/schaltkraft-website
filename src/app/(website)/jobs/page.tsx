import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PageContainer } from '@/components/layout/PageContainer';

export const metadata: Metadata = {
    title: 'Jobs & Karriere | Schaltkraft AG',
    description: 'Offene Stellen und Karrieremöglichkeiten bei Schaltkraft AG.',
};

export default async function JobsPage() {
    const page = await getPage('jobs');

    if (!page) {
        return (
            <main className="min-h-screen pt-32 pb-20 bg-zinc-950 text-white">
                <PageContainer>
                    <h1 className="text-5xl font-bold uppercase mb-8">Jobs & Karriere</h1>
                    <p className="text-xl text-zinc-400 mb-8">
                        Seite wird geladen...
                    </p>
                </PageContainer>
            </main>
        )
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": "https://schaltkraft.ch/jobs",
                        "url": "https://schaltkraft.ch/jobs",
                        "name": "Jobs & Karriere – Schaltkraft AG",
                        "description": "Offene Stellen bei Schaltkraft AG in Romanshorn – Elektrofachkräfte, Automatiker und Produktionsmitarbeiter gesucht.",
                        "publisher": { "@id": "https://schaltkraft.ch/#organization" },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                                { "@type": "ListItem", "position": 2, "name": "Jobs & Karriere", "item": "https://schaltkraft.ch/jobs" }
                            ]
                        }
                    })
                }}
            />
            <SectionRenderer blocks={page.blocks} />
        </>
    );
}
