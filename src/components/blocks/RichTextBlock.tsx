import { PageContainer } from '@/components/layout/PageContainer';

interface RichTextBlockProps {
  data: any;
}

export function RichTextBlock({ data }: RichTextBlockProps) {
  const content = data?.content || '';

  return (
    <section className="section-padding bg-white/5">
      <PageContainer>
        <div
          className="prose prose-invert prose-lg max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </PageContainer>
    </section>
  );
}
