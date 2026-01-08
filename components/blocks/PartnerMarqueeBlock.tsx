'use client';
import Marquee from 'react-fast-marquee';

export function PartnerMarqueeBlock({ title, partners }: any) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-2xl font-bold text-center mb-10 uppercase">
            {title}
          </h2>
        )}

        <Marquee gradient={false} speed={40} pauseOnHover>
          {partners.map((partner: any, idx: number) => (
            <a
              key={idx}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-12 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-16 w-auto object-contain"
              />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
