'use client';

import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface ServicesBlockProps {
  data: {
    title?: string;
    subtitle?: string;
    items?: {
      number?: string;
      title?: string;
      bullets?: string[];
      items?: string[];
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
        <motion.div
          className="max-w-3xl mb-12 md:mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {title && (
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase mb-4 md:mb-6"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {items?.map((item, idx) => {
            const listItems = item.items || item.bullets || [];

            let link = item.linkUrl || '#';
            if (!item.linkUrl) {
              if (item.title?.includes('Service') || item.title?.includes('Wartung')) link = '/dienstleistungen/service-umbau';
              else if (item.title?.includes('Schaltanlagen') || item.title?.includes('Verteilung')) link = '/dienstleistungen/schaltanlagenbau';
              else if (item.title?.includes('Engineering')) link = '/dienstleistungen/engineering-planung';
              else if (item.title?.includes('Automation')) link = '/dienstleistungen/automation';
              else if (item.title?.includes('Mobility')) link = '/dienstleistungen/e-mobility-energie';
            }

            const imageUrl = item.image || `/images/services/service-${idx + 1}.jpg`;

            return (
              <motion.div
                key={idx}
                className="group relative bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex flex-col h-full hover:border-brand-orange/50 transition-colors duration-300"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Header/Image placeholder */}
                <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-700 font-bold uppercase tracking-widest text-sm md:text-base">
                    SERVICE {item.number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 flex items-end">
                    <h3 className="text-xl md:text-2xl font-bold font-heading uppercase text-white">{item.title}</h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
                    {listItems.map((serviceItem, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-2 text-zinc-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-brand-orange rounded-full shrink-0" />
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
              </motion.div>
            )
          })}
        </motion.div>
      </PageContainer>
    </section>
  );
}
