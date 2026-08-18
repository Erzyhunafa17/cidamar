# Product Requirements Document (PRD)
# Website Kampung Cidamar

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  
**Status**: Draft — Menunggu Persetujuan  

---

## 1. Latar Belakang & Tujuan

Website resmi profil **Kampung Cidamar** bertujuan untuk:

1. **Informasi Publik** — Menjadi sumber informasi resmi bagi warga kampung dan pengunjung luar mengenai profil, kegiatan, dan prestasi kampung.
2. **Transparansi & Partisipasi** — Menampilkan berita kegiatan warga secara berkala agar masyarakat tetap terhubung dan terinformasi.
3. **Digitalisasi Administrasi Agustusan** — Menjadi alat bantu panitia acara 17 Agustusan untuk mengelola jadwal penampilan lomba dan mengarsipkan surat-menyurat secara digital.
4. **Promosi Kampung** — Menampilkan prestasi dan potensi kampung kepada pihak luar (dinas, sponsor, media) sebagai sarana promosi.

---

## 2. Target Pengguna

| Segmen | Kebutuhan Utama | Akses |
|---|---|---|
| **Warga Kampung** | Akses info umum, baca berita terkini, lihat jadwal acara | Publik |
| **Panitia Agustusan** | Kelola jadwal penampilan lomba, akses & unduh arsip surat | Login (role: admin) |
| **Pengunjung Luar** (dinas, sponsor, media) | Melihat profil kampung, prestasi, dan potensi UMKM | Publik |
| **Admin** (kepala kampung / perangkat) | CRUD berita, prestasi, jadwal, arsip surat, data UMKM | Login (role: admin/superadmin) |

### Persona Pengguna

**Persona 1 – Pak RT (Warga Biasa)**
- Usia 50–65 tahun, melek smartphone dasar
- Kebutuhan: melihat pengumuman dan jadwal acara kampung
- Tantangan: layar kecil, kurang terbiasa navigasi kompleks
- Solusi: font besar, navigasi sederhana, mobile-first

**Persona 2 – Panitia Agustusan (Pemuda)**
- Usia 20–35 tahun, melek teknologi
- Kebutuhan: input & pantau jadwal grup tampil secara real-time, unduh template surat
- Tantangan: butuh update cepat di hari-H
- Solusi: panel admin responsif, indikator status penampilan

**Persona 3 – Petugas Dinas Kabupaten**
- Usia 30–45 tahun, mengakses dari laptop/PC
- Kebutuhan: lihat profil kampung, daftar prestasi, kontak resmi
- Tantangan: butuh kesan profesional dan kredibel
- Solusi: desain bersih, data prestasi terstruktur, halaman kontak lengkap

---

## 3. Fitur Wajib (MVP — Fase 1–6)

### 3.1 Landing Page
- **Hero Section**: Foto/video background kampung, tagline, tombol CTA ke profil & berita
- **Statistik Kampung**: Jumlah KK, RT, prestasi, UMKM aktif (data dinamis dari backend)
- **Sekilas Kampung**: Narasi singkat profil kampung, visi-misi, sejarah ringkas
- **Prestasi Terkini**: 3–5 prestasi unggulan dengan badge tingkat
- **Berita Terbaru**: 3–4 artikel berita terkini
- **Direktori UMKM & Kontak Penting**: Grid UMKM + daftar kontak darurat/penting
- **Agenda Agustusan**: Countdown dan teaser jadwal acara
- **Galeri**: Preview foto kegiatan terbaru
- **Kontak & Lokasi**: Form kontak + embed Google Maps
- **Footer**: Tautan navigasi, sosial media (opsional), credit

### 3.2 Modul Berita
- List semua berita dengan filter kategori dan search
- Halaman detail berita dengan konten kaya (rich text/markdown)
- Thumbnail gambar dengan optimasi WebP via `next/image`
- Pagination atau infinite scroll
- Metadata SEO per artikel (title, description, og:image)

### 3.3 Modul Prestasi
- List prestasi dalam tampilan **timeline** (urut tahun) atau **grid kartu**
- Filter berdasarkan kategori (olahraga, seni budaya, lingkungan, pendidikan) dan tingkat (RT/RW, kecamatan, kabupaten, provinsi, nasional)
- Badge warna berdasarkan tingkat pencapaian:
  - 🥇 Emas: Nasional/Provinsi
  - 🥈 Perak: Kabupaten
  - 🥉 Perunggu: Kecamatan/RT-RW
- Halaman detail prestasi
- Search prestasi

### 3.4 Modul Agustusan — Jadwal Penampilan
- Database grup penampilan lomba (nama grup, jenis penampilan, anggota, urutan tampil, waktu)
- Tampilan jadwal publik dengan status real-time:
  - ✅ **Selesai**
  - 🎤 **Sedang Tampil** (highlight menonjol)
  - ⏳ **Menunggu**
- Admin dapat mengubah status penampilan
- Filter per jenis lomba/penampilan

### 3.5 Modul Arsip Surat-menyurat Agustusan
- Upload dan kategorisasi surat (undangan, SK panitia, proposal, laporan, dll)
- Filter berdasarkan kategori dan tahun
- Download file template surat (PDF/DOCX)
- Search judul surat
- Hanya admin yang dapat upload/hapus; publik dapat melihat dan download

### 3.6 Direktori UMKM & Kontak Penting
- Kartu UMKM: nama usaha, jenis, nama pemilik, kontak, foto
- Daftar kontak penting: bidan desa, ketua RT/RW, pemadam kebakaran, dsb.
- Admin dapat CRUD data UMKM dan kontak

### 3.7 Galeri Foto
- Grid foto kegiatan kampung
- Filter berdasarkan kategori kegiatan dan tahun
- Lightbox untuk preview foto full-size
- Upload via admin panel

### 3.8 Autentikasi Admin
- Login aman via Supabase Auth (email + password)
- Middleware auth guard di backend untuk semua endpoint `/admin/*`
- Role-based: `admin` (CRUD semua modul) vs `superadmin` (tambahan kelola user)
- Session management via JWT

### 3.9 Admin Dashboard
- Overview statistik singkat (total berita, prestasi, grup penampilan, arsip surat)
- CRUD lengkap untuk semua modul
- Upload gambar/file ke Supabase Storage
- Tabel data dengan sorting, filter, dan pagination

---

## 4. Fitur Nice-to-Have (Fase Lanjutan)

| Fitur | Prioritas | Keterangan |
|---|---|---|
| Statistik real-time hari-H Agustusan | Tinggi | Polling atau WebSocket untuk update status tampil |
| Galeri foto per kegiatan | Sedang | Album terorganisir per event |
| Filter kategori berita | Sedang | Tag/label kategori berita |
| Notifikasi WhatsApp jadwal | Rendah | Integrasi WA API untuk reminder |
| Mode gelap (dark mode) | Rendah | Toggle tema terang/gelap |

---

## 5. Batasan (Out of Scope — MVP)

- Tidak ada sistem pembayaran atau donasi online
- Tidak perlu multi-bahasa (hanya Bahasa Indonesia)
- Tidak perlu aplikasi mobile native terpisah (cukup responsive web)
- Tidak ada forum diskusi atau komentar warga (MVP)
- Tidak ada integrasi media sosial otomatis (MVP)

---

## 6. Non-Functional Requirements

### 6.1 Performa
- Waktu load halaman landing page **< 2 detik** pada koneksi 4G standar (LCP < 2.5s)
- First Contentful Paint (FCP) **< 1.5 detik**
- Gambar wajib menggunakan format **WebP** dengan lazy loading
- Halaman statis (landing, prestasi, tentang) menggunakan **SSG (Static Site Generation)**
- Halaman dinamis (berita terbaru, jadwal) menggunakan **ISR (Incremental Static Regeneration)** atau Server-Side Rendering

### 6.2 Aksesibilitas
- Ukuran font minimum **16px** untuk body text
- Ukuran tombol minimum **44x44px** untuk touch target (WCAG 2.1 AA)
- Kontras warna minimum **4.5:1** untuk teks normal
- Semua gambar memiliki atribut `alt` yang deskriptif
- Navigasi keyboard-friendly

### 6.3 SEO
- URL slug yang deskriptif dan bersih (contoh: `/berita/nama-artikel-berita`)
- Meta title dan description dinamis per halaman
- Open Graph dan Twitter Card metadata
- Sitemap XML otomatis
- Robots.txt yang tepat
- Data terstruktur (Schema.org) untuk artikel berita

### 6.4 Keamanan
- Input validasi dan sanitasi di backend
- Rate limiting untuk endpoint publik
- CORS terkonfigurasi dengan benar
- Environment variables untuk semua credentials (tidak ada secret hardcoded)
- HTTPS wajib di production

### 6.5 Responsivitas
- Mobile-first design
- Breakpoint: Mobile (< 768px), Tablet (768px–1024px), Desktop (> 1024px)
- Navigasi mobile dengan hamburger menu
- Tabel admin horizontal scroll di mobile

---

## 7. Metrik Kesuksesan

| Metrik | Target |
|---|---|
| Lighthouse Performance Score | >= 85 |
| Lighthouse Accessibility Score | >= 90 |
| Lighthouse SEO Score | >= 90 |
| Waktu Load Halaman Landing | < 2 detik |
| Uptime | >= 99% |
| Mobile Usability Score | >= 95 (Google Search Console) |

---

## 8. Dependensi & Risiko

| Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|
| Koneksi internet warga kampung lambat | Tinggi | Tinggi | Optimasi gambar agresif, skeleton loading |
| Admin kurang familiar teknologi | Sedang | Tinggi | UI admin sederhana, panduan penggunaan |
| Data prestasi tidak lengkap di awal | Sedang | Rendah | Seed data dummy untuk demo |
| Supabase free tier terbatas | Rendah | Sedang | Monitor usage, upgrade jika perlu |

---

*Dokumen ini merupakan acuan utama pengembangan Website Kampung Cidamar. Perubahan harus didiskusikan dan disetujui sebelum implementasi.*
