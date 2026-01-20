export function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://schaltkraft.ch/#organization",
        "name": "Schaltkraft AG",
        "alternateName": "SchaltKraft AG",
        "description": "Ihr Schweizer Partner für Schaltanlagenbau, Steuerungsbau und Elektro-Engineering in Romanshorn. Niederspannungsverteilungen, Planung und Montage aus einer Hand.",
        "image": "https://schaltkraft.ch/images/global/logo.svg",
        "logo": "https://schaltkraft.ch/images/global/logo.svg",
        "telephone": "+41 71 521 77 77",
        "email": "info@schaltkraft.ch",
        "url": "https://schaltkraft.ch",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mittliszelgstrasse 5",
            "addressLocality": "Romanshorn",
            "postalCode": "8590",
            "addressRegion": "Thurgau",
            "addressCountry": "CH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.5651,
            "longitude": 9.3781
        },
        "areaServed": [
            {
                "@type": "Country",
                "name": "Switzerland"
            },
            {
                "@type": "State",
                "name": "Ostschweiz"
            }
        ],
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
                "opens": "07:30",
                "closes": "17:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Friday",
                "opens": "07:30",
                "closes": "16:00"
            }
        ],
        "sameAs": [
            "https://www.linkedin.com/company/schaltkraft/",
            "https://www.instagram.com/schaltkraft"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dienstleistungen",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Schaltanlagenbau",
                        "description": "Niederspannungsverteilungen, Steuerungsanlagen und Spezialanlagen"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Planung & Engineering",
                        "description": "Elektroschemata, CAD-Planung und technische Beratung"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Montage & Installation",
                        "description": "Vor-Ort-Montage, Inbetriebnahme und Verkabelung"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Service & Modernisierung",
                        "description": "Retrofit, Anlagenerweiterungen und Wartung"
                    }
                }
            ]
        },
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
