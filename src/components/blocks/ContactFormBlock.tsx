import { PageContainer } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/features/contact/ContactForm';

interface ContactFormBlockProps {
  data: any;
}

export function ContactFormBlock({ data }: ContactFormBlockProps) {
  return (
    <section className="section-padding bg-zinc-900">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold uppercase mb-6">{data.headline}</h2>
            <p className="text-zinc-400 mb-8">
              Wir stehen Ihnen für alle Fragen zur Verfügung. Füllen Sie einfach das Formular aus.
            </p>
          </div>
          <div className="bg-black/20 p-8 rounded border border-white/10">
            <ContactForm />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
