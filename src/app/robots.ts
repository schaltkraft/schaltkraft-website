import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/keystatic/', // Hide CMS
        },
        sitemap: 'https://schaltkraft.ch/sitemap.xml',
    };
}
