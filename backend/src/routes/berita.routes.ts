import { Router } from 'express';
import { beritaController } from '../controllers/berita.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/berita — Data list berita dengan pagination & filter
router.get('/', publicRateLimiter, beritaController.getAll);

// GET /api/berita/:slug — Data detail berita
router.get('/:slug', publicRateLimiter, beritaController.getBySlug);

export default router;
