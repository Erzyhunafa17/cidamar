import { z } from 'zod';

export const createArsipSchema = z.object({
  judul: z.string().min(3, 'Judul minimal 3 karakter').max(255),
  file_url: z.string().url('Format URL GDrive tidak valid'),
  tanggal_surat: z.string().optional().nullable(),
  keterangan: z.string().optional().nullable(),
});

export const updateArsipSchema = createArsipSchema.partial();
