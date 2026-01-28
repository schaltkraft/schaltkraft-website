interface WebPageSchemaProps {
    title: string;
    description: string;
    url: string;
}

export function WebPageSchema({ title, description, url }: WebPageSchemaProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": url,
        "isPartOf": {
            "@type": "WebSite",
            "name": "Schaltkraft AG",
            "url": "https://schaltkraft.ch"
        },
        "inLanguage": "de-CH",
        "publisher": {
            "@id": "https://schaltkraft.ch/#organization"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
