# Sitemap & Struktur Rute
# Website Kampung Cidamar

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  

---

## Diagram Sitemap

```
Website Kampung Cidamar
│
├── /                              → Landing Page (SSG)
│   ├── #hero
│   ├── #statistik
│   ├── #sekilas-kampung
│   ├── #prestasi
│   ├── #berita
│   ├── #umkm
│   ├── #agustusan
│   ├── #galeri
│   └── #kontak
│
├── /berita                        → List Berita (ISR / SSR)
│   └── /berita/[slug]             → Detail Berita (ISR)
│
├── /prestasi                      → List Prestasi (ISR)
│   └── /prestasi/[slug]           → Detail Prestasi (ISR)
│
├── /agustusan                     → Jadwal Penampilan Lomba (SSR)
│   └── /agustusan/arsip-surat     → Arsip Surat-menyurat (ISR)
│
├── /umkm                          → Direktori UMKM & Kontak Penting (ISR)
│
├── /galeri                        → Galeri Foto Kegiatan (ISR)
│
├── /kontak                        → Halaman Kontak & Lokasi (SSG)
│
└── /admin                         → Area Admin (CSR / Server Component)
    ├── /admin/login               → Login Admin
    └── /admin/dashboard           → Dashboard Admin
        ├── /admin/dashboard/berita
        ├── /admin/dashboard/prestasi
        ├── /admin/dashboard/agustusan
        ├── /admin/dashboard/arsip-surat
        ├── /admin/dashboard/umkm
        └── /admin/dashboard/galeri
```

---

## Tabel Rute Detail

| Rute | Halaman | Rendering | Akses | Deskripsi |
|---|---|---|---|---|
| `/` | Landing Page | SSG | Publik | Halaman utama dengan semua section |
| `/berita` | List Berita | ISR (60 detik) | Publik | List semua berita, filter kategori, search |
| `/berita/[slug]` | Detail Berita | ISR (300 detik) | Publik | Konten lengkap satu artikel berita |
| `/prestasi` | List Prestasi | ISR (3600 detik) | Publik | Grid/timeline prestasi, filter, search |
| `/prestasi/[slug]` | Detail Prestasi | ISR (3600 detik) | Publik | Detail satu prestasi |
| `/agustusan` | Jadwal Penampilan | SSR | Publik | Jadwal + status real-time penampilan |
| `/agustusan/arsip-surat` | Arsip Surat | ISR (600 detik) | Publik | List surat, download template |
| `/umkm` | Direktori UMKM | ISR (3600 detik) | Publik | Grid UMKM + kontak penting |
| `/galeri` | Galeri Foto | ISR (600 detik) | Publik | Grid foto kegiatan kampung |
| `/kontak` | Kontak & Lokasi | SSG | Publik | Form kontak + embed peta |
| `/admin/login` | Login Admin | CSR | Tamu (belum login) | Form autentikasi admin |
| `/admin/dashboard` | Dashboard Admin | CSR | Admin/Superadmin | Ringkasan statistik & navigasi |
| `/admin/dashboard/berita` | CRUD Berita | CSR | Admin/Superadmin | Kelola artikel berita |
| `/admin/dashboard/prestasi` | CRUD Prestasi | CSR | Admin/Superadmin | Kelola data prestasi |
| `/admin/dashboard/agustusan` | CRUD Jadwal | CSR | Admin/Superadmin | Kelola grup & jadwal penampilan |
| `/admin/dashboard/arsip-surat` | CRUD Arsip Surat | CSR | Admin/Superadmin | Upload & kelola arsip surat |
| `/admin/dashboard/umkm` | CRUD UMKM | CSR | Admin/Superadmin | Kelola data UMKM & kontak |
| `/admin/dashboard/galeri` | CRUD Galeri | CSR | Superadmin | Upload & kelola foto galeri |

---

## REST API Endpoints (Backend)

### Publik (tanpa auth)

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/berita` | List berita (query: page, limit, kategori, q) |
| GET | `/api/berita/:slug` | Detail berita berdasarkan slug |
| GET | `/api/prestasi` | List prestasi (query: page, limit, kategori, tingkat, q) |
| GET | `/api/prestasi/:slug` | Detail prestasi |
| GET | `/api/agustusan/grup` | List grup penampilan + status |
| GET | `/api/agustusan/grup/:id` | Detail grup + anggota |
| GET | `/api/agustusan/arsip-surat` | List arsip surat (query: kategori, tahun, q) |
| GET | `/api/umkm` | List UMKM (query: jenis, q) |
| GET | `/api/kontak-penting` | List kontak penting |
| GET | `/api/galeri` | List foto galeri (query: kategori, tahun) |
| GET | `/api/statistik` | Data statistik kampung |

### Admin (dengan auth JWT)

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/login` | Login admin, kembalikan JWT |
| POST | `/api/auth/logout` | Logout (invalidate token) |
| GET | `/api/auth/me` | Profil user yang sedang login |
| POST | `/api/admin/berita` | Buat berita baru |
| PUT | `/api/admin/berita/:id` | Update berita |
| DELETE | `/api/admin/berita/:id` | Hapus berita |
| POST | `/api/admin/prestasi` | Buat prestasi baru |
| PUT | `/api/admin/prestasi/:id` | Update prestasi |
| DELETE | `/api/admin/prestasi/:id` | Hapus prestasi |
| POST | `/api/admin/agustusan/grup` | Buat grup penampilan |
| PUT | `/api/admin/agustusan/grup/:id` | Update grup (termasuk ubah status) |
| DELETE | `/api/admin/agustusan/grup/:id` | Hapus grup |
| POST | `/api/admin/agustusan/grup/:id/anggota` | Tambah anggota ke grup |
| DELETE | `/api/admin/agustusan/anggota/:id` | Hapus anggota |
| POST | `/api/admin/arsip-surat` | Upload arsip surat |
| DELETE | `/api/admin/arsip-surat/:id` | Hapus arsip surat |
| POST | `/api/admin/umkm` | Tambah UMKM |
| PUT | `/api/admin/umkm/:id` | Update UMKM |
| DELETE | `/api/admin/umkm/:id` | Hapus UMKM |
| POST | `/api/admin/galeri` | Upload foto galeri |
| DELETE | `/api/admin/galeri/:id` | Hapus foto galeri |
| PUT | `/api/admin/statistik` | Update statistik kampung |

---

## Catatan Rendering Strategy

- **SSG** (Static Site Generation): Halaman yang sangat jarang berubah, di-generate saat build time
- **ISR** (Incremental Static Regeneration): Halaman yang update berkala, di-revalidate secara otomatis sesuai interval
- **SSR** (Server-Side Rendering): Halaman yang butuh data paling fresh (jadwal penampilan Agustusan)
- **CSR** (Client-Side Rendering): Area admin — tidak perlu SEO, butuh interaktivitas tinggi

---

*Dokumen ini menjadi acuan struktur navigasi dan API untuk tim frontend dan backend.*
