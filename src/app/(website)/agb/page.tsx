import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('agb');
    if (!page) return {};
    return {
        title: page.seoTitle || 'AGB - Schaltkraft AG',
        description: page.seoDescription || 'Allgemeine Geschäftsbedingungen',
    };
}

export default async function AgbPage() {
    const page = await getPage('agb');

    if (!page) {
        return notFound();
    }

    return <SectionRenderer blocks={page.blocks} />;
}
