# Struktur Folder (Monorepo)
# Website Kampung Cidamar

**Versi**: 1.0  
**Tanggal**: 17 Agustus 2026  

---

## Gambaran Umum

```
website-kampung-cidamar/          ← Root monorepo
├── frontend/                     ← Next.js App Router (Vercel)
├── backend/                      ← Node.js + Express + TypeScript (Railway/Render)
├── docs/                         ← Dokumentasi proyek
│   ├── PRD.md
│   ├── sitemap.md
│   ├── db.md
│   ├── design-system.md
│   ├── folder-structure.md
│   └── roadmap.md
├── .gitignore
└── README.md
```

---

## Frontend (`/frontend`)

> Next.js 14+ App Router | TypeScript | Tailwind CSS  
> **Aturan**: Frontend hanya berkomunikasi dengan backend via REST API. TIDAK ada Supabase client langsung di frontend.

```
frontend/
├── app/                              ← App Router (Next.js)
│   ├── layout.tsx                    ← Root layout (font, metadata global, Navbar, Footer)
│   ├── page.tsx                      ← Landing page (/)
│   ├── not-found.tsx                 ← Halaman 404 custom
│   ├── loading.tsx                   ← Global loading UI
│   ├── error.tsx                     ← Global error boundary
│   │
│   ├── (public)/                     ← Route group halaman publik (tidak affect URL)
│   │   ├── berita/
│   │   │   ├── page.tsx              ← /berita — list berita
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← /berita/[slug] — detail berita
│   │   │
│   │   ├── prestasi/
│   │   │   ├── page.tsx              ← /prestasi — list/timeline prestasi
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← /prestasi/[slug] — detail prestasi
│   │   │
│   │   ├── agustusan/
│   │   │   ├── page.tsx              ← /agustusan — jadwal penampilan
│   │   │   └── arsip-surat/
│   │   │       └── page.tsx          ← /agustusan/arsip-surat — arsip surat
│   │   │
│   │   ├── umkm/
│   │   │   └── page.tsx              ← /umkm — direktori UMKM & kontak penting
│   │   │
│   │   ├── galeri/
│   │   │   └── page.tsx              ← /galeri — galeri foto
│   │   │
│   │   └── kontak/
│   │       └── page.tsx              ← /kontak — kontak & peta
│   │
│   └── admin/                        ← Area admin (client-side protected)
│       ├── layout.tsx                ← Layout admin (sidebar, auth check)
│       ├── login/
│       │   └── page.tsx              ← /admin/login
│       └── dashboard/
│           ├── page.tsx              ← /admin/dashboard — overview
│           ├── berita/
│           │   ├── page.tsx          ← Tabel berita
│           │   ├── buat/
│           │   │   └── page.tsx      ← Form buat berita baru
│           │   └── [id]/
│           │       └── page.tsx      ← Form edit berita
│           ├── prestasi/
│           │   ├── page.tsx
│           │   ├── buat/page.tsx
│           │   └── [id]/page.tsx
│           ├── agustusan/
│           │   └── page.tsx          ← Kelola grup & jadwal penampilan
│           ├── arsip-surat/
│           │   └── page.tsx
│           ├── umkm/
│           │   └── page.tsx
│           └── galeri/
│               └── page.tsx
│
├── components/                       ← Komponen React reusable
│   ├── ui/                           ← Komponen UI atomik (design system)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   ├── Toast.tsx
│   │   └── index.ts                  ← Re-export semua ui komponen
│   │
│   ├── layout/                       ← Komponen layout
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── AdminHeader.tsx
│   │
│   ├── sections/                     ← Section-level komponen (khusus landing page)
│   │   ├── HeroSection.tsx
│   │   ├── StatistikSection.tsx
│   │   ├── SekilasSection.tsx
│   │   ├── PrestasiSection.tsx
│   │   ├── BeritaSection.tsx
│   │   ├── UmkmSection.tsx
│   │   ├── AgustusanSection.tsx
│   │   ├── GaleriSection.tsx
│   │   └── KontakSection.tsx
│   │
│   ├── berita/                       ← Komponen modul berita
│   │   ├── BeritaCard.tsx
│   │   ├── BeritaList.tsx
│   │   └── BeritaDetail.tsx
│   │
│   ├── prestasi/                     ← Komponen modul prestasi
│   │   ├── PrestasiCard.tsx
│   │   ├── PrestasiTimeline.tsx
│   │   ├── PrestasiGrid.tsx
│   │   └── BadgeTingkat.tsx
│   │
│   ├── agustusan/                    ← Komponen modul agustusan
│   │   ├── JadwalTable.tsx
│   │   ├── GrupCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── SedangTampilBanner.tsx
│   │   └── ArsipSuratList.tsx
│   │
│   ├── umkm/
│   │   ├── UmkmCard.tsx
│   │   └── KontakPentingList.tsx
│   │
│   └── admin/                        ← Komponen admin panel
│       ├── DataTable.tsx
│       ├── ImageUpload.tsx
│       ├── RichTextEditor.tsx
│       └── ConfirmDialog.tsx
│
├── lib/                              ← Utilitas dan helper
│   ├── api/                          ← Fungsi fetch ke backend REST API
│   │   ├── berita.ts                 ← fetchBeritaList(), fetchBeritaBySlug(), dll
│   │   ├── prestasi.ts
│   │   ├── agustusan.ts
│   │   ├── arsip-surat.ts
│   │   ├── umkm.ts
│   │   ├── galeri.ts
│   │   ├── statistik.ts
│   │   └── auth.ts                   ← login(), logout(), getMe()
│   │
│   └── utils/
│       ├── date.ts                   ← format tanggal Bahasa Indonesia
│       ├── slug.ts                   ← generateSlug(), validateSlug()
│       ├── cn.ts                     ← classnames/clsx helper
│       └── constants.ts              ← BASE_URL, REVALIDATE_TIME, dll
│
├── types/                            ← TypeScript type definitions
│   ├── berita.ts
│   ├── prestasi.ts
│   ├── agustusan.ts
│   ├── umkm.ts
│   ├── galeri.ts
│   ├── user.ts
│   └── api.ts                        ← ApiResponse<T>, PaginatedResponse<T>
│
├── hooks/                            ← Custom React hooks
│   ├── useBerita.ts
│   ├── useAgustusan.ts               ← Hook polling status penampilan
│   ├── useAuth.ts
│   └── useSearch.ts                  ← Debounced search hook
│
├── public/                           ← File statis
│   ├── favicon.ico
│   ├── logo-cidamar.svg
│   ├── og-image.jpg                  ← Default Open Graph image
│   └── images/
│       └── placeholder/
│
├── styles/
│   └── globals.css                   ← Tailwind directives + CSS custom
│
├── next.config.ts                    ← Konfigurasi Next.js (image domains, dll)
├── tailwind.config.ts                ← Konfigurasi Tailwind (custom colors, fonts)
├── tsconfig.json
├── .env.local                        ← NEXT_PUBLIC_API_URL=http://localhost:4000
└── package.json
```

---

## Backend (`/backend`)

> Node.js + Express + TypeScript  
> **Aturan**: Backend adalah satu-satunya pihak yang berkomunikasi dengan Supabase. Semua business logic, validasi, dan auth verification ada di sini.

```
backend/
├── src/
│   ├── index.ts                      ← Entry point, setup Express app
│   │
│   ├── config/
│   │   ├── supabase.ts               ← Init Supabase client (SERVICE_ROLE_KEY)
│   │   ├── env.ts                    ← Validasi dan export env variables
│   │   └── cors.ts                   ← Konfigurasi CORS (whitelist frontend origin)
│   │
│   ├── routes/                       ← Definisi routing Express
│   │   ├── index.ts                  ← Mount semua router
│   │   ├── berita.routes.ts          ← GET /api/berita, GET /api/berita/:slug
│   │   ├── prestasi.routes.ts
│   │   ├── agustusan.routes.ts       ← Jadwal penampilan
│   │   ├── arsip-surat.routes.ts
│   │   ├── umkm.routes.ts
│   │   ├── galeri.routes.ts
│   │   ├── statistik.routes.ts
│   │   ├── kontak-penting.routes.ts
│   │   └── auth.routes.ts            ← POST /api/auth/login, /logout, GET /me
│   │
│   ├── controllers/                  ← Handler request/response (thin layer)
│   │   ├── berita.controller.ts
│   │   ├── prestasi.controller.ts
│   │   ├── agustusan.controller.ts
│   │   ├── arsip-surat.controller.ts
│   │   ├── umkm.controller.ts
│   │   ├── galeri.controller.ts
│   │   ├── statistik.controller.ts
│   │   └── auth.controller.ts
│   │
│   ├── services/                     ← Business logic + interaksi Supabase DB
│   │   ├── berita.service.ts
│   │   ├── prestasi.service.ts
│   │   ├── agustusan.service.ts
│   │   ├── arsip-surat.service.ts
│   │   ├── umkm.service.ts
│   │   ├── galeri.service.ts
│   │   ├── statistik.service.ts
│   │   └── auth.service.ts
│   │
│   ├── middlewares/                  ← Express middleware
│   │   ├── authGuard.ts              ← Verifikasi JWT Supabase, proteksi route admin
│   │   ├── roleGuard.ts              ← Cek role (admin/superadmin)
│   │   ├── errorHandler.ts           ← Global error handler middleware
│   │   ├── validateRequest.ts        ← Validasi body request (Zod/Joi)
│   │   ├── rateLimiter.ts            ← express-rate-limit untuk endpoint publik
│   │   └── upload.ts                 ← Multer config untuk file upload ke Supabase Storage
│   │
│   ├── validators/                   ← Schema validasi input (Zod)
│   │   ├── berita.validator.ts
│   │   ├── prestasi.validator.ts
│   │   ├── agustusan.validator.ts
│   │   └── arsip-surat.validator.ts
│   │
│   └── types/                        ← TypeScript type definitions backend
│       ├── express.d.ts              ← Extend Express Request (user property)
│       ├── database.ts               ← Tipe baris database (sesuai db.md)
│       └── api.ts                    ← Tipe request/response payload
│
├── .env                              ← SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PORT, JWT_SECRET
├── tsconfig.json
├── nodemon.json                      ← Config dev server reload
└── package.json
```

---

## Komunikasi Frontend — Backend

```
Frontend (Next.js)
    │
    │  HTTP REST API (JSON)
    │  GET /api/berita?page=1&limit=10
    │  POST /api/auth/login  { email, password }
    │  Authorization: Bearer <supabase_jwt>
    │
    ▼
Backend (Express)
    │
    │  Supabase JS Client (server-side)
    │  SERVICE_ROLE_KEY (full access)
    │
    ▼
Supabase (PostgreSQL + Storage)
```

### Contoh Fungsi API di Frontend

```typescript
// frontend/lib/api/berita.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBeritaList(params?: {
  page?: number;
  limit?: number;
  kategori?: string;
  q?: string;
}) {
  const searchParams = new URLSearchParams({
    page: String(params?.page ?? 1),
    limit: String(params?.limit ?? 9),
    ...(params?.kategori && { kategori: params.kategori }),
    ...(params?.q && { q: params.q }),
  });
  
  const res = await fetch(`${BASE_URL}/api/berita?${searchParams}`, {
    next: { revalidate: 60 },  // ISR 60 detik
  });
  
  if (!res.ok) throw new Error('Gagal mengambil data berita');
  return res.json();
}
```

---

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000      # URL backend (dev)
# Production: NEXT_PUBLIC_API_URL=https://api.kampungcidamar.id
```

### Backend (`.env`)

```env
PORT=4000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# JWT (untuk verifikasi token dari Supabase Auth)
SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# CORS
FRONTEND_URL=http://localhost:3000
# Production: FRONTEND_URL=https://kampungcidamar.id
```

---

*Setiap developer wajib mengikuti struktur folder ini. Jangan buat file di luar struktur yang sudah ditetapkan tanpa diskusi terlebih dahulu.*
