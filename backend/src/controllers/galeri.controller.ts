import { Request, Response, NextFunction } from 'express';
import { galeriService } from '../services/galeri.service';
import { pengaturanService } from '../services/pengaturan.service';
import { createGaleriSchema, updateGaleriSchema } from '../validators/galeri.validator';

export const galeriController = {
  // Publik
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Dapatkan limit dari pengaturan
      const limitStr = await pengaturanService.get('galeri_display_limit');
      const limit = limitStr ? parseInt(limitStr, 10) : 12; // default 12
      
      const data = await galeriService.getAll({ limit });
      
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
      const { id } = req.params;
      const data = await galeriService.getById(id);

      if (!data) {
        return res.status(404).json({ success: false, message: 'Foto tidak ditemukan' });
      }

      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  // Admin
  // (Admin getAll uses same method but maybe different limits if needed, here we'll just reuse or ignore limits for admin list)
  async getAllAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      // Tampilkan semua untuk panel admin
      const data = await galeriService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createGaleriSchema.parse(req.body);
      const data = await galeriService.create(validatedData);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validatedData = updateGaleriSchema.parse(req.body);
      const data = await galeriService.update(id, validatedData);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await galeriService.delete(id);
      res.json({ success: true, message: 'Foto berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  }
};
