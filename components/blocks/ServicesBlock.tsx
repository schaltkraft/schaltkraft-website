export function ServicesBlock({ title, subtitle, serviceList }: any) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-12">
          {serviceList?.map((service: any, idx: number) => (
            <div key={idx} className="group">
              {service.number && (
                <div className="text-5xl font-bold text-red-600 mb-4">
                  {service.number}
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-6 uppercase">
                {service.title}
              </h3>
              
              <ul className="space-y-3">
                {service.items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
