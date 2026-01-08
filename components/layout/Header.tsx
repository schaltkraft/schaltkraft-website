'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header({ data }: { data: any }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <img
              src={data.logo}
              alt={data.logoAlt || 'Logo'}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {data.navigationItems?.map((item: any, idx: number) => (
              <a
                key={idx}
                href={item.url}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {data.ctaButton?.text && (
            <a
              href={data.ctaButton.url}
              className="hidden md:inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {data.ctaButton.text}
            </a>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-red-600"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-6 space-y-4 border-t">
            {data.navigationItems?.map((item: any, idx: number) => (
              <a
                key={idx}
                href={item.url}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className="block text-gray-700 hover:text-red-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {data.ctaButton?.text && (
              <a
                href={data.ctaButton.url}
                className="block w-full text-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {data.ctaButton.text}
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
