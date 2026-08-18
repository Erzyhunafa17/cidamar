import { z } from 'zod';

export const createAgustusanSchema = z.object({
  nama_grup: z.string().min(3, 'Nama grup minimal 3 karakter').max(255, 'Nama grup maksimal 255 karakter'),
  jenis_penampilan: z.string().min(2, 'Jenis penampilan minimal 2 karakter').max(255, 'Maksimal 255 karakter'),
  urutan_tampil: z.coerce.number().min(1, 'Urutan tampil minimal 1'),
  waktu_tampil: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format waktu harus HH:MM').optional().nullable(),
  tahun_acara: z.coerce.number().min(2000, 'Tahun tidak valid').max(2100, 'Tahun tidak valid'),
  anggota: z.array(z.string().min(1, 'Nama anggota tidak boleh kosong')).optional(),
});

export const updateAgustusanSchema = createAgustusanSchema.partial();

export const updateStatusAgustusanSchema = z.object({
  status: z.enum(['menunggu', 'sedang_tampil', 'selesai'])
});
