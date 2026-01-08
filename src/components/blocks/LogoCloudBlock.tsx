import { PageContainer } from '@/components/layout/PageContainer';
import Marquee from 'react-fast-marquee';

interface LogoCloudBlockProps {
    data: any;
}

export function LogoCloudBlock({ data }: LogoCloudBlockProps) {
    const logos = data?.logos || [];
    if (logos.length === 0) return null;

    return (
        <section className="py-12">
            <PageContainer>
                <div className="bg-white rounded-full py-12 px-8 overflow-hidden">
                    <Marquee gradient={false} speed={40}>
                        {logos.map((item: any, idx: number) => (
                            <div key={idx} className="mx-12 lg:mx-20 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-8 lg:h-12 w-auto object-contain max-w-[150px]"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </PageContainer>
        </section>
    );
}
