export function HeroBlock({
  backgroundImage,
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: any) {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : '#1a1a1a',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase">
          {headline}
        </h1>
        
        {subheadline && (
          <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            {subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaPrimary?.text && (
            <a
              href={ctaPrimary.isEmail ? `mailto:${ctaPrimary.url}` : ctaPrimary.url}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              {ctaPrimary.text}
            </a>
          )}
          
          {ctaSecondary?.text && (
            <a
              href={ctaSecondary.isPhone ? `tel:${ctaSecondary.url}` : ctaSecondary.url}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors border border-white/30"
            >
              {ctaSecondary.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
