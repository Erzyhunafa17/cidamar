export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const REVALIDATE = {
  LANDING:    3600,  // 1 jam
  BERITA:     60,    // 1 menit
  PRESTASI:   3600,  // 1 jam
  AGUSTUSAN:  0,     // selalu fresh (SSR)
  UMKM:       3600,
  GALERI:     600,   // 10 menit
  ARSIP:      600,
};

export const KATEGORI_BERITA = [
  { value: 'umum', label: 'Umum' },
  { value: 'kegiatan', label: 'Kegiatan' },
  { value: 'pengumuman', label: 'Pengumuman' },
  { value: 'kesehatan', label: 'Kesehatan' },
  { value: 'pendidikan', label: 'Pendidikan' },
  { value: 'lingkungan', label: 'Lingkungan' },
  { value: 'lainnya', label: 'Lainnya' },
];

export const TINGKAT_PRESTASI = [
  { value: 'rt_rw',      label: 'RT/RW',      badge: 'green'  },
  { value: 'kecamatan',  label: 'Kecamatan',  badge: 'bronze' },
  { value: 'kabupaten',  label: 'Kabupaten',  badge: 'silver' },
  { value: 'provinsi',   label: 'Provinsi',   badge: 'gold'   },
  { value: 'nasional',   label: 'Nasional',   badge: 'gold'   },
] as const;

export const KATEGORI_PRESTASI = [
  { value: 'olahraga',    label: 'Olahraga'    },
  { value: 'seni_budaya', label: 'Seni Budaya' },
  { value: 'lingkungan',  label: 'Lingkungan'  },
  { value: 'pendidikan',  label: 'Pendidikan'  },
  { value: 'lainnya',     label: 'Lainnya'     },
] as const;

export const STATUS_PENAMPILAN = {
  menunggu:      { label: 'Menunggu',      color: 'gray'  },
  sedang_tampil: { label: 'Sedang Tampil', color: 'red'   },
  selesai:       { label: 'Selesai',       color: 'green' },
} as const;

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}
