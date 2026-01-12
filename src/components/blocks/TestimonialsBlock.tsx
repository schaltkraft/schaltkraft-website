import { PageContainer } from '@/components/layout/PageContainer';
import { Star } from 'lucide-react';

interface TestimonialsBlockProps {
  data: any;
}

export function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  const items = data.items || [];

  if (items.length === 0) return null;

  return (
    <section className="section-padding bg-black bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black">
      <PageContainer>
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading uppercase mb-6 text-white">
            {data.title}
          </h2>
        </div>

        {/* Grid Container - 2x2 for 4 items looks balanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="h-full">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function TestimonialCard({ item }: { item: any }) {
  return (
    <div className="bg-zinc-900 border border-white/10 p-8 lg:p-10 flex flex-col gap-6 h-full text-white relative hover:border-brand-orange/50 transition-colors duration-300">
      {/* Quotation Mark Decoration */}
      <div className="absolute top-6 right-6 text-6xl leading-none text-white/5 font-serif">"</div>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < (item.rating || 5) ? 'fill-brand-orange text-brand-orange' : 'text-zinc-700'}`}
          />
        ))}
      </div>

      <p className="text-lg lg:text-xl font-medium leading-relaxed flex-grow text-zinc-300 relative z-10">
        "{item.quote}"
      </p>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="font-bold text-lg font-heading uppercase tracking-wide text-white">{item.author}</div>
        <div className="text-brand-orange text-sm font-medium tracking-wider uppercase">{item.role}</div>
      </div>
    </div>
  );
}
