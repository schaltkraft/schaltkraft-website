import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks/SectionRenderer';
import { notFound } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Unser Team | Schaltkraft AG',
    description: 'Das Team hinter Schaltkraft AG.',
};

export default async function TeamPage() {
    const page = await getPage('team');

    if (!page) {
        // Fallback if page not found (shouldn't happen if team.json exists)
        return notFound();
    }

    return <SectionRenderer blocks={page.blocks} />;
}
