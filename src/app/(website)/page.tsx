import { getHomepage, getSEODefaults } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomepage();

  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.seoDescription,
  };
}

export default async function HomePage() {
  const page = await getHomepage();

  if (!page) {
    return notFound();
  }

  return <SectionRenderer blocks={page.blocks} />;
}
