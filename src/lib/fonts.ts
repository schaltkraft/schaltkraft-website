import { Montserrat, Inter, Oswald, Archivo_Black } from 'next/font/google';

export const archivoBlack = Archivo_Black({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-archivo-black',
    weight: '400',
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['300', '400', '500', '600'],
});

export const oswald = Oswald({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-oswald',
    weight: ['200', '300', '400', '500', '600', '700'],
});
