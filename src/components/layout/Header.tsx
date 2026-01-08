'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  data: any;
}

export function Header({ data }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const pathname = usePathname();

  const logoUrl = data?.logo || '/images/global/logo-placeholder.svg';
  const navItems = data?.navigationItems || [];

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-white/10 shadow-md" : "bg-transparent py-6"
        )}
      >
        <PageContainer className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="relative z-50 flex items-center gap-2 group">
            {data?.logo ? (
              <img
                src={logoUrl}
                alt={data?.logoAlt || 'Schaltkraft'}
                className="h-16 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="text-3xl lg:text-4xl font-bold font-heading uppercase text-white tracking-widest">
                Schalt<span className="text-brand-orange">kraft</span>
              </span>
            )}
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-12">
            {navItems.map((item: any, idx: number) => {
              const hasDropdown = item.children && item.children.length > 0;
              const isActive = pathname === item.url;
              const isMegaMenu = hasDropdown && item.children.length > 2; // Treat 3+ items as mega menu potentially

              return (
                <div key={idx} className="relative group">
                  <Link
                    href={item.url || '#'}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium uppercase tracking-wider transition-colors py-6",
                      isActive ? "text-brand-orange" : "text-white/90 hover:text-brand-orange"
                    )}
                  >
                    {item.label}
                    {hasDropdown && <ChevronDown className="w-5 h-5 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* DROPDOWN / MEGA MENU */}
                  {hasDropdown && (
                    <div className={cn(
                      "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out transform group-hover:translate-y-0 translate-y-2",
                      isMegaMenu ? "w-[700px]" : "w-72"
                    )}>
                      <div className="bg-zinc-900 border border-white/10 rounded-sm shadow-xl p-8 relative overflow-hidden">
                        {/* Decorative top colored line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-orange"></div>

                        <div className={cn("grid gap-6", isMegaMenu ? "grid-cols-2" : "grid-cols-1")}>
                          {item.children.map((child: any, cIdx: number) => (
                            <Link
                              key={cIdx}
                              href={child.url}
                              className="group/item block p-4 rounded hover:bg-white/5 transition-colors"
                            >
                              <div className="font-bold text-white text-lg group-hover/item:text-brand-orange transition-colors">
                                {child.label}
                              </div>
                              {child.description && (
                                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="tel:+41715217777"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-lg font-medium"
            >
              <Phone className="w-6 h-6 text-brand-orange" />
              <span>+41 71 521 77 77</span>
            </a>

            {/* Optional CTA if set distinct from nav */}
            {/* <Button variant="primary" size="sm">Angebot einholen</Button> */}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden relative z-50 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </PageContainer>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={cn(
        "fixed inset-0 bg-zinc-950 z-40 transition-transform duration-300 lg:hidden flex flex-col pt-24 px-6 pb-8 overflow-y-auto",
        isMobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col gap-6">
          {navItems.map((item: any, idx: number) => (
            <div key={idx} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
              {item.children && item.children.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-lg font-bold text-white/50 uppercase tracking-widest mb-2">{item.label}</div>
                  <div className="grid gap-3 pl-4 border-l-2 border-white/10">
                    <Link href={item.url} className="text-white hover:text-brand-orange block font-medium">
                      Alle {item.label}
                    </Link>
                    {item.children.map((child: any, cIdx: number) => (
                      <Link
                        key={cIdx}
                        href={child.url}
                        className="text-zinc-400 hover:text-brand-orange block py-1"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.url || '#'}
                  className="text-2xl font-bold text-white hover:text-brand-orange transition-colors uppercase"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <a
            href="tel:+41715217777"
            className="flex items-center gap-3 text-white mb-6 p-4 bg-white/5 rounded-lg active:bg-white/10"
          >
            <Phone className="w-5 h-5 text-brand-orange" />
            <span className="text-lg font-bold">+41 71 521 77 77</span>
          </a>

          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Schaltkraft AG
          </p>
        </div>
      </div>
    </>
  );
}
