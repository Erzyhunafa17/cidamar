# Website Kampung Cidamar

Website resmi untuk Kampung Cidamar yang menyajikan informasi, berita, jadwal kegiatan, dan prestasi warga. Dibuat dengan arsitektur monorepo terpisah untuk frontend dan backend.

## Teknologi

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS v4
- **Backend**: Node.js, Express, TypeScript, Zod
- **Database**: Supabase (PostgreSQL)

## Struktur Folder

- `/frontend` - Aplikasi Next.js untuk user interface (publik & admin)
- `/backend` - REST API Node.js untuk business logic
- `/docs` - Dokumen spesifikasi dan desain (PRD, Sitemap, DB Schema, dsb)

## Persiapan Environment

1. Buat project baru di [Supabase](https://supabase.com/)
2. Jalankan skrip SQL yang ada di `docs/schema.sql` pada menu **SQL Editor** Supabase
3. Pastikan Storage Buckets berikut dibuat dan diatur ke *Public*:
   - `berita`
   - `prestasi`
   - `arsip-surat`
   - `galeri`

4. Copy konfigurasi environment backend:
   ```bash
   cd backend
   cp .env.example .env
   ```
   Lalu isi `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dengan kredensial Supabase Anda.

5. Copy konfigurasi environment frontend:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
   Secara default akan mengarah ke `http://localhost:4000`.

## Cara Menjalankan Development Server

Pastikan Anda sudah menginstal Node.js versi terbaru (direkomendasikan v20+).

### Menjalankan Backend (API)

```bash
cd backend
npm install
npm run dev
```

Backend akan berjalan di `http://localhost:4000`.

### Menjalankan Frontend (Web)

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`.

## Cara Kerja Monorepo (Dev)

- Saat development, Anda perlu menjalankan kedua server secara bersamaan di terminal terpisah.
- Frontend mengambil data dari backend melalui panggilan API.
- Backend berhubungan langsung dengan Supabase menggunakan `SERVICE_ROLE_KEY` (Bypass RLS) untuk menjamin keamanan dari sisi klien.
