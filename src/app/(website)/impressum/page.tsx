import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('impressum');
    if (!page) return {};
    return {
        title: page.seoTitle || 'Impressum - Schaltkraft AG',
        description: page.seoDescription || 'Impressum und rechtliche Hinweise',
    };
}

export default async function ImpressumPage() {
    const page = await getPage('impressum');

    if (!page) {
        return notFound();
    }

    return (
        <main className="pt-32 lg:pt-40">
            <SectionRenderer blocks={page.blocks} />
        </main>
    );
}
