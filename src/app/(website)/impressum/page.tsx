import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('impressum');
    if (!page) return {};
    return {
        title: page.seoTitle || 'Impressum - Schaltkraft AG',
        description: page.seoDescription || 'Rechtliche Hinweise',
    };
}

export default async function ImpressumPage() {
    const page = await getPage('impressum');

    if (!page) {
        return notFound();
    }

    return <SectionRenderer blocks={page.blocks} />;
}
