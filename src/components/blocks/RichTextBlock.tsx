import { PageContainer } from '@/components/layout/PageContainer';

interface RichTextBlockProps {
  data: any;
}

export function RichTextBlock({ data }: RichTextBlockProps) {
  const content = data?.content || '';

  return (
    <section className="section-padding-compact">
      <PageContainer>
        <div
          className="prose prose-invert prose-lg max-w-7xl mx-auto prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-zinc-300 prose-p:leading-relaxed prose-li:text-zinc-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-li:marker:text-brand-orange prose-strong:text-brand-orange prose-table:w-full prose-table:text-left prose-table:border-collapse prose-th:p-4 prose-th:border-b prose-th:border-zinc-700 prose-th:font-bold prose-th:text-white prose-td:p-4 prose-td:text-zinc-300 prose-img:rounded-xl prose-img:my-8 prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </PageContainer>
    </section>
  );
}
