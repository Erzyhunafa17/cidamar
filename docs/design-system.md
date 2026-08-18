# Design System
# Website Kampung Cidamar

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  
**Framework**: Tailwind CSS v3 + Next.js

---

## 1. Filosofi Desain

Website Kampung Cidamar mengusung tema **"Alami, Hangat, dan Terpercaya"** — terinspirasi dari nuansa alam kampung (sawah, tanah, pepohonan) yang dipadukan dengan kesan modern dan profesional. Desain harus:

- Terasa **ramah dan hangat** bagi seluruh kalangan, termasuk warga lansia
- Tetap **bersih dan profesional** untuk pengunjung dari instansi pemerintah/sponsor
- **Mobile-first** dan nyaman diakses dari smartphone entry-level

---

## 2. Palet Warna

### Warna Utama

| Nama | HEX | HSL | Penggunaan |
|---|---|---|---|
| `green-primary` | `#2D6A4F` | hsl(154, 40%, 30%) | Navbar, heading utama, elemen brand |
| `green-secondary` | `#40916C` | hsl(154, 38%, 41%) | Button primary, link, ikon aktif |
| `green-light` | `#74C69D` | hsl(152, 43%, 61%) | Aksen ringan, highlight section |
| `green-pale` | `#D8F3DC` | hsl(127, 52%, 90%) | Background section, badge bg |

### Warna Aksen

| Nama | HEX | HSL | Penggunaan |
|---|---|---|---|
| `amber-accent` | `#E9961A` | hsl(38, 83%, 51%) | CTA button, badge emas, highlight penting |
| `amber-light` | `#FFF3CD` | hsl(45, 100%, 90%) | Background badge emas |
| `red-alert` | `#C0392B` | hsl(5, 62%, 46%) | Status "Sedang Tampil", peringatan |

### Warna Netral

| Nama | HEX | HSL | Penggunaan |
|---|---|---|---|
| `brown-dark` | `#4A3728` | hsl(22, 30%, 23%) | Teks body heading gelap |
| `brown-medium` | `#7D5A50` | hsl(14, 22%, 40%) | Teks sekunder, keterangan |
| `cream-bg` | `#FEFAE0` | hsl(51, 93%, 94%) | Background utama halaman |
| `white` | `#FFFFFF` | — | Background card, modal |
| `gray-100` | `#F8F9FA` | hsl(210, 17%, 98%) | Background subtle |
| `gray-300` | `#DEE2E6` | hsl(210, 14%, 89%) | Border, divider |
| `gray-600` | `#6C757D` | hsl(208, 7%, 46%) | Placeholder text |
| `gray-900` | `#212529` | hsl(210, 11%, 15%) | Teks utama body |

### Konfigurasi Tailwind (`tailwind.config.ts`)

```typescript
theme: {
  extend: {
    colors: {
      green: {
        primary:    '#2D6A4F',
        secondary:  '#40916C',
        light:      '#74C69D',
        pale:       '#D8F3DC',
      },
      amber: {
        accent:     '#E9961A',
        light:      '#FFF3CD',
      },
      brown: {
        dark:       '#4A3728',
        medium:     '#7D5A50',
      },
      cream: {
        bg:         '#FEFAE0',
      },
    },
  },
},
```

---

## 3. Tipografi

### Font Family

| Peran | Font | Import |
|---|---|---|
| **Heading** | **Plus Jakarta Sans** | Google Fonts — tegas, modern, mudah dibaca |
| **Body Text** | **Inter** | Google Fonts — nyaman dibaca panjang, familiar |
| **Monospace** | JetBrains Mono | Untuk code snippet (jika ada) |

```html
<!-- Tambahkan ke layout.tsx -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Skala Tipografi

| Token | Ukuran | Line Height | Font Weight | Penggunaan |
|---|---|---|---|---|
| `text-h1` | 3rem (48px) | 1.2 | 800 | Judul halaman utama, hero |
| `text-h2` | 2.25rem (36px) | 1.3 | 700 | Judul section landing page |
| `text-h3` | 1.875rem (30px) | 1.3 | 700 | Judul sub-section |
| `text-h4` | 1.5rem (24px) | 1.4 | 600 | Judul card, artikel |
| `text-h5` | 1.25rem (20px) | 1.4 | 600 | Sub-heading |
| `text-h6` | 1.125rem (18px) | 1.5 | 600 | Label, caption heading |
| `text-body-lg` | 1.125rem (18px) | 1.7 | 400 | Paragraf utama (lebih besar untuk keterbacaan lansia) |
| `text-body` | 1rem (16px) | 1.7 | 400 | Teks body standar |
| `text-body-sm` | 0.875rem (14px) | 1.5 | 400 | Keterangan, metadata |
| `text-caption` | 0.75rem (12px) | 1.4 | 400 | Label kecil, badge text |

> **Catatan Aksesibilitas**: Ukuran minimum body text adalah **16px**. Untuk section yang sering dibaca warga lansia (kontak, jadwal), gunakan `text-body-lg` (18px).

---

## 4. Spacing & Grid System

### Skala Spacing (Tailwind 4px base)

```
4px   = space-1
8px   = space-2
12px  = space-3
16px  = space-4
20px  = space-5
24px  = space-6
32px  = space-8
40px  = space-10
48px  = space-12
64px  = space-16
80px  = space-20
96px  = space-24
128px = space-32
```

### Container

```css
.container {
  max-width: 1280px;    /* max-w-7xl */
  margin: 0 auto;
  padding: 0 1rem;      /* px-4 */
}

/* Breakpoints */
@media (min-width: 640px)  { padding: 0 1.5rem; }  /* px-6 */
@media (min-width: 1024px) { padding: 0 2rem;   }  /* px-8 */
```

### Grid Layout

| Layout | Columns | Gap | Penggunaan |
|---|---|---|---|
| Grid berita | 1 → 2 → 3 | 24px | List artikel berita |
| Grid prestasi | 1 → 2 → 3 | 24px | Kartu prestasi |
| Grid UMKM | 1 → 2 → 4 | 16px | Kartu UMKM |
| Grid galeri | 2 → 3 → 4 | 8px | Grid foto |
| Grid admin | 12 kolom (sidebar + main) | — | Layout admin dashboard |

### Breakpoints (Mobile-First)

| Nama | Nilai | Tailwind Prefix |
|---|---|---|
| Mobile | < 640px | (default) |
| Small | >= 640px | `sm:` |
| Medium (Tablet) | >= 768px | `md:` |
| Large (Desktop) | >= 1024px | `lg:` |
| XLarge | >= 1280px | `xl:` |

---

## 5. Komponen Reusable

### 5.1 Button

```tsx
// Varian
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

// Spesifikasi
// primary   → bg green-secondary, text white, hover bg green-primary
// secondary → bg amber-accent, text white, hover bg amber-600
// outline   → border green-secondary, text green-secondary, hover bg green-pale
// ghost     → no border, text green-secondary, hover bg green-pale
// danger    → bg red-alert, text white

// Ukuran minimum touch target: 44x44px (WCAG 2.1 AA)
// sm: h-9  (36px) + padding — hanya untuk konteks non-touch
// md: h-11 (44px) + px-5   — default
// lg: h-14 (56px) + px-8   — CTA hero
```

### 5.2 Card — Berita

```
┌─────────────────────────────┐
│  [Thumbnail 16:9 WebP]      │
├─────────────────────────────┤
│  [Badge Kategori]           │
│  Judul Berita (2 baris max) │
│  Ringkasan (3 baris max)    │
│                             │
│  [Avatar Penulis] Nama  Tgl │
└─────────────────────────────┘

Properti:
- border-radius: rounded-xl (12px)
- shadow: shadow-md
- hover: shadow-lg + translateY(-2px)
- transition: all 200ms ease
```

### 5.3 Card — Prestasi

```
┌─────────────────────────────┐
│  [Badge Tingkat] [Badge Kat]│
│                             │
│  [Foto Prestasi — opsional] │
│                             │
│  Nama Prestasi              │
│  Tahun  •  Tingkat          │
│  Deskripsi singkat          │
└─────────────────────────────┘
```

### 5.4 Badge Tingkat Prestasi

| Tingkat | Warna | Label |
|---|---|---|
| Nasional | `bg-amber-accent text-white` + ikon 🥇 | Nasional |
| Provinsi | `bg-amber-accent text-white` + ikon 🥇 | Provinsi |
| Kabupaten | `bg-gray-400 text-white` + ikon 🥈 | Kabupaten |
| Kecamatan | `bg-amber-700 text-white` + ikon 🥉 | Kecamatan |
| RT/RW | `bg-green-light text-green-primary` | RT/RW |

### 5.5 Badge Status Penampilan

```tsx
// menunggu      → bg-gray-100   text-gray-600   ikon: ⏳
// sedang_tampil → bg-red-100    text-red-700    ikon: 🎤 + animasi pulse
// selesai       → bg-green-pale text-green-primary ikon: ✅
```

### 5.6 Navbar (Responsive)

```
Desktop:
[Logo Kampung Cidamar] [Beranda] [Berita] [Prestasi] [Agustusan] [UMKM] [Galeri] [Kontak] [Login Admin]

Mobile (Hamburger):
[Logo] ☰
  → Drawer menu dari kiri/kanan
  → Semua menu item + tombol Login Admin
  
Properti:
- Sticky/fixed top
- Background: white + shadow-sm saat scroll
- Transition opacity/blur saat scroll
- Active link: border-bottom green-secondary
```

### 5.7 Footer

```
Kolom 1: Logo + Deskripsi singkat kampung
Kolom 2: Navigasi Utama (Beranda, Berita, Prestasi, Agustusan)
Kolom 3: Navigasi Lainnya (UMKM, Galeri, Kontak, Admin)
Kolom 4: Kontak Singkat (Alamat, Nomor, Email)

Bawah:
Copyright © 2026 Kampung Cidamar | Dibuat dengan ❤️ untuk warga
```

### 5.8 Search Bar

```tsx
// Komponen input dengan ikon kaca pembesar
// Debounce 300ms saat mengetik
// State: idle | loading | hasil ditemukan | tidak ditemukan
// Mobile: full-width, tablet/desktop: max-w-md
```

### 5.9 Timeline Component (Prestasi)

```
[2026] ──●── Juara 1 Lomba Kebersihan Kabupaten
         │   Kategori: Lingkungan • Kabupaten
         │   [Foto] Deskripsi singkat...
         │
[2025] ──●── Juara 2 Senam Kreasi Kecamatan
         │   Kategori: Olahraga • Kecamatan
         ...

Implementasi:
- Garis vertikal: border-l-2 border-green-light
- Titik (dot): w-4 h-4 rounded-full bg-green-secondary
- Animasi masuk: fade-in + slide-up saat scroll (Intersection Observer)
```

### 5.10 Status Indicator "Sedang Tampil"

```tsx
// Komponen khusus halaman Agustusan
// Animasi: pulse merah + border menonjol
// Tampil di top halaman saat ada yang sedang tampil
// Auto-refresh setiap 30 detik (polling)
```

---

## 6. Animasi & Transisi

| Animasi | Durasi | Easing | Penggunaan |
|---|---|---|---|
| Fade in | 300ms | ease-out | Halaman masuk, modal |
| Slide up | 400ms | ease-out | Card masuk saat scroll |
| Hover card | 200ms | ease | Elevasi card saat hover |
| Pulse | 2000ms | ease-in-out | Status "Sedang Tampil" |
| Skeleton shimmer | 1500ms | linear | Loading placeholder |
| Navbar shadow | 200ms | ease | Muncul saat scroll |

```css
/* Contoh CSS animation untuk Sedang Tampil */
@keyframes pulse-ring {
  0%   { box-shadow: 0 0 0 0 rgba(192, 57, 43, 0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(192, 57, 43, 0); }
  100% { box-shadow: 0 0 0 0 rgba(192, 57, 43, 0); }
}
```

---

## 7. Aksesibilitas (WCAG 2.1 AA)

| Kriteria | Implementasi |
|---|---|
| Kontras warna teks | Minimum 4.5:1 untuk teks normal, 3:1 untuk teks besar |
| Touch target | Minimum 44×44px untuk semua elemen interaktif |
| Focus visible | Outline fokus yang jelas saat navigasi keyboard |
| Alt text | Semua gambar punya atribut `alt` yang deskriptif |
| Semantic HTML | Gunakan `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>` |
| ARIA labels | Tombol tanpa teks harus punya `aria-label` |
| Skip navigation | Link "Langsung ke konten" tersembunyi di awal halaman |
| Form labels | Semua input punya `<label>` yang terhubung |

---

## 8. Ikonografi

- **Library**: [Lucide React](https://lucide.dev/) — set ikon konsisten dan ringan
- **Ukuran standar**: 20px (ikon inline), 24px (ikon navigasi), 32px (ikon fitur)
- **Warna**: Mengikuti konteks teks (currentColor)

---

*Dokumen design system ini menjadi acuan visual untuk semua komponen yang dibangun. Setiap komponen baru harus mengikuti token warna, tipografi, dan spacing yang telah ditetapkan di sini.*
