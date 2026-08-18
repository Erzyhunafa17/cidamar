import { z } from 'zod';

export const updatePengaturanSchema = z.object({
  galeri_gdrive_link: z.union([z.literal(''), z.string().url('URL Google Drive tidak valid')]).optional().nullable(),
  galeri_display_limit: z.coerce.number().min(1).max(100).optional(),
});
