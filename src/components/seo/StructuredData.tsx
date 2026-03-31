import { getOpeningHours } from '@/lib/cms-server';

// Map German day abbreviations to Schema.org day names
function mapDaysToSchemaOrg(days: string): string[] {
    const dayMap: Record<string, string> = {
        'mo': 'Monday', 'di': 'Tuesday', 'mi': 'Wednesday',
        'do': 'Thursday', 'fr': 'Friday', 'sa': 'Saturday', 'so': 'Sunday',
    };
    const normalized = days.toLowerCase().replace(/\s/g, '');
    // Handle ranges like "mo-do" or "mo-fr"
    const rangeMatch = normalized.match(/^(\w{2})\s*[-–]\s*(\w{2})$/);
    if (rangeMatch) {
        const orderedDays = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'];
        const startIdx = orderedDays.indexOf(rangeMatch[1]);
        const endIdx = orderedDays.indexOf(rangeMatch[2]);
        if (startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx) {
            return orderedDays.slice(startIdx, endIdx + 1).map(d => dayMap[d]).filter(Boolean);
        }
    }
    // Single day
    const singleDay = dayMap[normalized];
    if (singleDay) return [singleDay];
    return [];
}

function parseTimesForSchema(times: string): { opens: string; closes: string } | null {
    const match = times.match(/(\d{1,2}[:.]\d{2})\s*[-–]\s*(\d{1,2}[:.]\d{2})/);
    if (!match) return null;
    return { opens: match[1].replace('.', ':'), closes: match[2].replace('.', ':') };
}

export async function StructuredData() {
    const openingHours = await getOpeningHours();

    const openingHoursSpecification = openingHours
        .map(entry => {
            const schemaOrgDays = mapDaysToSchemaOrg(entry.days);
            const parsed = parseTimesForSchema(entry.times);
            if (schemaOrgDays.length === 0 || !parsed) return null;
            return {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": schemaOrgDays.length === 1 ? schemaOrgDays[0] : schemaOrgDays,
                "opens": parsed.opens,
                "closes": parsed.closes,
            };
        })
        .filter(Boolean);

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
                "openingHoursSpecification": openingHoursSpecification,
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
