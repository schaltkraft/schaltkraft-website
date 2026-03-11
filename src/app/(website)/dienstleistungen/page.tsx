import { getAllServices, getPage } from '@/lib/cms-server';
import { PageContainer } from '@/components/layout/PageContainer';
import Link from 'next/link';
import Image from 'next/image';
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
    const introBlocks = blocks.filter((b: any) => b.discriminant === 'intro');
    const valuesBlocks = blocks.filter((b: any) => b.discriminant === 'values');

    return (
        <main className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": "https://schaltkraft.ch/dienstleistungen",
                        "url": "https://schaltkraft.ch/dienstleistungen",
                        "name": "Dienstleistungen – Schaltkraft AG",
                        "description": "Planung, Schaltanlagenbau, Montage und Service aus einer Hand.",
                        "publisher": { "@id": "https://schaltkraft.ch/#organization" },
                        "hasPart": [
                            { "@type": "Service", "name": "Planung & Engineering", "url": "https://schaltkraft.ch/dienstleistungen/planung-engineering" },
                            { "@type": "Service", "name": "Schaltanlagen", "url": "https://schaltkraft.ch/dienstleistungen/schaltanlagen" },
                            { "@type": "Service", "name": "Montage & Installation", "url": "https://schaltkraft.ch/dienstleistungen/montage-installation" },
                            { "@type": "Service", "name": "Service & Modernisierung", "url": "https://schaltkraft.ch/dienstleistungen/service-modernisierung" }
                        ],
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                                { "@type": "ListItem", "position": 2, "name": "Dienstleistungen", "item": "https://schaltkraft.ch/dienstleistungen" }
                            ]
                        }
                    })
                }}
            />
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

            {/* 2. Intro Section - Trust/Competence intro BEFORE services */}
            {introBlocks.length > 0 && (
                <SectionRenderer blocks={introBlocks} />
            )}

            {/* 3. Services Grid (Dynamic) */}
            <section className="py-20 bg-zinc-950">
                <PageContainer>
                    <div className="grid md:grid-cols-2 gap-8 relative z-20">
                        {services.map((service: any) => (
                            <Link
                                key={service.slug}
                                href={`/dienstleistungen/${service.slug}`}
                                className="group relative bg-zinc-900 border border-white/10 rounded-sm overflow-hidden aspect-[4/3] flex flex-col justify-end p-8 hover:border-brand-orange/50 transition-colors duration-300"
                            >
                                {service.icon && (
                                    <div className="absolute inset-0 z-0">
                                        <Image src={service.icon} alt={service.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale group-hover:grayscale-0" />
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

            {/* 4. Values/USP Section AFTER services */}
            {valuesBlocks.length > 0 && (
                <SectionRenderer blocks={valuesBlocks} />
            )}
        </main>
    );
}
