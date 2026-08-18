import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

const JWT_SECRET = process.env.SUPABASE_JWT_SECRET || 'secret-jwt-cidamar-2026';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username dan password wajib diisi' });
      }

      // Ambil data admin berdasarkan username
      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !admin) {
        return res.status(401).json({ error: 'Username atau password salah' });
      }

      // Cek password hash
      const isMatch = await bcrypt.compare(password, admin.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Username atau password salah' });
      }

      // Buat token JWT (berlaku 24 jam)
      const payload = {
        id: admin.id,
        username: admin.username,
        role: admin.role
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

      return res.json({
        message: 'Login berhasil',
        token,
        user: {
          id: admin.id,
          username: admin.username,
          nama: admin.nama,
          role: admin.role
        }
      });
    } catch (err: any) {
      console.error('Error saat login:', err);
      return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  },

  async getMe(req: Request, res: Response) {
    try {
      // req.user diset oleh middleware
      if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      return res.json({ user: req.user });
    } catch (err: any) {
      return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
  }
};
