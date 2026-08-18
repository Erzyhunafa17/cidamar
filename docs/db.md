# Database Schema & ERD
# Website Kampung Cidamar (Supabase / PostgreSQL)

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  
**Database**: Supabase (PostgreSQL)

---

## ERD (Entity Relationship Diagram)

```
┌──────────────────┐        ┌──────────────────────┐
│     users        │        │       berita          │
├──────────────────┤        ├──────────────────────┤
│ id (UUID) PK     │◄───────│ penulis_id (UUID) FK  │
│ nama             │        │ id (UUID) PK           │
│ email            │        │ judul                  │
│ role             │        │ slug                   │
│ created_at       │        │ isi                    │
└──────────────────┘        │ thumbnail_url          │
         │                  │ kategori               │
         │                  │ tanggal_terbit         │
         │                  │ created_at             │
         │                  │ updated_at             │
         │                  └──────────────────────┘
         │
         │                  ┌──────────────────────┐
         └──────────────────│     arsip_surat       │
                            ├──────────────────────┤
                            │ id (UUID) PK           │
                            │ judul                  │
                            │ kategori_surat         │
                            │ tahun                  │
                            │ file_url               │
                            │ deskripsi              │
                            │ uploaded_by (UUID) FK  │
                            │ created_at             │
                            └──────────────────────┘

┌──────────────────────┐     ┌────────────────────┐
│   grup_penampilan    │     │   anggota_grup     │
├──────────────────────┤     ├────────────────────┤
│ id (UUID) PK          │◄────│ grup_id (UUID) FK  │
│ nama_grup             │     │ id (UUID) PK        │
│ jenis_penampilan      │     │ nama               │
│ urutan_tampil         │     │ created_at         │
│ waktu_tampil          │     └────────────────────┘
│ status                │
│ tahun_acara           │
│ created_at            │
└──────────────────────┘

┌──────────────────┐     ┌─────────────────────┐
│    prestasi      │     │       umkm           │
├──────────────────┤     ├─────────────────────┤
│ id (UUID) PK     │     │ id (UUID) PK         │
│ nama_prestasi    │     │ nama_usaha           │
│ slug             │     │ jenis_usaha          │
│ tahun            │     │ nama_pemilik         │
│ tingkat          │     │ kontak               │
│ kategori         │     │ alamat               │
│ deskripsi        │     │ foto_url             │
│ foto_url         │     │ created_at           │
│ created_at       │     └─────────────────────┘
└──────────────────┘

┌─────────────────────────┐     ┌──────────────────────┐
│   kontak_penting        │     │   statistik_kampung  │
├─────────────────────────┤     ├──────────────────────┤
│ id (UUID) PK             │     │ id (UUID) PK          │
│ nama_layanan             │     │ label                 │
│ nomor_kontak             │     │ nilai                 │
│ keterangan               │     │ updated_at            │
│ created_at               │     └──────────────────────┘
└─────────────────────────┘

┌──────────────────┐
│     galeri       │
├──────────────────┤
│ id (UUID) PK     │
│ judul            │
│ foto_url         │
│ kategori_kegiatan│
│ tahun            │
│ created_at       │
└──────────────────┘
```

---

## Skema Tabel Lengkap

### 1. `users`

```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'admin'
                  CHECK (role IN ('admin', 'superadmin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

> **Catatan**: Autentikasi dikelola oleh Supabase Auth. Tabel `users` ini adalah extension dari `auth.users` Supabase untuk menyimpan data profil tambahan. UUID `id` harus sama dengan `auth.users.id`.

---

### 2. `berita`

```sql
CREATE TABLE berita (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul           VARCHAR(500) NOT NULL,
  slug            VARCHAR(600) UNIQUE NOT NULL,
  isi             TEXT NOT NULL,
  thumbnail_url   TEXT,
  kategori        VARCHAR(100) NOT NULL DEFAULT 'umum'
                    CHECK (kategori IN ('umum', 'kegiatan', 'pengumuman', 'kesehatan', 'pendidikan', 'lingkungan', 'lainnya')),
  tanggal_terbit  DATE NOT NULL DEFAULT CURRENT_DATE,
  penulis_id      UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index untuk performa query
CREATE INDEX idx_berita_slug ON berita(slug);
CREATE INDEX idx_berita_kategori ON berita(kategori);
CREATE INDEX idx_berita_tanggal ON berita(tanggal_terbit DESC);
CREATE INDEX idx_berita_penulis ON berita(penulis_id);
```

**Relasi**: `berita.penulis_id` → `users.id` (Many-to-One)

---

### 3. `prestasi`

```sql
CREATE TABLE prestasi (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_prestasi   VARCHAR(500) NOT NULL,
  slug            VARCHAR(600) UNIQUE NOT NULL,
  tahun           SMALLINT NOT NULL CHECK (tahun BETWEEN 1945 AND 2100),
  tingkat         VARCHAR(30) NOT NULL
                    CHECK (tingkat IN ('rt_rw', 'kecamatan', 'kabupaten', 'provinsi', 'nasional')),
  kategori        VARCHAR(50) NOT NULL
                    CHECK (kategori IN ('olahraga', 'seni_budaya', 'lingkungan', 'pendidikan', 'lainnya')),
  deskripsi       TEXT,
  foto_url        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_prestasi_tahun ON prestasi(tahun DESC);
CREATE INDEX idx_prestasi_tingkat ON prestasi(tingkat);
CREATE INDEX idx_prestasi_kategori ON prestasi(kategori);
```

---

### 4. `grup_penampilan`

```sql
CREATE TABLE grup_penampilan (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_grup         VARCHAR(255) NOT NULL,
  jenis_penampilan  VARCHAR(255) NOT NULL,  -- Contoh: 'lomba menyanyi', 'lomba tari', 'panjat pinang'
  urutan_tampil     SMALLINT NOT NULL CHECK (urutan_tampil > 0),
  waktu_tampil      TIME,                   -- Jam tampil yang dijadwalkan
  status            VARCHAR(20) NOT NULL DEFAULT 'menunggu'
                      CHECK (status IN ('menunggu', 'sedang_tampil', 'selesai')),
  tahun_acara       SMALLINT NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  UNIQUE(urutan_tampil, tahun_acara, jenis_penampilan)
);

-- Index
CREATE INDEX idx_grup_status ON grup_penampilan(status);
CREATE INDEX idx_grup_tahun ON grup_penampilan(tahun_acara);
CREATE INDEX idx_grup_urutan ON grup_penampilan(urutan_tampil);
```

---

### 5. `anggota_grup`

```sql
CREATE TABLE anggota_grup (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama        VARCHAR(255) NOT NULL,
  grup_id     UUID NOT NULL REFERENCES grup_penampilan(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_anggota_grup_id ON anggota_grup(grup_id);
```

**Relasi**: `anggota_grup.grup_id` → `grup_penampilan.id` (Many-to-One / One-to-Many dari sisi grup)

> Satu `grup_penampilan` memiliki banyak `anggota_grup` — relasi **one-to-many**.

---

### 6. `arsip_surat`

```sql
CREATE TABLE arsip_surat (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul           VARCHAR(500) NOT NULL,
  kategori_surat  VARCHAR(100) NOT NULL
                    CHECK (kategori_surat IN ('undangan', 'sk_panitia', 'proposal', 'laporan', 'pengumuman', 'lainnya')),
  tahun           SMALLINT NOT NULL,
  file_url        TEXT NOT NULL,            -- URL file di Supabase Storage
  deskripsi       TEXT,
  uploaded_by     UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_arsip_kategori ON arsip_surat(kategori_surat);
CREATE INDEX idx_arsip_tahun ON arsip_surat(tahun DESC);
CREATE INDEX idx_arsip_uploader ON arsip_surat(uploaded_by);
```

**Relasi**: `arsip_surat.uploaded_by` → `users.id` (Many-to-One)

---

### 7. `umkm`

```sql
CREATE TABLE umkm (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_usaha    VARCHAR(255) NOT NULL,
  jenis_usaha   VARCHAR(255) NOT NULL,     -- Kuliner, kerajinan, jasa, perdagangan, dll
  nama_pemilik  VARCHAR(255) NOT NULL,
  kontak        VARCHAR(100),              -- Nomor HP/WA
  alamat        TEXT,
  foto_url      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_umkm_jenis ON umkm(jenis_usaha);
```

---

### 8. `kontak_penting`

```sql
CREATE TABLE kontak_penting (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_layanan    VARCHAR(255) NOT NULL,   -- 'Bidan Desa', 'Ketua RT 01', 'Damkar', dst
  nomor_kontak    VARCHAR(100) NOT NULL,
  keterangan      TEXT,
  urutan          SMALLINT DEFAULT 0,      -- Untuk mengatur urutan tampil
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

### 9. `statistik_kampung`

```sql
CREATE TABLE statistik_kampung (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label       VARCHAR(255) NOT NULL UNIQUE, -- 'Jumlah KK', 'Jumlah RT', 'Total Prestasi', 'UMKM Aktif'
  nilai       INTEGER NOT NULL DEFAULT 0,
  satuan      VARCHAR(50),                  -- 'KK', 'RT', 'penghargaan', 'usaha'
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Data awal (seed)
INSERT INTO statistik_kampung (label, nilai, satuan) VALUES
  ('Jumlah KK',       150, 'KK'),
  ('Jumlah RT',         5, 'RT'),
  ('Total Prestasi',   20, 'penghargaan'),
  ('UMKM Aktif',       15, 'usaha');
```

---

### 10. `galeri`

```sql
CREATE TABLE galeri (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul               VARCHAR(255) NOT NULL,
  foto_url            TEXT NOT NULL,
  kategori_kegiatan   VARCHAR(100),    -- '17 Agustusan', 'Kerja Bakti', 'Posyandu', dst
  tahun               SMALLINT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX idx_galeri_kategori ON galeri(kategori_kegiatan);
CREATE INDEX idx_galeri_tahun ON galeri(tahun DESC);
```

---

## Ringkasan Relasi Antar Tabel

| Tabel Anak | Foreign Key | Tabel Induk | Tipe Relasi | On Delete |
|---|---|---|---|---|
| `berita` | `penulis_id` | `users` | Many-to-One | SET NULL |
| `arsip_surat` | `uploaded_by` | `users` | Many-to-One | SET NULL |
| `anggota_grup` | `grup_id` | `grup_penampilan` | Many-to-One (One-to-Many dari induk) | CASCADE |

---

## Row Level Security (RLS) — Supabase

```sql
-- Aktifkan RLS pada semua tabel
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE berita ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE grup_penampilan ENABLE ROW LEVEL SECURITY;
ALTER TABLE anggota_grup ENABLE ROW LEVEL SECURITY;
ALTER TABLE arsip_surat ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE kontak_penting ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistik_kampung ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeri ENABLE ROW LEVEL SECURITY;

-- Kebijakan: semua orang bisa SELECT data publik
-- Hanya service_role (backend) yang bisa INSERT/UPDATE/DELETE
-- Frontend tidak punya akses langsung ke Supabase (akses via backend API)
```

> **Catatan Keamanan**: Karena frontend tidak mengakses Supabase secara langsung, backend menggunakan `SUPABASE_SERVICE_ROLE_KEY` yang disimpan aman di environment variable server. Frontend hanya berkomunikasi dengan REST API backend.

---

## Supabase Storage Buckets

| Bucket | Akses | Konten |
|---|---|---|
| `berita-thumbnails` | Publik | Thumbnail artikel berita (WebP) |
| `prestasi-foto` | Publik | Foto piagam/trofi prestasi (WebP) |
| `galeri` | Publik | Foto kegiatan kampung (WebP) |
| `umkm-foto` | Publik | Foto profil usaha UMKM (WebP) |
| `arsip-surat` | Publik (read) | File surat PDF/DOCX |

---

*Dokumen ini menjadi acuan schema database yang tidak boleh diubah sepihak tanpa diskusi tim.*
