export function TextImageBlock({ title, text, image, imagePosition }: any) {
  const isLeft = imagePosition === 'left';

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
          <div className={isLeft ? 'md:order-2' : ''}>
            {title && (
              <h2 className="text-3xl font-bold mb-6 uppercase text-red-600">
                {title}
              </h2>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>

          <div className={isLeft ? 'md:order-1' : ''}>
            {image && (
              <img
                src={image}
                alt={title || 'Bild'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
