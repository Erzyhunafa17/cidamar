import { Router } from 'express';
import { beritaController } from '../controllers/berita.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Semua rute admin dilindungi oleh verifyToken (Custom JWT)
router.use(verifyToken);

// ─── Berita ───────────────────────────────────────────────────────────────────
router.get('/berita/:id', beritaController.getById);
router.post('/berita', beritaController.create);
router.put('/berita/:id', beritaController.update);
router.delete('/berita/:id', beritaController.delete);

// ─── Prestasi ─────────────────────────────────────────────────────────────────
import { prestasiController } from '../controllers/prestasi.controller';

router.get('/prestasi/:id', prestasiController.getById);
router.post('/prestasi', prestasiController.create);
router.put('/prestasi/:id', prestasiController.update);
router.delete('/prestasi/:id', prestasiController.delete);

// ─── Agustusan ────────────────────────────────────────────────────────────────
import { agustusanController } from '../controllers/agustusan.controller';

router.get('/agustusan/:id', agustusanController.getById);
router.post('/agustusan', agustusanController.create);
router.put('/agustusan/:id', agustusanController.update);
router.patch('/agustusan/:id/status', agustusanController.updateStatus);
router.patch('/agustusan/:id/reorder', agustusanController.reorder);
router.delete('/agustusan/clear-selesai', agustusanController.deleteSelesai);
router.delete('/agustusan/:id', agustusanController.delete);

// ─── Galeri ───────────────────────────────────────────────────────────────────
import { galeriController } from '../controllers/galeri.controller';

router.get('/galeri', galeriController.getAllAdmin);
router.post('/galeri', galeriController.create);
router.put('/galeri/:id', galeriController.update);
router.delete('/galeri/:id', galeriController.delete);

// ─── Arsip ────────────────────────────────────────────────────────────────────
import { arsipController } from '../controllers/arsip.controller';

router.post('/arsip', arsipController.create);
router.put('/arsip/:id', arsipController.update);
router.delete('/arsip/:id', arsipController.delete);

// ─── Pengaturan ───────────────────────────────────────────────────────────────
import { pengaturanController } from '../controllers/pengaturan.controller';

router.put('/pengaturan', pengaturanController.updateMultiple);

export default router;
