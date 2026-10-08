const STATISTIK = [
  { label: 'Kepala Keluarga', nilai: 150,  satuan: 'KK' },
  { label: 'Rukun Tetangga',   nilai: 5,    satuan: 'RT' },
  { label: 'Penghargaan',     nilai: 20,   satuan: 'Total' },
  { label: 'Usaha Lokal',      nilai: 15,   satuan: 'UMKM' },
];

export default function StatistikSection() {
  return (
    <section
      id="statistik"
      className="py-20 bg-cream-alt border-y border-slate/10"
      aria-label="Statistik Kampung Cidamar"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATISTIK.map(({ label, nilai, satuan }) => (
            <div
              key={label}
              className="flex flex-col border-l border-slate/20 pl-6 lg:pl-8"
            >
              <div className="text-4xl lg:text-5xl font-heading text-charcoal mb-2">
                {nilai.toLocaleString('id-ID')}
              </div>
              <div className="text-xs uppercase tracking-widest text-earth-accent font-semibold mb-1">
                {satuan}
              </div>
              <div className="text-[0.95rem] text-charcoal/70 font-light">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
