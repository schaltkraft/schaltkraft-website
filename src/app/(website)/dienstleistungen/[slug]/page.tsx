import { getService, getAllServices } from '@/lib/cms-server';
import { PageContainer } from '@/components/layout/PageContainer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionRenderer } from '@/components/blocks/SectionRenderer';
import { ServiceHeroClient, ServiceContentClient, ServiceSidebarClient } from './ServiceDetailClient';
import { WebPageSchema } from '@/components/seo/WebPageSchema';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const services = await getAllServices();
    return services.map((service: any) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) return {};

    return {
        title: `${service.seoTitle || service.title} | Schaltkraft AG`,
        description: service.seoDescription || service.shortDescription,
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) return notFound();

    // Service Structured Data
    let serviceSchema: any = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.shortDescription || service.seoDescription,
        "provider": {
            "@id": "https://schaltkraft.ch/#organization"
        },
        "url": `https://schaltkraft.ch/dienstleistungen/${slug}`,
        "areaServed": {
            "@type": "Country",
            "name": "Switzerland"
        }
    };

    if (slug === 'schaltanlagen') {
        serviceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://schaltkraft.ch/dienstleistungen/schaltanlagen",
            "url": "https://schaltkraft.ch/dienstleistungen/schaltanlagen",
            "name": "Schaltanlagen & Niederspannungsverteilungen",
            "description": "Fertigung von Schaltanlagen, Niederspannungsverteilungen und Steuerungsanlagen für Industrie und Gewerbe.",
            "serviceType": "Schaltanlagenbau",
            "areaServed": { "@type": "Country", "name": "Schweiz" },
            "provider": { "@id": "https://schaltkraft.ch/#organization" },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                    { "@type": "ListItem", "position": 2, "name": "Dienstleistungen", "item": "https://schaltkraft.ch/dienstleistungen" },
                    { "@type": "ListItem", "position": 3, "name": "Schaltanlagen", "item": "https://schaltkraft.ch/dienstleistungen/schaltanlagen" }
                ]
            }
        };
    } else if (slug === 'planung-engineering') {
        serviceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://schaltkraft.ch/dienstleistungen/planung-engineering",
            "url": "https://schaltkraft.ch/dienstleistungen/planung-engineering",
            "name": "Planung & Engineering",
            "description": "Technische Beratung, Elektroschemata, Dispositionsplanung und normgerechte Dokumentationen.",
            "serviceType": "Elektroplanung & Engineering",
            "areaServed": { "@type": "Country", "name": "Schweiz" },
            "provider": { "@id": "https://schaltkraft.ch/#organization" },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                    { "@type": "ListItem", "position": 2, "name": "Dienstleistungen", "item": "https://schaltkraft.ch/dienstleistungen" },
                    { "@type": "ListItem", "position": 3, "name": "Planung & Engineering", "item": "https://schaltkraft.ch/dienstleistungen/planung-engineering" }
                ]
            }
        };
    } else if (slug === 'montage-installation') {
        serviceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://schaltkraft.ch/dienstleistungen/montage-installation",
            "url": "https://schaltkraft.ch/dienstleistungen/montage-installation",
            "name": "Montage & Installation von Schaltanlagen",
            "description": "Vor-Ort-Montage, Inbetriebnahme und Verkabelung von Schaltanlagen durch qualifizierte Fachkräfte.",
            "serviceType": "Elektromontage",
            "areaServed": { "@type": "Country", "name": "Schweiz" },
            "provider": { "@id": "https://schaltkraft.ch/#organization" },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                    { "@type": "ListItem", "position": 2, "name": "Dienstleistungen", "item": "https://schaltkraft.ch/dienstleistungen" },
                    { "@type": "ListItem", "position": 3, "name": "Montage & Installation", "item": "https://schaltkraft.ch/dienstleistungen/montage-installation" }
                ]
            }
        };
    } else if (slug === 'service-modernisierung') {
        serviceSchema = {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://schaltkraft.ch/dienstleistungen/service-modernisierung",
            "url": "https://schaltkraft.ch/dienstleistungen/service-modernisierung",
            "name": "Service & Modernisierung – Retrofit",
            "description": "Wartung, Retrofit und Anlagenerweiterungen für bestehende Schaltanlagen – normgerecht und effizient.",
            "serviceType": "Retrofit & Anlagenservice",
            "areaServed": { "@type": "Country", "name": "Schweiz" },
            "provider": { "@id": "https://schaltkraft.ch/#organization" },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                    { "@type": "ListItem", "position": 2, "name": "Dienstleistungen", "item": "https://schaltkraft.ch/dienstleistungen" },
                    { "@type": "ListItem", "position": 3, "name": "Service & Modernisierung", "item": "https://schaltkraft.ch/dienstleistungen/service-modernisierung" }
                ]
            }
        };
    }

    return (
        <article className="min-h-screen bg-black text-white relative selection:bg-brand-orange selection:text-white">

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <WebPageSchema
                title={service.seoTitle || service.title}
                description={service.seoDescription || service.shortDescription}
                url={`https://schaltkraft.ch/dienstleistungen/${slug}`}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: 'https://schaltkraft.ch' },
                    { name: 'Dienstleistungen', url: 'https://schaltkraft.ch/dienstleistungen' },
                    { name: service.title, url: `https://schaltkraft.ch/dienstleistungen/${slug}` }
                ]}
            />

            {/* HERO SECTION */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 min-h-[50vh] md:min-h-[60vh] flex items-center">
                {/* Background Image / Mesh */}
                <div className="absolute inset-0 z-0">
                    {service.heroImage ? (
                        <>
                            <Image src={service.heroImage} alt={service.title} fill sizes="100vw" priority className="object-cover opacity-40" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                        </>
                    ) : (
                        /* Fallback Tech Mesh */
                        <div className="w-full h-full opacity-20"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}>
                        </div>
                    )}
                </div>

                <div className="relative z-10 w-full">
                    <PageContainer>
                        <ServiceHeroClient
                            title={service.title}
                            subline={service.subline || service.shortDescription}
                        />
                    </PageContainer>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="relative z-10 border-t border-white/10 bg-zinc-950/80 backdrop-blur-sm">
                <PageContainer className="py-12 md:py-20 lg:py-32">
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">

                        {/* LEFT: Main Content - appears FIRST on mobile */}
                        <div className="lg:col-span-8">
                            <ServiceContentClient>
                                {/* Render blocks in nested mode (no internal containers) */}
                                {service.blocks && <SectionRenderer blocks={service.blocks} isNested={true} />}

                                {/* Legacy Content Fallback */}
                                {service.content && !service.blocks && (
                                    <div className="service-content max-w-none prose prose-invert">
                                        <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                    </div>
                                )}
                            </ServiceContentClient>
                        </div>

                        {/* RIGHT: Sidebar / Sticky CTA - appears SECOND on mobile (after all content) */}
                        <div className="lg:col-span-4">
                            <ServiceSidebarClient />
                        </div>

                    </div>
                </PageContainer>
            </div>

        </article>
    );
}
