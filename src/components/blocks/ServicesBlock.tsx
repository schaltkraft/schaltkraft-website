import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { ArrowRight } from 'lucide-react';

interface ServicesBlockProps {
  data: {
    title?: string;
    subtitle?: string;
    items?: {
      number?: string;
      title?: string;
      bullets?: string[]; // Legacy
      items?: string[]; // New
      linkUrl?: string;
      image?: string;
    }[];
  }
}

export function ServicesBlock({ data }: ServicesBlockProps) {
  const { title, subtitle, items } = data;

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <PageContainer>
        <div className="max-w-3xl mb-16 lg:mb-24">
          {title && <h2 className="text-4xl md:text-5xl font-bold font-heading uppercase mb-6">{title}</h2>}
          {subtitle && <p className="text-xl text-zinc-400 leading-relaxed">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items?.map((item, idx) => {
            // Normalize 'bullets' or 'items'
            const listItems = item.items || item.bullets || [];

            // Determine link based on service title logic (mapping old content to new routes)
            let link = item.linkUrl || '#';
            if (!item.linkUrl) {
              if (item.title?.includes('Service') || item.title?.includes('Wartung')) link = '/dienstleistungen/service-umbau';
              else if (item.title?.includes('Schaltanlagen') || item.title?.includes('Verteilung')) link = '/dienstleistungen/schaltanlagenbau';
              else if (item.title?.includes('Engineering')) link = '/dienstleistungen/engineering-planung';
              else if (item.title?.includes('Automation')) link = '/dienstleistungen/automation';
              else if (item.title?.includes('Mobility')) link = '/dienstleistungen/e-mobility-energie';
            }

            // Fallback image if missing
            const imageUrl = item.image || `/images/services/service-${idx + 1}.jpg`;

            return (
              <div key={idx} className="group relative bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex flex-col h-full hover:border-brand-orange/50 transition-colors duration-300">
                {/* Card Header/Image placeholder if no real image */}
                <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-700 font-bold uppercase tracking-widest">
                    {/* Ideally render image here if available, or just a colored block */}
                    SERVICE {item.number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end">
                    <h3 className="text-2xl font-bold font-heading uppercase text-white">{item.title}</h3>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <ul className="space-y-3 mb-8 flex-grow">
                    {listItems.map((serviceItem, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-zinc-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                        {serviceItem}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={link}
                    className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all"
                  >
                    Mehr erfahren <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </PageContainer>
    </section>
  );
}
