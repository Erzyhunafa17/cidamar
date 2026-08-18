# Roadmap Pengembangan
# Website Kampung Cidamar

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  

---

## Ringkasan Fase

| Fase | Nama | Estimasi Durasi | Status |
|---|---|---|---|
| Fase 1 | Setup & Fondasi | 3–5 hari | Menunggu persetujuan |
| Fase 2 | Modul Berita | 3–5 hari | Belum dimulai |
| Fase 3 | Modul Prestasi | 2–4 hari | Belum dimulai |
| Fase 4 | Modul Agustusan — Jadwal | 3–5 hari | Belum dimulai |
| Fase 5 | Modul Arsip Surat & Auth Admin | 3–5 hari | Belum dimulai |
| Fase 6 | Direktori UMKM, Kontak & Galeri | 2–3 hari | Belum dimulai |
| Fase 7 | Optimasi, Testing & Deploy | 3–5 hari | Belum dimulai |

---

## Fase 1 — Setup Monorepo & Fondasi

> **Target**: Monorepo berjalan, design system terpasang, landing page statis bisa diakses di browser

### Frontend

- [ ] Inisialisasi project Next.js 14+ App Router dengan TypeScript (`/frontend`)
- [ ] Install dan konfigurasi Tailwind CSS v3 dengan custom color, font (Plus Jakarta Sans + Inter), dan spacing sesuai `design-system.md`
- [ ] Setup folder structure sesuai `folder-structure.md`
- [ ] Buat file `types/` dasar (Berita, Prestasi, User, ApiResponse)
- [ ] Buat komponen UI atomik: `Button`, `Badge`, `Card`, `SearchBar`, `Skeleton`, `Spinner`
- [ ] Buat komponen `Navbar` (desktop + hamburger mobile)
- [ ] Buat komponen `Footer`
- [ ] Buat root `layout.tsx` dengan Navbar + Footer + font loading
- [ ] Buat landing page (`/app/page.tsx`) statis dengan semua section:
  - `HeroSection` (gambar placeholder, tagline, CTA)
  - `StatistikSection` (data hardcoded sementara)
  - `SekilasSection` (teks profil kampung hardcoded)
  - `PrestasiSection` (3 kartu dummy)
  - `BeritaSection` (3 kartu dummy)
  - `UmkmSection` (grid kartu dummy)
  - `AgustusanSection` (teaser/countdown)
  - `GaleriSection` (grid foto placeholder)
  - `KontakSection` (form + embed maps placeholder)
- [ ] Konfigurasi `next.config.ts` untuk image domain

### Backend

- [ ] Inisialisasi project Node.js + Express + TypeScript (`/backend`)
- [ ] Setup folder structure: `routes/`, `controllers/`, `services/`, `middlewares/`, `config/`, `types/`
- [ ] Install dependencies: `express`, `@supabase/supabase-js`, `typescript`, `ts-node`, `nodemon`, `cors`, `dotenv`, `zod`, `express-rate-limit`
- [ ] Konfigurasi koneksi Supabase di `config/supabase.ts` menggunakan `SERVICE_ROLE_KEY`
- [ ] Buat `config/env.ts` untuk validasi environment variables
- [ ] Setup Express app di `src/index.ts` (middleware cors, json, rate limiter)
- [ ] Buat error handler global (`middlewares/errorHandler.ts`)
- [ ] Buat endpoint health check: `GET /api/health` → `{ status: 'ok' }`
- [ ] Buat endpoint `GET /api/statistik` → kembalikan data statistik kampung

### Database

- [ ] Buat project Supabase baru
- [ ] Jalankan semua SQL dari `db.md` di Supabase SQL Editor
- [ ] Seed data: `statistik_kampung` (nilai awal)
- [ ] Buat semua storage bucket sesuai `db.md`
- [ ] Set bucket policy (publik read untuk thumbnail, foto)

### Infrastruktur

- [ ] Setup `.gitignore` (node_modules, .env, .next)
- [ ] Setup `README.md` root dengan cara menjalankan dev server
- [ ] Pastikan frontend (`localhost:3000`) dan backend (`localhost:4000`) bisa jalan bersamaan

**Deliverable Fase 1**: Landing page statis terbuka di browser dengan semua section tampil, backend health check responsif, koneksi ke Supabase terkonfirmasi.

---

## Fase 2 — Modul Berita

> **Target**: Admin bisa buat/edit/hapus berita, publik bisa lihat list & detail berita yang diambil dari backend API

### Backend

- [ ] Buat schema validasi berita (`validators/berita.validator.ts`) dengan Zod
- [ ] Buat `berita.service.ts`: `getAll()`, `getBySlug()`, `create()`, `update()`, `delete()`
- [ ] Buat `berita.controller.ts`
- [ ] Definisi routes publik di `berita.routes.ts`:
  - `GET /api/berita` (query params: page, limit, kategori, q)
  - `GET /api/berita/:slug`
- [ ] Definisi routes admin (protected):
  - `POST /api/admin/berita`
  - `PUT /api/admin/berita/:id`
  - `DELETE /api/admin/berita/:id`
- [ ] Setup auth middleware dasar (`authGuard.ts`) — verifikasi JWT dari Supabase
- [ ] Handle upload thumbnail ke Supabase Storage

### Frontend — Publik

- [ ] Buat `lib/api/berita.ts` dengan fungsi `fetchBeritaList()`, `fetchBeritaBySlug()`
- [ ] Buat halaman `/berita` (ISR 60s): list berita dengan search dan filter kategori
- [ ] Buat komponen `BeritaCard`, `BeritaList`
- [ ] Buat halaman `/berita/[slug]` (ISR 300s): detail artikel dengan konten lengkap
- [ ] Implementasi `next/image` dengan format WebP untuk thumbnail
- [ ] Tambah SEO metadata dinamis per artikel (`generateMetadata`)
- [ ] Integrasikan `BeritaSection` di landing page dengan data real dari backend (ISR)

### Frontend — Admin

- [ ] Buat halaman `/admin/dashboard/berita`: tabel list berita dengan tombol edit/hapus
- [ ] Buat halaman `/admin/dashboard/berita/buat`: form buat berita (judul, isi, kategori, thumbnail upload, tanggal)
- [ ] Buat halaman `/admin/dashboard/berita/[id]`: form edit berita
- [ ] Implementasi konfirmasi hapus (modal)

**Deliverable Fase 2**: Berita dapat dikelola admin dan tampil di halaman publik dengan data real.

---

## Fase 3 — Modul Prestasi

> **Target**: Tampilan timeline/grid prestasi publik terhubung ke backend, admin bisa CRUD prestasi

### Backend

- [ ] Buat `prestasi.service.ts`, `prestasi.controller.ts`, `prestasi.routes.ts`
- [ ] Endpoints: `GET /api/prestasi` (filter: tahun, tingkat, kategori, q), `GET /api/prestasi/:slug`
- [ ] Admin endpoints: `POST`, `PUT`, `DELETE /api/admin/prestasi/:id`
- [ ] Handle upload foto prestasi ke Supabase Storage

### Frontend — Publik

- [ ] Buat halaman `/prestasi` (ISR 3600s): tampilan **Timeline** (default) dan **Grid** dengan tombol toggle
- [ ] Implementasi `TimelineComponent` dan `PrestasiGrid`
- [ ] Buat `BadgeTingkat` sesuai design system (emas/perak/perunggu)
- [ ] Filter interaktif: dropdown tingkat + kategori
- [ ] Search prestasi
- [ ] Halaman `/prestasi/[slug]`: detail prestasi
- [ ] Integrasikan `PrestasiSection` di landing page dengan data real

### Frontend — Admin

- [ ] Halaman CRUD prestasi di `/admin/dashboard/prestasi`
- [ ] Form dengan field: nama prestasi, tahun, tingkat, kategori, deskripsi, foto

**Deliverable Fase 3**: Tampilan prestasi dengan timeline interaktif terhubung ke database.

---

## Fase 4 — Modul Agustusan (Jadwal Penampilan)

> **Target**: Panitia dapat input grup penampilan, publik dapat memantau status real-time "Sedang Tampil"

### Backend

- [ ] Buat `agustusan.service.ts`, `agustusan.controller.ts`, `agustusan.routes.ts`
- [ ] Endpoints publik:
  - `GET /api/agustusan/grup` (filter: tahun, jenis)
  - `GET /api/agustusan/grup/:id` (detail + anggota)
- [ ] Admin endpoints:
  - `POST /api/admin/agustusan/grup`
  - `PUT /api/admin/agustusan/grup/:id` (termasuk update status)
  - `DELETE /api/admin/agustusan/grup/:id`
  - `POST /api/admin/agustusan/grup/:id/anggota`
  - `DELETE /api/admin/agustusan/anggota/:id`

### Frontend — Publik

- [ ] Buat halaman `/agustusan` (SSR): tabel jadwal penampilan dengan kolom nama, jenis, anggota, waktu, status
- [ ] Komponen `SedangTampilBanner`: banner merah mencolok di atas halaman saat ada yang sedang tampil
- [ ] Komponen `StatusBadge`: menunggu/sedang tampil/selesai dengan animasi pulse
- [ ] Polling otomatis setiap 30 detik (`useAgustusan` hook) untuk refresh status
- [ ] Integrasikan teaser `AgustusanSection` di landing page

### Frontend — Admin

- [ ] Halaman `/admin/dashboard/agustusan`: tabel + form tambah grup
- [ ] Tombol cepat ubah status: "Mulai Tampil" → `sedang_tampil`, "Selesai" → `selesai`
- [ ] Form tambah/hapus anggota grup

**Deliverable Fase 4**: Sistem jadwal penampilan real-time yang bisa dipantau warga saat hari-H.

---

## Fase 5 — Modul Arsip Surat & Auth Admin Lengkap

> **Target**: Sistem autentikasi admin penuh + arsip surat dapat diakses dan dikelola

### Backend — Auth

- [ ] `auth.service.ts`: `login()` via Supabase Auth, kembalikan JWT
- [ ] `authGuard.ts`: middleware verifikasi token Supabase JWT untuk semua `/admin/*`
- [ ] `roleGuard.ts`: middleware cek role superadmin untuk aksi sensitif
- [ ] `GET /api/auth/me`: kembalikan profil user yang login

### Backend — Arsip Surat

- [ ] `arsip-surat.service.ts`, `controller`, `routes`
- [ ] Upload file (PDF/DOCX) ke Supabase Storage bucket `arsip-surat`
- [ ] Endpoints: `GET /api/agustusan/arsip-surat` (filter: kategori, tahun, q)
- [ ] Admin endpoints: `POST /api/admin/arsip-surat`, `DELETE /api/admin/arsip-surat/:id`

### Frontend — Auth

- [ ] Halaman `/admin/login`: form email + password
- [ ] `useAuth` hook: login, logout, getMe, session management
- [ ] `lib/api/auth.ts`: fungsi login/logout
- [ ] Middleware proteksi halaman admin: redirect ke `/admin/login` jika belum login
- [ ] Simpan JWT di `httpOnly cookie` atau localStorage (pilih cookie untuk keamanan lebih baik)
- [ ] `AdminSidebar` dengan menu navigasi dan tombol logout
- [ ] `AdminHeader` dengan info user yang sedang login

### Frontend — Arsip Surat Publik

- [ ] Halaman `/agustusan/arsip-surat` (ISR 600s): list arsip dengan filter kategori & tahun + search
- [ ] Komponen `ArsipSuratList`: kartu surat dengan ikon file type, tombol download
- [ ] Download file langsung dari Supabase Storage URL

### Frontend — Admin Arsip Surat

- [ ] Halaman `/admin/dashboard/arsip-surat`: tabel + form upload
- [ ] Komponen `FileUpload` dengan drag & drop

**Deliverable Fase 5**: Sistem login admin berfungsi penuh, arsip surat dapat diupload dan diunduh.

---

## Fase 6 — Direktori UMKM, Kontak Penting & Galeri

> **Target**: Direktori UMKM, kontak penting, dan galeri foto aktif terhubung ke backend

### Backend

- [ ] `umkm.service.ts`, `controller`, `routes` — CRUD UMKM
- [ ] `kontak-penting.service.ts`, `controller`, `routes`
- [ ] `galeri.service.ts`, `controller`, `routes` — upload foto ke bucket `galeri`

### Frontend — Publik

- [ ] Halaman `/umkm` (ISR 3600s): grid kartu UMKM + daftar kontak penting
- [ ] Halaman `/galeri` (ISR 600s): grid foto, lightbox, filter kategori & tahun
- [ ] Halaman `/kontak` (SSG): form kontak (modal kirim) + embed Google Maps + info kontak

### Frontend — Admin

- [ ] CRUD UMKM di `/admin/dashboard/umkm`
- [ ] Upload foto galeri di `/admin/dashboard/galeri`
- [ ] Kelola kontak penting (via halaman UMKM atau dashboard sendiri)

**Deliverable Fase 6**: Semua halaman publik aktif dan berfungsi, direktori UMKM dan galeri foto lengkap.

---

## Fase 7 — Optimasi, Testing & Deployment

> **Target**: Website siap produksi, performa optimal, deployed di Vercel + Railway

### Optimasi Performa

- [ ] Audit semua gambar: pastikan format WebP, `next/image` dengan `sizes`, `priority` untuk above-the-fold
- [ ] Cek Lighthouse score: target Performance ≥ 85, SEO ≥ 90, Accessibility ≥ 90
- [ ] Tambah `loading="lazy"` pada semua gambar non-kritis
- [ ] Optimasi bundle: analisis bundle size dengan `@next/bundle-analyzer`
- [ ] Pastikan ISR revalidation interval sesuai kebutuhan tiap halaman

### SEO & Metadata

- [ ] Tambah metadata lengkap di semua halaman (`title`, `description`, `og:*`, `twitter:*`)
- [ ] Buat `sitemap.xml` otomatis (Next.js `app/sitemap.ts`)
- [ ] Buat `robots.txt`
- [ ] Tambah JSON-LD structured data untuk artikel berita (NewsArticle schema)

### Testing Responsivitas

- [ ] Test di mobile (360px, 390px), tablet (768px), desktop (1280px, 1440px)
- [ ] Test navigasi keyboard
- [ ] Test dengan simulasi koneksi lambat (3G throttle di Chrome DevTools)
- [ ] Test form accessibility (label, error message, focus)

### Deployment

- [ ] **Backend**: Deploy ke Railway (atau Render)
  - Setup environment variables di Railway dashboard
  - Pastikan `CORS` hanya allow domain Vercel
  - Setup health check endpoint
- [ ] **Frontend**: Deploy ke Vercel
  - Set `NEXT_PUBLIC_API_URL` ke URL Railway/Render
  - Konfigurasi custom domain (`kampungcidamar.id` atau subdomain)
  - Enable Vercel Analytics (opsional, gratis tier)
- [ ] Test end-to-end di environment production
- [ ] Cek semua API call menggunakan HTTPS
- [ ] Validasi form di production

**Deliverable Fase 7**: Website live di domain production, Lighthouse score tercapai, semua fitur MVP berfungsi.

---

## Aturan Transisi Fase

1. Setiap fase **harus mendapat persetujuan** sebelum lanjut ke fase berikutnya
2. Jika ditemukan bug kritis di fase sebelumnya, **perbaiki terlebih dahulu** sebelum lanjut
3. Perubahan pada `db.md` atau `design-system.md` **harus didiskusikan** dan dokumen diperbarui sebelum implementasi
4. Setiap akhir fase, lakukan **review singkat** dengan menunjukkan halaman/fitur yang selesai

---

*Roadmap ini bersifat iteratif dan dapat disesuaikan berdasarkan feedback dan kebutuhan yang berkembang.*
