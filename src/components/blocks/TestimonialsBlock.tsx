'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';

interface TestimonialsBlockProps {
  data: any;
}

export function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <PageContainer>
        <motion.div
          className="max-w-2xl mx-auto text-center mb-8 md:mb-10 lg:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase mb-4 md:mb-6 text-white">
            {data.title}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {items.map((item: any, idx: number) => (
            <motion.div key={idx} className="h-full" variants={fadeInUp}>
              <TestimonialCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </PageContainer>
    </section>
  );
}

function TestimonialCard({ item }: { item: any }) {
  return (
    <motion.div
      className="bg-zinc-900 border border-white/10 p-6 md:p-8 lg:p-10 flex flex-col gap-4 md:gap-6 h-full text-white relative hover:border-brand-orange/50 transition-colors duration-300"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Quotation Mark Decoration */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-5xl md:text-6xl leading-none text-white/5 font-serif">"</div>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < (item.rating || 5) ? 'fill-brand-orange text-brand-orange' : 'text-zinc-700'}`}
          />
        ))}
      </div>

      <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed flex-grow text-zinc-300 relative z-10">
        "{item.quote}"
      </p>

      <div className="mt-auto pt-4 md:pt-6 border-t border-white/10">
        <div className="font-bold text-base md:text-lg font-heading uppercase tracking-wide text-white">{item.author}</div>
        <div className="text-brand-orange text-xs md:text-sm font-medium tracking-wider uppercase">{item.role}</div>
      </div>
    </motion.div>
  );
}
