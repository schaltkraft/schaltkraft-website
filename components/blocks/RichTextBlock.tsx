export function RichTextBlock({ content }: any) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div
          className="prose prose-lg max-w-4xl mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
