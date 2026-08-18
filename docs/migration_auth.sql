-- Migration: Menambahkan Otentikasi Kustom
-- Jalankan skrip ini di Supabase SQL Editor

-- 1. Karena sebelumnya public.users terkait dengan auth.users, kita akan
-- membuat tabel baru bernama 'admins' untuk sistem login kustom kita.
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nama VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Memasukkan Superadmin bawaan (Username: superadmin, Password: admin123)
-- Password 'admin123' di-hash menggunakan bcrypt dengan 10 salt rounds.
INSERT INTO public.admins (username, password_hash, nama, role) 
VALUES (
  'superadmin', 
  '$2b$10$K9..7mUiStqVUdicNGFzuuPernaHTmN9VqBEzriYV1hzJgJRTZORG',
  'Super Administrator', 
  'superadmin'
) ON CONFLICT (username) DO NOTHING;

-- Opsional: Mengubah foreign key penulis_id di tabel berita jika ingin
-- dikaitkan ke tabel admins (bukan users lagi).
ALTER TABLE public.berita DROP CONSTRAINT IF EXISTS berita_penulis_id_fkey;
ALTER TABLE public.berita ADD CONSTRAINT berita_penulis_id_fkey FOREIGN KEY (penulis_id) REFERENCES public.admins(id) ON DELETE SET NULL;
ALTER TABLE public.arsip_surat DROP CONSTRAINT IF EXISTS arsip_surat_uploaded_by_fkey;
ALTER TABLE public.arsip_surat ADD CONSTRAINT arsip_surat_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.admins(id) ON DELETE SET NULL;
