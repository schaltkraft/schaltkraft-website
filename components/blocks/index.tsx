import { HeroBlock } from './HeroBlock';
import { PartnerMarqueeBlock } from './PartnerMarqueeBlock';
import { ServicesBlock } from './ServicesBlock';
import { TextImageBlock } from './TextImageBlock';
import { TestimonialsBlock } from './TestimonialsBlock';
import { ContactFormBlock } from './ContactFormBlock';
import { RichTextBlock } from './RichTextBlock';

export function SectionRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        Keine Inhalte vorhanden. Bitte im CMS hinzufügen.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {blocks.map((block, index) => {
        const type = block.discriminant;
        const props = block.value;

        switch (type) {
          case 'hero':
            return <HeroBlock key={index} {...props} />;
          
          case 'partnerMarquee':
            return <PartnerMarqueeBlock key={index} {...props} />;
          
          case 'services':
            return <ServicesBlock key={index} {...props} />;
          
          case 'textImage':
            return <TextImageBlock key={index} {...props} />;
          
          case 'testimonials':
            return <TestimonialsBlock key={index} {...props} />;
          
          case 'contactForm':
            return <ContactFormBlock key={index} {...props} />;
          
          case 'richText':
            return <RichTextBlock key={index} {...props} />;
          
          default:
            console.warn(`Unbekannter Block-Typ: ${type}`);
            return null;
        }
      })}
    </div>
  );
}
