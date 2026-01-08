import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeroBlockProps {
  data: any;
}

export function HeroBlock({ data }: HeroBlockProps) {
  const headline = data?.headline || "";
  const lead = data?.subheadline || data?.lead || "";
  const buttonPrimary = data?.ctaPrimary;
  const buttonSecondary = data?.ctaSecondary;

  return (
    <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-zinc-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">

          {/* Left: Text Content */}
          <div className="flex flex-col gap-10 lg:gap-12">
            <div>
              <div className="inline-block px-3 py-1 border border-brand-orange/50 text-brand-orange text-sm font-bold uppercase tracking-[0.2em] mb-6 bg-brand-orange/5">
                Schaltanlagenbau & Automation
              </div>
              <h1 className="hero-h1 whitespace-pre-line tracking-tighter text-white drop-shadow-xl py-2">
                {headline}
              </h1>
            </div>

            <p className="text-zinc-400 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed border-l-4 border-brand-orange pl-6">
              {lead}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
              {buttonPrimary?.label && (
                <Link href={buttonPrimary.url || '/kontakt'}>
                  <Button className="h-16 px-12 text-lg font-bold uppercase tracking-widest bg-brand-orange hover:bg-brand-orange/90 text-white rounded-none border-2 border-transparent hover:border-white/20 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    {buttonPrimary.label}
                  </Button>
                </Link>
              )}

              {buttonSecondary?.label && (
                <Link href={buttonSecondary.url || '#'}>
                  <Button variant="outline" className="h-16 px-12 text-lg font-bold uppercase tracking-widest bg-transparent border-2 border-white/20 text-white rounded-none hover:bg-white/5 hover:border-brand-orange transition-all">
                    {buttonSecondary.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right: Image Frame */}
          <div className="relative h-[500px] lg:h-[700px] w-full z-0 group perspective-1000">
            {/* Tech Decoration Lines */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-orange/50 z-20"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-orange/50 z-20"></div>

            {/* Main Image Container */}
            <div className="relative h-full w-full border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl">
              {data?.image ? (
                <img
                  src={data.image}
                  alt="Hero"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-bold uppercase">
                  Bild Platzhalter
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20 opacity-80" />

              {/* Technical Overlay UI */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/20 pt-6">
                <div className="text-white/50 text-xs font-mono uppercase tracking-widest">
                  System Status<br />
                  <span className="text-brand-orange">Operational</span>
                </div>
                <div className="text-white/50 text-xs font-mono uppercase tracking-widest text-right">
                  Kategorie<br />
                  <span className="text-white">Industry 4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
