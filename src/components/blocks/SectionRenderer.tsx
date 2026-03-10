import { HeroBlock } from './HeroBlock';
import { LogoCloudBlock } from './LogoCloudBlock';
import { IntroBlock } from './IntroBlock';
import { ServicesBlock } from './ServicesBlock';
import { ServicesTeaserBlock } from './ServicesTeaserBlock';
import { TestimonialsBlock } from './TestimonialsBlock';
import { ContactTeaserBlock } from './ContactTeaserBlock';
import { ContactFormBlock } from './ContactFormBlock';
import { ValuesBlock } from './ValuesBlock';
import { TeamGridBlock } from './TeamGridBlock';
import { RichTextBlock } from './RichTextBlock';
import { TrustBarBlock } from './TrustBarBlock';
import { PartnerMarqueeBlock } from './PartnerMarqueeBlock';
import { AccordionBlock } from './AccordionBlock';
import { TimelineBlock } from './TimelineBlock';
import { FeatureGridBlock } from './FeatureGridBlock';
import { JobGridBlock } from './JobGridBlock';
import { TextTextBlock } from './TextTextBlock';
import { JobPerksGalleryBlock } from './JobPerksGalleryBlock';


interface SectionRendererProps {
    blocks: readonly any[];
    isNested?: boolean;
}

export function SectionRenderer({ blocks, isNested = false }: SectionRendererProps) {
    if (!blocks || !Array.isArray(blocks)) return null;

    // Track intro block index separately for correct image alternating
    let introBlockIndex = 0;

    return (
        <div className="flex flex-col">
            {blocks.map((block, index) => {
                const Component = getBlockComponent(block.discriminant);
                if (!Component) {
                    console.warn(`No component found for block type: ${block.discriminant}`);
                    return null;
                }
                // Pass the intro-specific index for intro blocks
                const blockIndex = block.discriminant === 'intro' ? introBlockIndex++ : index;
                return <Component key={index} data={block.value} isNested={isNested} index={blockIndex} />;
            })}
        </div>
    );
}

function getBlockComponent(type: string) {
    switch (type) {
        case 'hero':
            return HeroBlock;
        case 'trustBar':
            return TrustBarBlock;
        case 'partnerSlider':
            return PartnerMarqueeBlock;
        case 'logoCloud':
            return LogoCloudBlock;
        case 'intro':
            return IntroBlock;
        case 'servicesTeaser':
            return ServicesTeaserBlock;
        case 'services':
            return ServicesBlock;
        case 'testimonials':
            return TestimonialsBlock;
        case 'contactTeaser':
            return ContactTeaserBlock;
        case 'contactForm':
            return ContactFormBlock;
        case 'values':
            return ValuesBlock;
        case 'teamGrid':
            return TeamGridBlock;
        case 'richText':
            return RichTextBlock;
        case 'accordion':
            return AccordionBlock;
        case 'timeline':
            return TimelineBlock;
        case 'featureGrid':
            return FeatureGridBlock;
        case 'jobList':
            return JobGridBlock;
        case 'textText':
            return TextTextBlock;
        case 'jobPerksGallery':
            return JobPerksGalleryBlock;

        default:
            return null;
    }
}
