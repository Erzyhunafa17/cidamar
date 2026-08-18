import { z } from 'zod';

export const createBeritaSchema = z.object({
  judul: z.string().min(5, 'Judul minimal 5 karakter').max(500, 'Judul maksimal 500 karakter'),
  isi: z.string().min(20, 'Isi berita minimal 20 karakter'),
  kategori: z.enum(['umum', 'kegiatan', 'pengumuman', 'kesehatan', 'pendidikan', 'lingkungan', 'lainnya']),
  thumbnail_url: z.string().url('Format URL tidak valid').optional().nullable().or(z.literal('')),
  tanggal_terbit: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal harus YYYY-MM-DD'),
});

export const updateBeritaSchema = createBeritaSchema.partial();
