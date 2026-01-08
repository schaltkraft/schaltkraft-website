import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServicesTeaserBlockProps {
    data: {
        title?: string;
        intro?: string;
        items?: {
            title?: string;
            items?: string[];
            linkUrl?: string;
        }[];
    }
}

export function ServicesTeaserBlock({ data }: ServicesTeaserBlockProps) {
    const { title, intro, items = [] } = data;

    return (
        <section className="section-padding bg-zinc-950">
            <PageContainer>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold font-heading uppercase mb-6 text-white">
                            {title}
                        </h2>
                        {intro && (
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                {intro}
                            </p>
                        )}
                    </div>
                    <Link href="/dienstleistungen">
                        <Button variant="outline" className="h-12 px-8 uppercase tracking-widest border-white/20 text-white hover:bg-white/10 hover:border-brand-orange transition-all">
                            Alle Leistungen ansehen
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.linkUrl || '#'}
                            className="group relative bg-zinc-900 border border-white/10 p-8 flex flex-col h-full hover:border-brand-orange transition-colors duration-300 hover:bg-zinc-900/50"
                        >
                            <div className="text-brand-orange text-4xl font-heading font-bold mb-6 opacity-50 group-hover:opacity-100 transition-opacity">0{idx + 1}</div>

                            <h3 className="text-xl font-bold font-heading uppercase mb-4 text-white group-hover:text-brand-orange transition-colors">
                                {item.title}
                            </h3>

                            <ul className="space-y-2 mb-8 flex-grow">
                                {item.items?.map((subItem, sIdx) => (
                                    <li key={sIdx} className="text-sm text-zinc-400 border-l border-white/10 pl-3 group-hover:border-brand-orange/50 transition-colors">
                                        {subItem}
                                    </li>
                                ))}
                            </ul>

                            <div className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wide text-xs group-hover:gap-3 transition-all mt-auto self-start">
                                Mehr erfahren <ArrowRight className="w-3 h-3 text-brand-orange" />
                            </div>
                        </Link>
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}

