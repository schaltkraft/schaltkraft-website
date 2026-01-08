import Link from 'next/link';
import { PageContainer } from '@/components/layout/PageContainer';
import { Phone, Mail, MapPin } from 'lucide-react';

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
    <footer className="bg-zinc-950 text-white pt-24 pb-8 border-t border-white/10">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* COL 1: Logo & Claim */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img src="/images/schaltkraft-logo.png" alt="Schaltkraft AG" className="h-14 w-auto" />
            </Link>
            <p className="text-zinc-400 leading-relaxed max-w-xs">
              {claim}
            </p>
            {/* Association Logos */}
            <div className="flex gap-4 pt-4">
              <div className="bg-white/5 p-2 rounded-sm w-fit h-20 flex items-center justify-center">
                <img src="/images/verband_vsas.png" alt="VSAS" className="h-full w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <div className="bg-white/5 p-2 rounded-sm w-fit h-20 flex items-center justify-center">
                <img src="/images/verband-romanshorn.png" alt="Gewerbe Romanshorn" className="h-full w-auto opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* COL 2: Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/about-us" className="text-zinc-300 hover:text-brand-orange transition-colors">Über uns</Link></li>
              <li><Link href="/contact" className="text-zinc-300 hover:text-brand-orange transition-colors">Kontakt</Link></li>
              {/* Dynamic links from CMS if any extra */}
              {links.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.url} className="text-zinc-300 hover:text-brand-orange transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-6">Rechtliches</h4>
            <ul className="space-y-3">
              <li><Link href="/agb" className="text-zinc-300 hover:text-brand-orange transition-colors">AGB</Link></li>
              <li><Link href="/impressum" className="text-zinc-300 hover:text-brand-orange transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-zinc-300 hover:text-brand-orange transition-colors">Datenschutz</Link></li>
            </ul>
          </div>

          {/* COL 4: Kontakt */}
          <div>
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>{data?.copyright || `© ${currentYear} All rights reserved, Schaltkraft AG`}</p>
          <div className="flex gap-4">
            <span>Swiss Made Quality</span>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
