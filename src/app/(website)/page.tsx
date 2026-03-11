import { getHomepage, getSEODefaults } from '@/lib/cms-server';
import { SectionRenderer } from '@/components/blocks';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { WebPageSchema } from '@/components/seo/WebPageSchema';
import { StructuredData } from '@/components/seo/StructuredData';

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

  return (
    <>
      <StructuredData />
      <SectionRenderer blocks={page.blocks} />
    </>
  );
}
