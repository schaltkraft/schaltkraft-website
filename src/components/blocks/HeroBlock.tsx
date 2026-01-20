'use client';

import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';

interface HeroBlockProps {
  data: any;
}

export function HeroBlock({ data }: HeroBlockProps) {
  const headline = data?.headline || "";
  const lead = data?.subheadline || data?.lead || "";
  const buttonPrimary = data?.ctaPrimary;
  const buttonSecondary = data?.ctaSecondary;

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-zinc-950">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-32 items-center relative z-10">

          {/* Left: Text Content */}
          <motion.div
            className="flex flex-col gap-8 md:gap-10 lg:gap-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-block px-3 py-1 border border-brand-orange/50 text-brand-orange text-xs md:text-sm font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6 bg-brand-orange/5">
                Schaltanlagenbau & Automation
              </div>
              <h1 className="hero-h1 whitespace-pre-line tracking-tighter text-white drop-shadow-xl py-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-heading uppercase leading-[0.95]">
                {headline}
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-zinc-400 text-lg md:text-xl lg:text-2xl font-medium max-w-3xl leading-relaxed border-l-4 border-brand-orange pl-4 md:pl-6"
            >
              {lead}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mt-2 md:mt-4"
            >
              {buttonPrimary?.label && (
                <Link href={buttonPrimary.url || '/kontakt'}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="h-14 md:h-16 px-8 md:px-12 text-base md:text-lg font-bold uppercase tracking-widest bg-brand-orange hover:bg-brand-orange/90 text-white rounded-none border-2 border-transparent hover:border-white/20 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                      {buttonPrimary.label}
                    </Button>
                  </motion.div>
                </Link>
              )}

              {buttonSecondary?.label && (
                <Link href={buttonSecondary.url || '#'}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="h-14 md:h-16 px-8 md:px-12 text-base md:text-lg font-bold uppercase tracking-widest bg-transparent border-2 border-white/20 text-white rounded-none hover:bg-white/5 hover:border-brand-orange transition-all">
                      {buttonSecondary.label}
                    </Button>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Image Frame */}
          <motion.div
            className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[700px] w-full z-0 group perspective-1000"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tech Decoration Lines */}
            <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-brand-orange/50 z-20"></div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 border-b-2 border-l-2 border-brand-orange/50 z-20"></div>

            {/* Main Image Container */}
            <div className="relative h-full w-full border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl">
              {data?.image ? (
                <motion.img
                  src={data.image}
                  alt="Hero"
                  className="w-full h-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-1000"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-bold uppercase">
                  Bild Platzhalter
                </div>
              )}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20 opacity-80" />

              {/* Technical Overlay UI */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex justify-between items-end border-t border-white/20 pt-4 md:pt-6">
                <div className="text-white/50 text-[10px] md:text-xs font-mono uppercase tracking-widest">
                  System Status<br />
                  <span className="text-brand-orange">Operational</span>
                </div>
                <div className="text-white/50 text-[10px] md:text-xs font-mono uppercase tracking-widest text-right">
                  Kategorie<br />
                  <span className="text-white">Industry 4.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
