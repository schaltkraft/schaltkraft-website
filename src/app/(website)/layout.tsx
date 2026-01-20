import { getHeader, getFooter } from '@/lib/cms-server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/seo/StructuredData';
import '@/app/globals.css';
import { inter, montserrat, oswald, archivoBlack } from '@/lib/fonts';
import { SplashScreen } from '@/components/layout/SplashScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL('https://schaltkraft.ch'),
    title: {
        default: 'Schaltkraft AG | Schaltanlagenbau & Elektro-Engineering Schweiz',
        template: '%s | Schaltkraft AG',
    },
    description: 'Schaltanlagenbau, Steuerungsbau und Elektroplanung aus der Schweiz. Schaltkraft AG – Ihr Partner für individuelle Niederspannungsverteilungen und Automation in Romanshorn.',
    keywords: [
        'Schaltanlagenbau',
        'Schaltanlagen Schweiz',
        'Steuerungsbau',
        'Elektroplanung',
        'Niederspannungsverteilung',
        'Elektro-Engineering',
        'Automation',
        'Romanshorn',
        'Ostschweiz',
        'Swiss Made',
    ],
    authors: [{ name: 'Schaltkraft AG' }],
    creator: 'Schaltkraft AG',
    publisher: 'Schaltkraft AG',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'de_CH',
        url: 'https://schaltkraft.ch',
        siteName: 'Schaltkraft AG',
        title: 'Schaltkraft AG | Schaltanlagenbau & Elektro-Engineering Schweiz',
        description: 'Schaltanlagenbau, Steuerungsbau und Elektroplanung aus der Schweiz. Ihr Partner für individuelle Niederspannungsverteilungen und Automation.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Schaltkraft AG - Schaltanlagenbau Schweiz',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Schaltkraft AG | Schaltanlagenbau Schweiz',
        description: 'Schaltanlagenbau, Steuerungsbau und Elektroplanung aus Romanshorn.',
        images: ['/images/og-image.jpg'],
    },
    alternates: {
        canonical: 'https://schaltkraft.ch',
    },
    verification: {
        // Add Google Search Console verification if available
        // google: 'verification-code',
    },
};

export default async function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const header = await getHeader();
    const footer = await getFooter();

    return (
        <html lang="de">
            <body className={`${montserrat.variable} ${inter.variable} ${oswald.variable} ${archivoBlack.variable} font-sans antialiased bg-black min-h-screen flex flex-col`}>
                <SplashScreen />
                <StructuredData />
                <Header data={header} />
                <main className="flex-grow">{children}</main>
                <Footer data={footer} />
            </body>
        </html>
    );
}
