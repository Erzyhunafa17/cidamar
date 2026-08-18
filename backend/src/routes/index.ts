import { Router } from 'express';
import statistikRouter from './statistik.routes';
import beritaRouter from './berita.routes';
import prestasiRouter from './prestasi.routes';
import agustusanRouter from './agustusan.routes';
import galeriRouter from './galeri.routes';
import arsipRouter from './arsip.routes';
import pengaturanRouter from './pengaturan.routes';
import adminRouter from './admin.routes';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server berjalan dengan baik',
    timestamp: new Date().toISOString(),
    service: 'Kampung Cidamar API',
  });
});

// Mount routers (Publik)
router.use('/statistik', statistikRouter);
router.use('/berita', beritaRouter);
router.use('/prestasi', prestasiRouter);
router.use('/agustusan', agustusanRouter);
router.use('/galeri', galeriRouter);
router.use('/arsip', arsipRouter);
router.use('/pengaturan', pengaturanRouter);

// Mount routers (Admin Protected)
router.use('/auth', authRouter);
router.use('/users', usersRouter);

// API untuk manajemen konten oleh Admin & Superadmin
router.use('/admin', verifyToken, requireRole(['admin', 'superadmin']), adminRouter);

export default router;
