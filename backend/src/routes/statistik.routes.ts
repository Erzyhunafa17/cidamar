import { Router } from 'express';
import { statistikController } from '../controllers/statistik.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/statistik — Data statistik kampung publik
router.get('/', publicRateLimiter, statistikController.getAll);

export default router;
