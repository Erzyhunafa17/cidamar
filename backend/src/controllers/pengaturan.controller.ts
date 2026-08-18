import { Request, Response, NextFunction } from 'express';
import { pengaturanService } from '../services/pengaturan.service';
import { updatePengaturanSchema } from '../validators/pengaturan.validator';

export const pengaturanController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pengaturanService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async updateMultiple(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = updatePengaturanSchema.parse(req.body);
      
      // Filter out undefined values and convert everything to string for storage
      const settingsToSave: Record<string, string> = {};
      
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          settingsToSave[key] = String(value);
        } else if (value === null) {
          settingsToSave[key] = ''; // Store empty string for nulls
        }
      });

      await pengaturanService.setMultiple(settingsToSave);
      
      // Fetch updated data to return
      const updatedData = await pengaturanService.getAll();
      
      res.json({ success: true, message: 'Pengaturan berhasil disimpan', data: updatedData });
    } catch (error) {
      next(error);
    }
  }
};
