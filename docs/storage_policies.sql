-- ============================================================
-- Kebijakan Akses Storage (Storage RLS Policies)
-- Jalankan di Supabase SQL Editor (Settings → SQL Editor)
-- ============================================================

-- 1. Berikan akses baca (SELECT) publik untuk bucket 'galeri'
CREATE POLICY "Public Access Galeri"
ON storage.objects FOR SELECT
USING ( bucket_id = 'galeri' );

-- 2. Berikan akses unggah (INSERT) publik untuk bucket 'galeri'
-- Catatan: Secara ideal, akses unggah hanya untuk authenticated users, 
-- namun karena kita menangani autentikasi di backend Express kustom, 
-- frontend mengunggah dengan anon key, sehingga kita membuka INSERT.
CREATE POLICY "Public Upload Galeri"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'galeri' );

-- 3. Lakukan hal yang sama untuk bucket 'prestasi' jika belum ada
CREATE POLICY "Public Access Prestasi"
ON storage.objects FOR SELECT
USING ( bucket_id = 'prestasi' );

CREATE POLICY "Public Upload Prestasi"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'prestasi' );

-- 4. Lakukan hal yang sama untuk bucket 'berita'
CREATE POLICY "Public Access Berita"
ON storage.objects FOR SELECT
USING ( bucket_id = 'berita' );

CREATE POLICY "Public Upload Berita"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'berita' );
