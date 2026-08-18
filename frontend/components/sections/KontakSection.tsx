'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function KontakSection() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi kirim (akan diimplementasi di fase selanjutnya)
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <section
      id="kontak"
      className="section-padding bg-white"
      aria-label="Kontak dan Lokasi Kampung Cidamar"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-amber-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-primary mb-4">
            Kontak & Lokasi
          </h2>
          <p className="text-brown-medium max-w-xl mx-auto">
            Ada pertanyaan atau ingin berkolaborasi? Silakan hubungi kami atau kunjungi langsung Kampung Cidamar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info Kontak + Peta */}
          <div className="space-y-6">
            {/* Info */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Alamat', value: 'Kampung Cidamar, Kecamatan [Kecamatan], Kabupaten [Kabupaten], Jawa Barat', href: '' },
                { icon: Phone, label: 'Telepon', value: '+62 xxx-xxxx-xxxx', href: 'tel:+62' },
                { icon: Mail,  label: 'Email',   value: 'info@kampungcidamar.id', href: 'mailto:info@kampungcidamar.id' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-2xl bg-cream-bg border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-green-pale flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-secondary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brown-medium uppercase tracking-wide mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="text-green-primary font-medium hover:text-green-secondary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-green-primary font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Peta Google Maps */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64 bg-gray-100 relative shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=-6.6483361,106.6362894&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Peta Lokasi Kampung Cidamar"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-cream-bg rounded-2xl p-6 border border-gray-100">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
                <CheckCircle className="w-16 h-16 text-green-secondary" />
                <h3 className="text-xl font-bold text-green-primary">Pesan Terkirim!</h3>
                <p className="text-brown-medium">Terima kasih telah menghubungi kami. Kami akan membalas segera.</p>
                <Button variant="outline" onClick={() => setSent(false)}>
                  Kirim Pesan Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-green-primary mb-6">Kirim Pesan</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nama" className="block text-sm font-semibold text-brown-dark mb-1.5">
                      Nama Lengkap <span className="text-red-alert">*</span>
                    </label>
                    <input
                      id="nama"
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-brown-dark placeholder:text-gray-400 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-kontak" className="block text-sm font-semibold text-brown-dark mb-1.5">
                      Email <span className="text-red-alert">*</span>
                    </label>
                    <input
                      id="email-kontak"
                      type="email"
                      required
                      placeholder="email@contoh.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-brown-dark placeholder:text-gray-400 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subjek" className="block text-sm font-semibold text-brown-dark mb-1.5">
                    Subjek
                  </label>
                  <input
                    id="subjek"
                    type="text"
                    placeholder="Perihal pesan Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-brown-dark placeholder:text-gray-400 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="pesan" className="block text-sm font-semibold text-brown-dark mb-1.5">
                    Pesan <span className="text-red-alert">*</span>
                  </label>
                  <textarea
                    id="pesan"
                    required
                    rows={5}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-brown-dark placeholder:text-gray-400 focus:outline-none focus:border-green-secondary focus:ring-2 focus:ring-green-secondary/20 transition-all resize-none"
                  />
                </div>

                <Button type="submit" loading={loading} fullWidth size="lg">
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
