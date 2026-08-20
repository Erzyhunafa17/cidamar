import { Request, Response, NextFunction } from 'express';
import { agustusanService } from '../services/agustusan.service';
import { createAgustusanSchema, updateAgustusanSchema, updateStatusAgustusanSchema } from '../validators/agustusan.validator';

export const agustusanController = {
  // Publik
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tahun_acara = (req.query.tahun as string) ? parseInt((req.query.tahun as string) as string) : undefined;
      const data = await agustusanService.getAll({ tahun_acara });
      
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const data = await agustusanService.getById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Data grup tidak ditemukan'
        });
      }

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  // Admin
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createAgustusanSchema.parse(req.body);
      const data = await agustusanService.create(validatedData);
      
      res.status(201).json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const validatedData = updateAgustusanSchema.parse(req.body);

      const data = await agustusanService.update(id, validatedData);
      
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { status } = updateStatusAgustusanSchema.parse(req.body);

      const data = await agustusanService.updateStatus(id, status);

      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await agustusanService.delete(id);
      
      res.json({
        success: true,
        message: 'Grup berhasil dihapus dari jadwal'
      });
    } catch (error) {
      next(error);
    }
  },

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { urutan_tampil } = req.body;
      
      if (!urutan_tampil || typeof urutan_tampil !== 'number') {
        return res.status(400).json({ success: false, message: 'urutan_tampil harus berupa angka' });
      }

      const data = await agustusanService.reorder(id, urutan_tampil);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async deleteSelesai(req: Request, res: Response, next: NextFunction) {
    try {
      const tahun = (req.query.tahun as string) ? parseInt((req.query.tahun as string) as string) : undefined;
      await agustusanService.deleteSelesai(tahun);
      
      res.json({
        success: true,
        message: 'Riwayat penampilan yang sudah selesai berhasil dibersihkan'
      });
    } catch (error) {
      next(error);
    }
  }
};
