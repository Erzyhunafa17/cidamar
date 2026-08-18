import { Router } from 'express';
import { pengaturanController } from '../controllers/pengaturan.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/pengaturan
router.get('/', publicRateLimiter, pengaturanController.getAll);

export default router;
