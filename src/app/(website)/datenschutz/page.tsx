import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage('datenschutz');
    if (!page) return {};
    return {
        title: page.seoTitle || 'Datenschutzerklärung - Schaltkraft AG',
        description: page.seoDescription || 'Datenschutzerklärung gemäss Schweizer DSG.',
    };
}

export default async function DatenschutzPage() {
    const page = await getPage('datenschutz');

    if (!page) {
        return notFound();
    }

    return (
        <main className="pt-32 lg:pt-40">
            <SectionRenderer blocks={page.blocks} />
        </main>
    );
}
