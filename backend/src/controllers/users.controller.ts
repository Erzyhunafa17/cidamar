import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { supabase } from '../config/supabase';

export const usersController = {
  // Hanya bisa diakses superadmin
  async getAllAdmins(req: Request, res: Response) {
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id, username, nama, role, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return res.json({ data });
    } catch (err: any) {
      console.error('Error getAllAdmins:', err);
      return res.status(500).json({ error: 'Gagal mengambil data admin' });
    }
  },

  async createAdmin(req: Request, res: Response) {
    try {
      const { username, password, nama, role } = req.body;

      if (!username || !password || !nama || !role) {
        return res.status(400).json({ error: 'Semua field wajib diisi' });
      }

      if (role !== 'admin' && role !== 'superadmin') {
        return res.status(400).json({ error: 'Role tidak valid' });
      }

      // Cek apakah username sudah ada
      const { data: existingUser } = await supabase
        .from('admins')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        return res.status(400).json({ error: 'Username sudah digunakan' });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);

      // Simpan ke db
      const { data, error } = await supabase
        .from('admins')
        .insert([{ username, password_hash, nama, role }])
        .select('id, username, nama, role, created_at')
        .single();

      if (error) throw error;

      return res.status(201).json({ message: 'Admin berhasil ditambahkan', data });
    } catch (err: any) {
      console.error('Error createAdmin:', err);
      return res.status(500).json({ error: 'Gagal menambahkan admin' });
    }
  },

  async deleteAdmin(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      // Jangan hapus diri sendiri
      if (req.user?.id === id) {
        return res.status(400).json({ error: 'Anda tidak dapat menghapus akun Anda sendiri' });
      }

      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.json({ message: 'Admin berhasil dihapus' });
    } catch (err: any) {
      console.error('Error deleteAdmin:', err);
      return res.status(500).json({ error: 'Gagal menghapus admin' });
    }
  },

  async resetPassword(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const { newPassword } = req.body;

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'Password baru harus minimal 6 karakter' });
      }

      const password_hash = await bcrypt.hash(newPassword, 10);

      const { error } = await supabase
        .from('admins')
        .update({ password_hash })
        .eq('id', id);

      if (error) throw error;

      return res.json({ message: 'Password berhasil direset' });
    } catch (err: any) {
      console.error('Error resetPassword:', err);
      return res.status(500).json({ error: 'Gagal mereset password admin' });
    }
  }
};
