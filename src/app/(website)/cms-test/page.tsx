import { getPage } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';

export default async function CMSTestPage() {
    const page = await getPage('cms-test');

    if (!page) {
        return notFound();
    }

    return (
        <main className="pt-32 lg:pt-40">
            <SectionRenderer blocks={page.blocks} />
        </main>
    );
}
