import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definisikan tipe untuk User JWT Payload
export interface UserPayload {
  id: string;
  username: string;
  role: 'superadmin' | 'admin';
}

// Extend Request type di Express agar bisa menampung req.user
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'secret-jwt-cidamar-2026';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Coba ambil dari header Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Akses ditolak. Token tidak valid.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded; // simpan payload ke request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Sesi telah habis atau token tidak valid.' });
  }
};

export const requireRole = (roles: ('superadmin' | 'admin')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Akses ditolak. Anda tidak memiliki izin untuk tindakan ini.' });
    }
    
    next();
  };
};
