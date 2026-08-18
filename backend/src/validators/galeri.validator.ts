import { z } from 'zod';

export const createGaleriSchema = z.object({
  judul: z.string().max(255).optional().transform(val => (!val || val.trim() === '') ? 'Tanpa Judul' : val),
  foto_url: z.string().url('URL foto tidak valid'),
  kategori: z.string().optional().nullable(),
  tahun: z.coerce.number().optional().nullable(),
});

export const updateGaleriSchema = createGaleriSchema.partial();
