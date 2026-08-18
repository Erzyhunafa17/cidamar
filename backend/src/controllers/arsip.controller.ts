import { Request, Response, NextFunction } from 'express';
import { arsipService } from '../services/arsip.service';
import { createArsipSchema, updateArsipSchema } from '../validators/arsip.validator';

export const arsipController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await arsipService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await arsipService.getById(id);

      if (!data) {
        return res.status(404).json({ success: false, message: 'Arsip tidak ditemukan' });
      }

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createArsipSchema.parse(req.body);
      
      const dbData = {
        judul: validatedData.judul,
        file_url: validatedData.file_url,
        deskripsi: validatedData.keterangan || null,
        tahun: validatedData.tanggal_surat ? parseInt(validatedData.tanggal_surat.substring(0, 4)) : new Date().getFullYear(),
        kategori_surat: 'lainnya', 
      };

      const data = await arsipService.create(dbData);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateArsipSchema.parse(req.body);
      
      const dbData: any = {};
      if (validatedData.judul !== undefined) dbData.judul = validatedData.judul;
      if (validatedData.file_url !== undefined) dbData.file_url = validatedData.file_url;
      if (validatedData.keterangan !== undefined) dbData.deskripsi = validatedData.keterangan || null;
      if (validatedData.tanggal_surat !== undefined) {
        dbData.tahun = validatedData.tanggal_surat ? parseInt(validatedData.tanggal_surat.substring(0, 4)) : new Date().getFullYear();
      }

      const data = await arsipService.update(id, dbData);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await arsipService.delete(id);
      res.json({ success: true, message: 'Arsip berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  }
};
