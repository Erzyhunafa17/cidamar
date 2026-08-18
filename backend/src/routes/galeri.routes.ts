import { Router } from 'express';
import { galeriController } from '../controllers/galeri.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/galeri
router.get('/', publicRateLimiter, galeriController.getAll);

// GET /api/galeri/:id
router.get('/:id', publicRateLimiter, galeriController.getById);

export default router;
