import { Router } from 'express';
import { arsipController } from '../controllers/arsip.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/arsip
router.get('/', publicRateLimiter, arsipController.getAll);

// GET /api/arsip/:id
router.get('/:id', publicRateLimiter, arsipController.getById);

export default router;
