'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function KontakSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <section
      id="kontak"
      className="py-24 md:py-32 bg-cream text-charcoal border-b border-slate/10"
      aria-label="Kontak dan Lokasi Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          <div className="lg:col-span-5">
            <span className="block text-xs uppercase tracking-widest text-earth-accent font-semibold mb-6">
              Mulai Percakapan
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-tight mb-8">
              Hubungi Kami.
            </h2>
            <p className="text-charcoal/70 text-lg leading-relaxed font-light mb-12">
              Bagi pertanyaan, kerjasama, atau undangan kolaborasi, silakan hubungi kami melalui formulir di samping atau kunjungi lokasi secara langsung.
            </p>

            <div className="pt-12 border-t border-slate/10 space-y-8">
              <div>
                <span className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                  Lokasi
                </span>
                <p className="text-lg font-medium">Kampung Cidamar</p>
                <p className="text-charcoal/70">Jawa Barat, Indonesia</p>
              </div>
              
              <div>
                <span className="block text-xs uppercase tracking-widest text-charcoal/50 font-semibold mb-2">
                  Email
                </span>
                <a href="mailto:info@kampungcidamar.id" className="text-lg font-medium hover:text-earth-accent transition-colors">
                  info@kampungcidamar.id
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5 xl:col-start-7 bg-cream-alt p-8 md:p-12">
            {sent ? (
              <div className="flex flex-col h-full justify-center min-h-[400px]">
                <h3 className="text-2xl font-heading font-medium mb-4">Pesan Terkirim.</h3>
                <p className="text-charcoal/70 font-light mb-8">
                  Terima kasih telah menghubungi kami. Tim kami akan segera menindaklanjuti pesan Anda.
                </p>
                <Button variant="outline" onClick={() => setSent(false)} className="w-fit">
                  Kirim Pesan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="nama" className="block text-xs uppercase tracking-widest font-semibold text-charcoal/70 mb-3">
                    Nama Lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    className="w-full bg-transparent border-b border-slate/20 pb-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-earth-accent transition-colors rounded-none"
                    placeholder="Masukkan nama"
                  />
                </div>
                
                <div>
                  <label htmlFor="email-kontak" className="block text-xs uppercase tracking-widest font-semibold text-charcoal/70 mb-3">
                    Email
                  </label>
                  <input
                    id="email-kontak"
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-slate/20 pb-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-earth-accent transition-colors rounded-none"
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label htmlFor="subjek" className="block text-xs uppercase tracking-widest font-semibold text-charcoal/70 mb-3">
                    Subjek
                  </label>
                  <input
                    id="subjek"
                    type="text"
                    className="w-full bg-transparent border-b border-slate/20 pb-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-earth-accent transition-colors rounded-none"
                    placeholder="Perihal pesan"
                  />
                </div>

                <div>
                  <label htmlFor="pesan" className="block text-xs uppercase tracking-widest font-semibold text-charcoal/70 mb-3">
                    Pesan
                  </label>
                  <textarea
                    id="pesan"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-slate/20 pb-2 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-earth-accent transition-colors resize-none rounded-none"
                    placeholder="Tulis pesan Anda..."
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" loading={loading} fullWidth size="lg">
                    Kirim Pesan
                  </Button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
