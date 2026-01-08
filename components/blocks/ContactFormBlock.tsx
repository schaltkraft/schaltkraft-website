'use client';
import { useState } from 'react';

export function ContactFormBlock({ title, subtitle, showMap, mapEmbedUrl }: any) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const body = new URLSearchParams(formData as any).toString();

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (response.ok) {
        setStatus('success');
        e.currentTarget.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 uppercase">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-center text-gray-600 mb-12">{subtitle}</p>
          )}

          <div className="grid md:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <input name="bot-field" />
              </p>

              <div>
                <label className="block text-sm font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">E-Mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Nachricht *</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center">
                  ✓ Nachricht erfolgreich versendet!
                </p>
              )}
              
              {status === 'error' && (
                <p className="text-red-600 text-center">
                  Fehler beim Senden. Bitte versuchen Sie es erneut.
                </p>
              )}
            </form>

            {showMap && mapEmbedUrl && (
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
