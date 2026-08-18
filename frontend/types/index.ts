// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  nama: string;
  email: string;
  role: 'admin' | 'superadmin';
  created_at: string;
}

// ─── Berita ───────────────────────────────────────────────────────────────────

export type KategoriBerita = 'umum' | 'kegiatan' | 'pengumuman' | 'kesehatan' | 'pendidikan' | 'lingkungan' | 'lainnya';

export interface Berita {
  id: string;
  judul: string;
  slug: string;
  isi: string;
  thumbnail_url: string | null;
  kategori: KategoriBerita;
  tanggal_terbit: string;
  penulis_id: string | null;
  penulis?: Pick<User, 'id' | 'nama'>;
  created_at: string;
  updated_at: string;
}

// ─── Prestasi ─────────────────────────────────────────────────────────────────

export type TingkatPrestasi = 'rt_rw' | 'kecamatan' | 'kabupaten' | 'provinsi' | 'nasional';
export type KategoriPrestasi = 'olahraga' | 'seni_budaya' | 'lingkungan' | 'pendidikan' | 'lainnya';

export interface Prestasi {
  id: string;
  nama_prestasi: string;
  slug: string;
  tahun: number;
  tingkat: TingkatPrestasi;
  kategori: KategoriPrestasi;
  deskripsi: string | null;
  foto_url: string | null;
  created_at: string;
}

// ─── Agustusan ────────────────────────────────────────────────────────────────

export type StatusPenampilan = 'menunggu' | 'sedang_tampil' | 'selesai';

export interface AnggotaGrup {
  id: string;
  nama: string;
  grup_id: string;
  created_at: string;
}

export interface GrupPenampilan {
  id: string;
  nama_grup: string;
  jenis_penampilan: string;
  urutan_tampil: number;
  waktu_tampil: string | null;
  status: StatusPenampilan;
  tahun_acara: number;
  created_at: string;
  anggota?: AnggotaGrup[];
}

// ─── Arsip Surat ──────────────────────────────────────────────────────────────

export type KategoriSurat = 'undangan' | 'sk_panitia' | 'proposal' | 'laporan' | 'pengumuman' | 'lainnya';

export interface ArsipSurat {
  id: string;
  judul: string;
  kategori_surat: KategoriSurat;
  tahun: number;
  file_url: string;
  deskripsi: string | null;
  uploaded_by: string | null;
  created_at: string;
}

// ─── UMKM ─────────────────────────────────────────────────────────────────────

export interface Umkm {
  id: string;
  nama_usaha: string;
  jenis_usaha: string;
  nama_pemilik: string;
  kontak: string | null;
  alamat: string | null;
  foto_url: string | null;
  created_at: string;
}

export interface KontakPenting {
  id: string;
  nama_layanan: string;
  nomor_kontak: string;
  keterangan: string | null;
  urutan: number;
  created_at: string;
}

// ─── Galeri ───────────────────────────────────────────────────────────────────

export interface Galeri {
  id: string;
  judul: string;
  foto_url: string;
  kategori_kegiatan: string | null;
  tahun: number | null;
  created_at: string;
}

// ─── Statistik ────────────────────────────────────────────────────────────────

export interface StatistikItem {
  id: string;
  label: string;
  nilai: number;
  satuan: string | null;
  updated_at: string;
}
