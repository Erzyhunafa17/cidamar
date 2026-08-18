import { Request, Response, NextFunction } from 'express';
import { statistikService } from '../services/statistik.service';

export const statistikController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await statistikService.getAll();
      res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
