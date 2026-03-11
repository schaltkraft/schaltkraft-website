export function StructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://schaltkraft.ch/#organization",
                "name": "Schaltkraft AG",
                "url": "https://schaltkraft.ch",
                "logo": "https://schaltkraft.ch/logo_Schaltkraft_800x480.jpg",
                "telephone": "+41715217777",
                "email": "info@schaltkraft.ch",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Mittliszelgstrasse 5",
                    "addressLocality": "Romanshorn",
                    "postalCode": "8590",
                    "addressCountry": "CH"
                },
                "sameAs": []
            },
            {
                "@type": "LocalBusiness",
                "@id": "https://schaltkraft.ch/#localbusiness",
                "name": "Schaltkraft AG",
                "image": "https://schaltkraft.ch/logo_Schaltkraft_800x480.jpg",
                "telephone": "+41715217777",
                "email": "info@schaltkraft.ch",
                "url": "https://schaltkraft.ch",
                "priceRange": "$$",
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
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Mittliszelgstrasse 5",
                    "addressLocality": "Romanshorn",
                    "postalCode": "8590",
                    "addressCountry": "CH"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 47.5654,
                    "longitude": 9.3765
                }
            },
            {
                "@type": "WebSite",
                "@id": "https://schaltkraft.ch/#website",
                "url": "https://schaltkraft.ch",
                "name": "Schaltkraft AG",
                "publisher": { "@id": "https://schaltkraft.ch/#organization" }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
