import { getOpeningHours } from '@/lib/cms-server';
import { ContactPageClient } from './ContactPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakt',
    description: 'Kontaktieren Sie Schaltkraft AG in Romanshorn für Offertanfragen, Projektberatung und technischen Support.',
};

export default async function ContactPage() {
    const openingHours = await getOpeningHours();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "@id": "https://schaltkraft.ch/contact",
                        "url": "https://schaltkraft.ch/contact",
                        "name": "Kontakt – Schaltkraft AG",
                        "description": "Kontaktieren Sie Schaltkraft AG in Romanshorn für Offertanfragen, Projektberatung und technischen Support.",
                        "publisher": { "@id": "https://schaltkraft.ch/#organization" },
                        "breadcrumb": {
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://schaltkraft.ch" },
                                { "@type": "ListItem", "position": 2, "name": "Kontakt", "item": "https://schaltkraft.ch/contact" }
                            ]
                        }
                    })
                }}
            />
            <ContactPageClient openingHours={openingHours} />
        </>
    );
}
