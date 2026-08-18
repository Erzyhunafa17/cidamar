import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { env } from '../config/env';

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    // Untuk tahap development Phase 2, kita bisa bypass jika ada header MOCK-ADMIN
    if (env.NODE_ENV === 'development' && req.headers['x-mock-admin'] === 'true') {
      (req as any).user = {
        id: 'mock-admin-id',
        role: 'admin',
        email: 'admin@kampungcidamar.id'
      };
      return next();
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak ditemukan.'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token JWT dengan Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Token tidak valid atau sudah kadaluarsa.'
      });
    }

    // (Opsional) Cek role dari tabel users jika perlu.
    // Sementara kita gunakan user dari Supabase auth.
    (req as any).user = user;

    next();
  } catch (error) {
    next(error);
  }
};
