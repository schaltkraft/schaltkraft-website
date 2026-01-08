export function TestimonialsBlock({ title, testimonialItems }: any) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase">
            {title}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialItems?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{item.quote}"
              </p>

              <div className="border-t pt-6">
                {item.companyLogo && (
                  <img
                    src={item.companyLogo}
                    alt={item.companyName}
                    className="h-8 w-auto mb-4 grayscale"
                  />
                )}
                
                <p className="font-bold text-gray-900">{item.companyName}</p>
                <p className="text-sm text-gray-600">
                  {item.authorName}, {item.authorRole}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
