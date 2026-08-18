-- ============================================================
-- Schema Database Kampung Cidamar
-- Jalankan di Supabase SQL Editor (Settings → SQL Editor)
-- ============================================================

-- 1. Tabel users (extend Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nama          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'superadmin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabel berita
CREATE TABLE IF NOT EXISTS public.berita (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul           VARCHAR(500) NOT NULL,
  slug            VARCHAR(600) UNIQUE NOT NULL,
  isi             TEXT NOT NULL,
  thumbnail_url   TEXT,
  kategori        VARCHAR(100) NOT NULL DEFAULT 'umum'
                    CHECK (kategori IN ('umum','kegiatan','pengumuman','kesehatan','pendidikan','lingkungan','lainnya')),
  tanggal_terbit  DATE NOT NULL DEFAULT CURRENT_DATE,
  penulis_id      UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_berita_slug     ON public.berita(slug);
CREATE INDEX IF NOT EXISTS idx_berita_kategori ON public.berita(kategori);
CREATE INDEX IF NOT EXISTS idx_berita_tanggal  ON public.berita(tanggal_terbit DESC);

-- 3. Tabel prestasi
CREATE TABLE IF NOT EXISTS public.prestasi (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_prestasi   VARCHAR(500) NOT NULL,
  slug            VARCHAR(600) UNIQUE NOT NULL,
  tahun           SMALLINT NOT NULL CHECK (tahun BETWEEN 1945 AND 2100),
  tingkat         VARCHAR(30) NOT NULL
                    CHECK (tingkat IN ('rt_rw','kecamatan','kabupaten','provinsi','nasional')),
  kategori        VARCHAR(50) NOT NULL
                    CHECK (kategori IN ('olahraga','seni_budaya','lingkungan','pendidikan','lainnya')),
  deskripsi       TEXT,
  foto_url        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prestasi_tahun    ON public.prestasi(tahun DESC);
CREATE INDEX IF NOT EXISTS idx_prestasi_tingkat  ON public.prestasi(tingkat);
CREATE INDEX IF NOT EXISTS idx_prestasi_kategori ON public.prestasi(kategori);

-- 4. Tabel grup_penampilan
CREATE TABLE IF NOT EXISTS public.grup_penampilan (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_grup         VARCHAR(255) NOT NULL,
  jenis_penampilan  VARCHAR(255) NOT NULL,
  urutan_tampil     SMALLINT NOT NULL CHECK (urutan_tampil > 0),
  waktu_tampil      TIME,
  status            VARCHAR(20) NOT NULL DEFAULT 'menunggu'
                      CHECK (status IN ('menunggu','sedang_tampil','selesai')),
  tahun_acara       SMALLINT NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_grup_status ON public.grup_penampilan(status);
CREATE INDEX IF NOT EXISTS idx_grup_tahun  ON public.grup_penampilan(tahun_acara);

-- 5. Tabel anggota_grup
CREATE TABLE IF NOT EXISTS public.anggota_grup (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama        VARCHAR(255) NOT NULL,
  grup_id     UUID NOT NULL REFERENCES public.grup_penampilan(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_anggota_grup ON public.anggota_grup(grup_id);

-- 6. Tabel arsip_surat
CREATE TABLE IF NOT EXISTS public.arsip_surat (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul           VARCHAR(500) NOT NULL,
  kategori_surat  VARCHAR(100) NOT NULL
                    CHECK (kategori_surat IN ('undangan','sk_panitia','proposal','laporan','pengumuman','lainnya')),
  tahun           SMALLINT NOT NULL,
  file_url        TEXT NOT NULL,
  deskripsi       TEXT,
  uploaded_by     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_arsip_kategori ON public.arsip_surat(kategori_surat);
CREATE INDEX IF NOT EXISTS idx_arsip_tahun    ON public.arsip_surat(tahun DESC);

-- 7. Tabel umkm
CREATE TABLE IF NOT EXISTS public.umkm (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_usaha    VARCHAR(255) NOT NULL,
  jenis_usaha   VARCHAR(255) NOT NULL,
  nama_pemilik  VARCHAR(255) NOT NULL,
  kontak        VARCHAR(100),
  alamat        TEXT,
  foto_url      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Tabel kontak_penting
CREATE TABLE IF NOT EXISTS public.kontak_penting (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_layanan    VARCHAR(255) NOT NULL,
  nomor_kontak    VARCHAR(100) NOT NULL,
  keterangan      TEXT,
  urutan          SMALLINT DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Tabel statistik_kampung
CREATE TABLE IF NOT EXISTS public.statistik_kampung (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label       VARCHAR(255) NOT NULL UNIQUE,
  nilai       INTEGER NOT NULL DEFAULT 0,
  satuan      VARCHAR(50),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Tabel galeri
CREATE TABLE IF NOT EXISTS public.galeri (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul               VARCHAR(255) NOT NULL,
  foto_url            TEXT NOT NULL,
  kategori_kegiatan   VARCHAR(100),
  tahun               SMALLINT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galeri_kategori ON public.galeri(kategori_kegiatan);
CREATE INDEX IF NOT EXISTS idx_galeri_tahun    ON public.galeri(tahun DESC);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Statistik kampung (nilai awal)
INSERT INTO public.statistik_kampung (label, nilai, satuan) VALUES
  ('Jumlah KK',      150, 'KK'),
  ('Jumlah RT',        5, 'RT'),
  ('Total Prestasi',  20, 'penghargaan'),
  ('UMKM Aktif',      15, 'usaha')
ON CONFLICT (label) DO NOTHING;

-- Kontak penting
INSERT INTO public.kontak_penting (nama_layanan, nomor_kontak, keterangan, urutan) VALUES
  ('Bidan Desa',       '0812-xxxx-0001', 'Pelayanan kesehatan ibu dan anak', 1),
  ('Ketua RT 01',      '0812-xxxx-0002', 'Wilayah RT 01',                   2),
  ('Ketua RT 02',      '0812-xxxx-0003', 'Wilayah RT 02',                   3),
  ('Damkar Terdekat',  '113',            'Pemadam kebakaran darurat',        4),
  ('Puskesmas',        '0812-xxxx-0004', 'Pelayanan kesehatan umum',         5)
ON CONFLICT DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Aktifkan RLS — akses data via backend service_role key
-- sehingga backend bisa akses penuh, frontend tidak langsung

ALTER TABLE public.users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.berita            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prestasi          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grup_penampilan   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anggota_grup      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arsip_surat       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.umkm              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kontak_penting    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistik_kampung ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeri            ENABLE ROW LEVEL SECURITY;

-- Policy: service_role (backend) bisa akses semua
-- Catatan: service_role key secara default bypass RLS,
-- jadi tidak perlu policy tambahan untuk backend.
-- Frontend TIDAK mengakses Supabase secara langsung.
