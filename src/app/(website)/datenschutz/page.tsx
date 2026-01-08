import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('datenschutz');
    if (!page) return {};
    return {
        title: page.seoTitle || 'Datenschutz - Schaltkraft AG',
        description: page.seoDescription || 'Datenschutzerklärung',
    };
}

export default async function DatenschutzPage() {
    const page = await getPage('datenschutz');

    if (!page) {
        return notFound();
    }

    return <SectionRenderer blocks={page.blocks} />;
}
