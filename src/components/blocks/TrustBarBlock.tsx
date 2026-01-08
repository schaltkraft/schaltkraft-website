import { PageContainer } from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface TrustBarBlockProps {
    data: {
        items?: string[];
    }
}

export function TrustBarBlock({ data }: TrustBarBlockProps) {
    const items = data?.items || [];

    if (items.length === 0) return null;

    return (
        <div className="bg-zinc-900 border-y border-white/10 py-8">
            <PageContainer>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 gap-x-8 gap-y-4">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-3 py-2">
                            <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                            <span className="text-sm md:text-base font-medium uppercase tracking-wider text-zinc-300">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </div>
    );
}
