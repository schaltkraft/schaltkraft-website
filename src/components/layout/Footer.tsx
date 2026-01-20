'use client';

import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

// LinkedIn icon component
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Instagram icon component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface FooterProps {
  data: any;
}

export function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Parse data or use defaults
  const contactInfo = data?.contactInfo || {};
  const companyName = contactInfo.companyName || 'Schaltkraft AG';
  const address = contactInfo.address || 'Mittliszelgstrasse 5, 8590 Romanshorn';
  const email = contactInfo.email || 'info@schaltkraft.ch';
  const phone = contactInfo.phone || '071 521 77 77';

  const claim = data?.tagline || data?.claim || 'Qualität in jedem Schaltmoment';
  const links = data?.quicklinks || data?.links || [];

  return (
    <footer className="bg-zinc-950 text-white pt-16 pb-6 border-t border-white/10">
      <PageContainer>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >

          {/* COL 1: Logo & Claim */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <Link href="/" className="block">
              <img src="/images/schaltkraft-logo.png" alt="Schaltkraft AG" className="h-14 w-auto" />
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-xs">
              {claim}
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/company/schaltkraft/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/schaltkraft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

            {/* Association Logos */}
            <div className="flex gap-4 pt-4 flex-wrap">
              <div className="bg-white/5 p-2 rounded-sm h-16 md:h-20 flex items-center justify-center">
                <img src="/images/verband_vsas.png" alt="VSAS" className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="bg-white/5 p-2 rounded-sm h-16 md:h-20 flex items-center justify-center">
                <img src="/images/verband-romanshorn.png" alt="Gewerbe Romanshorn" className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>

          {/* COL 2: Navigation */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="text-zinc-300 hover:text-brand-orange transition-colors">Über uns</Link></li>
              <li><Link href="/dienstleistungen" className="text-zinc-300 hover:text-brand-orange transition-colors">Dienstleistungen</Link></li>
              <li><Link href="/team" className="text-zinc-300 hover:text-brand-orange transition-colors">Team</Link></li>
              <li><Link href="/jobs" className="text-zinc-300 hover:text-brand-orange transition-colors">Karriere</Link></li>
              <li><Link href="/contact" className="text-zinc-300 hover:text-brand-orange transition-colors">Kontakt</Link></li>
            </ul>
          </motion.div>

          {/* COL 3: Legal */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              <li><Link href="/agb" className="text-zinc-300 hover:text-brand-orange transition-colors">AGB</Link></li>
              <li><Link href="/impressum" className="text-zinc-300 hover:text-brand-orange transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-zinc-300 hover:text-brand-orange transition-colors">Datenschutz</Link></li>
            </ul>
          </motion.div>

          {/* COL 4: Kontakt */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                <span className="whitespace-pre-line">{address}</span>
              </div>
              <div>
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                  <Mail className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
                  <span>{email}</span>
                </a>
              </div>
              <div>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors group">
                  <Phone className="w-5 h-5 text-brand-orange group-hover:scale-110 transition-transform" />
                  <span className="font-bold">{phone}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>{data?.copyright || `© ${currentYear} All rights reserved, Schaltkraft AG`}</p>
          <div className="flex gap-4">
            <span>Swiss Made Quality</span>
          </div>
        </motion.div>
      </PageContainer>
    </footer>
  );
}
