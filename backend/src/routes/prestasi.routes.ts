import { Router } from 'express';
import { prestasiController } from '../controllers/prestasi.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/prestasi
router.get('/', publicRateLimiter, prestasiController.getAll);

// GET /api/prestasi/:slug
router.get('/:slug', publicRateLimiter, prestasiController.getBySlug);

export default router;
