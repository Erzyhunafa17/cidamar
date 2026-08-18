import { z } from 'zod';

export const createPrestasiSchema = z.object({
  nama_prestasi: z.string().min(3, 'Nama prestasi minimal 3 karakter').max(500, 'Nama prestasi maksimal 500 karakter'),
  tahun: z.coerce.number().min(1945, 'Tahun tidak valid').max(2100, 'Tahun tidak valid'),
  tingkat: z.enum(['rt_rw', 'kecamatan', 'kabupaten', 'provinsi', 'nasional']),
  kategori: z.enum(['olahraga', 'seni_budaya', 'lingkungan', 'pendidikan', 'lainnya']),
  deskripsi: z.string().optional().nullable(),
  foto_url: z.string().url('Format URL tidak valid').optional().nullable().or(z.literal('')),
});

export const updatePrestasiSchema = createPrestasiSchema.partial();
