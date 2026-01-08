import { getAllServices, getPage } from '@/lib/cms-server';
import { PageContainer } from '@/components/layout/PageContainer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { SectionRenderer } from '@/components/blocks/SectionRenderer';
import { HeroBlock } from '@/components/blocks/HeroBlock';

export const metadata: Metadata = {
    title: 'Dienstleistungen | Schaltkraft AG',
    description: 'Ganzheitliche Lösungen für Ihre elektrotechnischen Herausforderungen.',
};

export default async function ServicesPage() {
    const services = await getAllServices();
    const page = await getPage('services');

    const blocks = page?.blocks || [];
    const heroBlock = blocks.find((b: any) => b.discriminant === 'hero');
    const otherBlocks = blocks.filter((b: any) => b.discriminant !== 'hero');

    return (
        <main className="min-h-screen bg-black">
            {/* 1. Hero Section (from CMS or Fallback) */}
            {heroBlock ? (
                <HeroBlock data={heroBlock.value} />
            ) : (
                <div className="pt-32 pb-20 lg:pt-48 px-4">
                    <PageContainer>
                        <h1 className="text-5xl font-bold font-heading text-white mb-6">Unsere Dienstleistungen</h1>
                    </PageContainer>
                </div>
            )}

            {/* 2. Services Grid (Dynamic) */}
            <section className="py-20 bg-zinc-950">
                <PageContainer>
                    <div className="grid md:grid-cols-2 gap-8 -mt-20 relative z-20">
                        {services.map((service: any) => (
                            <Link
                                key={service.slug}
                                href={`/dienstleistungen/${service.slug}`}
                                className="group relative bg-zinc-900 border border-white/10 rounded-sm overflow-hidden aspect-[4/3] flex flex-col justify-end p-8 hover:border-brand-orange/50 transition-colors duration-300"
                            >
                                {service.icon && (
                                    <div className="absolute inset-0 z-0">
                                        <img src={service.icon} alt={service.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <h2 className="text-3xl font-bold font-heading uppercase text-white mb-4 group-hover:text-brand-orange transition-colors">
                                        {service.title}
                                    </h2>
                                    {service.shortDescription && (
                                        <p className="text-zinc-300 mb-6 line-clamp-3 leading-relaxed font-medium">
                                            {service.shortDescription}
                                        </p>
                                    )}
                                    <span className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all">
                                        Details <ArrowRight className="w-4 h-4 text-brand-orange" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </PageContainer>
            </section>

            {/* 3. Other Blocks (Competence, USPs, etc.) */}
            <SectionRenderer blocks={otherBlocks} />
        </main>
    );
}
