export function Footer({ data }: { data: any }) {
  if (!data) return null;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            {data.logo && (
              <img
                src={data.logo}
                alt="Footer Logo"
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
            )}
            {data.tagline && (
              <p className="text-gray-400 italic">{data.tagline}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 uppercase">Quicklinks</h3>
            <ul className="space-y-2">
              {data.quicklinks?.map((link: any, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {data.contactInfo && (
            <div>
              <h3 className="text-lg font-bold mb-4 uppercase">Kontaktiere uns</h3>
              <div className="text-gray-400 space-y-2">
                <p className="font-semibold text-white">
                  {data.contactInfo.companyName}
                </p>
                <p className="whitespace-pre-line">{data.contactInfo.address}</p>
                {data.contactInfo.email && (
                  <p>
                    <a
                      href={`mailto:${data.contactInfo.email}`}
                      className="hover:text-white transition-colors"
                    >
                      {data.contactInfo.email}
                    </a>
                  </p>
                )}
                {data.contactInfo.phone && (
                  <p>
                    <a
                      href={`tel:${data.contactInfo.phone}`}
                      className="hover:text-white transition-colors"
                    >
                      {data.contactInfo.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {data.copyright && (
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>{data.copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
