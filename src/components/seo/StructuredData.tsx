import Head from 'next/head';

export function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Schaltkraft AG",
        "image": "https://schaltkraft.ch/images/global/logo.svg",
        "telephone": "+41 71 521 77 77",
        "email": "info@schaltkraft.ch",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mittliszelgstrasse 5",
            "addressLocality": "Romanshorn",
            "postalCode": "8590",
            "addressCountry": "CH"
        },
        "url": "https://schaltkraft.ch",
        "sameAs": [
            // Social links if any
        ],
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
