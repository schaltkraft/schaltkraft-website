import { getHeader, getFooter } from '@/lib/cms-server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/seo/StructuredData';
import '@/app/globals.css';
import { inter, montserrat, oswald, archivoBlack } from '@/lib/fonts';
import { SplashScreen } from '@/components/layout/SplashScreen';

export const metadata = {
    title: 'Schaltkraft AG',
    description: 'Qualität in jedem Schaltmoment',
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
