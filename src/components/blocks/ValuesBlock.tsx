import { PageContainer } from '@/components/layout/PageContainer';
import { Award, Lightbulb, Users, Leaf, Shield, Zap, Target, Flag } from 'lucide-react';

interface ValuesBlockProps {
    data: any;
}

export function ValuesBlock({ data }: ValuesBlockProps) {
    const items = data.items || [];

    const iconMap: Record<string, any> = {
        quality: Shield,
        shield: Shield,
        innovation: Zap,
        zap: Zap,
        partnerschaft: Users,
        partnership: Users,
        users: Users,
        sustainability: Leaf,
        leaf: Leaf,
        trophy: Award,
        target: Target,
        flag: Flag
    };

    return (
        <section className="section-padding bg-black border-y border-white/10">
            <PageContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item: any, idx: number) => {
                        const iconKey = typeof item.icon === 'string' ? item.icon.toLowerCase() : 'shield';
                        const Icon = iconMap[iconKey] || Shield;

                        return (
                            <div key={idx} className="flex flex-col gap-4 group">
                                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-brand-orange mb-2 group-hover:scale-110 transition-transform">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-wider text-white border-l-2 border-brand-orange pl-4">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </PageContainer>
        </section>
    );
}
