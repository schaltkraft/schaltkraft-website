import { getService, getAllServices } from '@/lib/cms-server';
import { PageContainer } from '@/components/layout/PageContainer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionRenderer } from '@/components/blocks/SectionRenderer';

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

    return (
        <article className="min-h-screen bg-black text-white relative selection:bg-brand-orange selection:text-white">

            {/* HERO SECTION */}
            <div className="relative pt-32 pb-20 lg:pt-48 min-h-[60vh] flex items-center">
                {/* Background Image / Mesh */}
                <div className="absolute inset-0 z-0">
                    {service.heroImage ? (
                        <>
                            <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-40" />
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
                        {/* Breadcrumb */}
                        <div className="mb-8 flex items-center gap-3">
                            <Link href="/dienstleistungen" className="group flex items-center gap-2 text-zinc-500 hover:text-brand-orange transition-colors uppercase tracking-widest text-xs font-bold">
                                <span className="w-8 h-[1px] bg-zinc-700 group-hover:bg-brand-orange transition-colors"></span>
                                Dienstleistungen
                            </Link>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-12 items-end">
                            <div className="lg:col-span-8">
                                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold font-heading uppercase text-white leading-[0.9] mb-8">
                                    {service.title}
                                </h1>
                                {(service.subline || service.shortDescription) && (
                                    <p className="text-xl lg:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl border-l-4 border-brand-orange pl-6 py-2">
                                        {service.subline || service.shortDescription}
                                    </p>
                                )}
                            </div>
                        </div>
                    </PageContainer>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="relative z-10 border-t border-white/10 bg-zinc-950/80 backdrop-blur-sm">
                <PageContainer className="py-20 lg:py-32">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                        {/* LEFT: Main Content */}
                        <div className="lg:col-span-8">
                            {/* Render blocks in nested mode (no internal containers) */}
                            {service.blocks && <SectionRenderer blocks={service.blocks} isNested={true} />}

                            {/* Legacy Content Fallback */}
                            {service.content && !service.blocks && (
                                <div className="service-content max-w-none prose prose-invert">
                                    <div dangerouslySetInnerHTML={{ __html: service.content }} />
                                </div>
                            )}
                        </div>

                        {/* RIGHT: Sidebar / Sticky CTA */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-32">
                                {/* CTA Card */}
                                <div className="p-8 bg-zinc-900 border border-white/5 relative overflow-hidden group rounded-sm">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>

                                    <h3 className="text-2xl font-heading font-bold uppercase text-white mb-2 relative z-10">
                                        Projekt starten
                                    </h3>
                                    <p className="text-zinc-400 mb-8 relative z-10 leading-relaxed text-sm">
                                        Haben Sie Fragen oder benötigen Sie eine maßgeschneiderte Lösung? Unser Engineering-Team hilft Ihnen gerne weiter.
                                    </p>

                                    <Link href="/contact" className="block relative z-10">
                                        <Button className="w-full bg-brand-orange hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest py-6 transition-all duration-300">
                                            Kontaktieren <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>

                                    {/* Quick Facts / Standards */}
                                    <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10 text-brand-orange">
                                                    ✓
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm uppercase">Swiss Made</h4>
                                                    <p className="text-xs text-zinc-500 mt-1">Fertigung in Romanshorn</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-white/10 text-brand-orange">
                                                    ✓
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm uppercase">Zertifiziert</h4>
                                                    <p className="text-xs text-zinc-500 mt-1">ISO 9001 & EN 61439</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </PageContainer>
            </div>

        </article>
    );
}
