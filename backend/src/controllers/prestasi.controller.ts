import { Request, Response, NextFunction } from 'express';
import { prestasiService } from '../services/prestasi.service';
import { createPrestasiSchema, updatePrestasiSchema } from '../validators/prestasi.validator';

export const prestasiController = {
  // Publik
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.q as string;
      const kategori = req.query.kategori as string;
      const tingkat = req.query.tingkat as string;
      const tahun = req.query.tahun ? parseInt(req.query.tahun as string) : undefined;

      const result = await prestasiService.getAll({ page, limit, search, kategori, tingkat, tahun });
      
      res.json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const data = await prestasiService.getBySlug(slug);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Prestasi tidak ditemukan'
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

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await prestasiService.getById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Prestasi tidak ditemukan'
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
      const validatedData = createPrestasiSchema.parse(req.body);
      const data = await prestasiService.create(validatedData);
      
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
      const { id } = req.params;
      const validatedData = updatePrestasiSchema.parse(req.body);

      const data = await prestasiService.update(id, validatedData);
      
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
      const { id } = req.params;
      await prestasiService.delete(id);
      
      res.json({
        success: true,
        message: 'Prestasi berhasil dihapus'
      });
    } catch (error) {
      next(error);
    }
  }
};
