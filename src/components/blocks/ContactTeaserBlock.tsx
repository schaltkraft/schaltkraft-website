import { getOpeningHours } from '@/lib/cms-server';
import { ContactTeaserClient } from './ContactTeaserClient';

interface ContactTeaserBlockProps {
    data: {
        headline?: string;
        text?: string;
    }
}

export async function ContactTeaserBlock({ data }: ContactTeaserBlockProps) {
    const openingHours = await getOpeningHours();

    return <ContactTeaserClient data={data} openingHours={openingHours} />;
}
