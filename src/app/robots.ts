import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/keystatic/', '/impressum', '/datenschutz', '/agb'],
        },
        sitemap: [
            'https://schaltkraft.ch/sitemap.xml',
            'https://schaltkraft.ch/llms.txt'
        ],
    };
}
