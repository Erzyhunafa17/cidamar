import { Request, Response, NextFunction } from 'express';
import { beritaService } from '../services/berita.service';
import { createBeritaSchema, updateBeritaSchema } from '../validators/berita.validator';

export const beritaController = {
  // Publik
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt((req.query.page as string) as string) || 1;
      const limit = parseInt((req.query.limit as string) as string) || 10;
      const search = (req.query.q as string) as string;
      const kategori = (req.query.kategori as string) as string;

      const result = await beritaService.getAll({ page, limit, search, kategori });
      
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
      const slug = req.params.slug as string;
      const data = await beritaService.getBySlug(slug);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Berita tidak ditemukan'
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
      const id = req.params.id as string;
      // We need to add getById in beritaService too!
      // But we can just use supabase directly here for simplicity, or add it to service.
      // Let's call a service method (I'll add it to service next)
      const data = await beritaService.getById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Berita tidak ditemukan'
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
      const validatedData = createBeritaSchema.parse(req.body);
      
      let penulis_id = (req as any).user?.id; 
      if (penulis_id === 'mock-admin-id') {
        penulis_id = undefined; // Supaya tidak error invalid input UUID atau foreign key
      }

      const data = await beritaService.create(validatedData, penulis_id);
      
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
      const validatedData = updateBeritaSchema.parse(req.body);

      const data = await beritaService.update(id, validatedData);
      
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
      await beritaService.delete(id);
      
      res.json({
        success: true,
        message: 'Berita berhasil dihapus'
      });
    } catch (error) {
      next(error);
    }
  }
};
