import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, Target, Flag, Users, Leaf, Award, Lightbulb } from 'lucide-react';

interface IntroBlockProps {
    data: any;
    isNested?: boolean;
}

export function IntroBlock({ data, isNested }: IntroBlockProps) {
    const text = data?.text || "";
    const links = data?.links || [];

    const Content = (
        <>
            {(data.image || (data.icons && data.icons.length > 0)) ? (
                <div className={`grid ${isNested ? 'gap-8' : 'lg:grid-cols-2 gap-12 lg:gap-24'} items-center`}>
                    {/* Image Left */}
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group bg-zinc-900 border border-white/10">
                        {data.image ? (
                            <>
                                <div className="absolute inset-0 border-2 border-white/10 z-10 rounded-[2rem] group-hover:border-brand-orange/50 transition-colors duration-500" />
                                <img
                                    src={data.image}
                                    alt={data.headline || "Intro"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                                />
                            </>
                        ) : (data.icons && data.icons.length > 0) ? (
                            <div className="w-full h-full p-8 grid grid-cols-2 gap-4 items-center justify-center">
                                {data.icons.map((iconStr: string, i: number) => {
                                    const iconKey = iconStr.toLowerCase();
                                    let Icon = Shield;
                                    if (iconKey === 'zap') Icon = Zap;
                                    if (iconKey === 'target') Icon = Target;
                                    if (iconKey === 'users') Icon = Users;
                                    if (iconKey === 'flag') Icon = Flag;

                                    return (
                                        <div key={i} className="flex flex-col items-center justify-center gap-2 text-brand-orange">
                                            <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-brand-orange/20 flex items-center justify-center mb-1">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-white/50">{iconStr}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>

                    {/* Text Right */}
                    <div className="flex flex-col gap-8">
                        <IntroContent data={data} text={text} links={links} />
                    </div>
                </div>
            ) : (
                <div className={isNested ? "flex flex-col gap-8" : "max-w-4xl mx-auto flex flex-col gap-8"}>
                    <IntroContent data={data} text={text} links={links} />
                </div>
            )}
        </>
    );

    if (isNested) {
        return <div className="py-12 border-b border-white/10 last:border-0">{Content}</div>;
    }

    return (
        <section className="section-padding bg-zinc-950">
            <PageContainer>
                {Content}
            </PageContainer>
        </section>
    );
}

function IntroContent({ data, text, links }: { data: any, text: string, links: any[] }) {
    return (
        <>
            {data.subheadline && (
                <span className="text-brand-orange font-bold uppercase tracking-widest text-sm">
                    {data.subheadline}
                </span>
            )}
            <h2 className="text-4xl lg:text-5xl font-bold uppercase leading-[0.9] font-heading text-white">
                {data.headline}
            </h2>

            <div className="text-zinc-400 text-lg leading-relaxed whitespace-pre-line">
                {text}
            </div>

            {links && links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                    {links.map((link: any, idx: number) => (
                        <Link key={idx} href={link.url || '#'}>
                            <Button
                                variant={idx === 0 ? "primary" : "secondary"}
                                className={idx === 0
                                    ? "bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 uppercase"
                                    : "bg-transparent border border-white/20 text-white hover:bg-white/10 font-bold h-12 uppercase"}
                            >
                                {link.label}
                                {idx === 0 && <ArrowRight className="ml-2 w-4 h-4" />}
                            </Button>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
