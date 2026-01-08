'use client';
import Marquee from 'react-fast-marquee';
import { PageContainer } from '@/components/layout/PageContainer';

interface PartnerMarqueeBlockProps {
  data: any;
}

export function PartnerMarqueeBlock({ data }: PartnerMarqueeBlockProps) {
  const partners = data?.logos || [];
  const title = data?.title;

  if (partners.length === 0) return null;

  return (
    <section className="py-20 bg-zinc-100 border-t border-zinc-200">
      <PageContainer>
        {title && (
          <h2 className="text-2xl font-bold text-center mb-12 uppercase text-zinc-900 font-heading tracking-widest">
            {title}
          </h2>
        )}

        <Marquee gradient={true} gradientColor="rgb(244, 244, 245)" speed={30} pauseOnHover>
          {partners.map((partner: any, idx: number) => (
            <div
              key={idx}
              className="mx-12 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 mix-blend-multiply"
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              ) : (
                <span className="text-xl font-bold text-zinc-800 uppercase">{partner.name}</span>
              )}
            </div>
          ))}
        </Marquee>
      </PageContainer>
    </section>
  );
}
