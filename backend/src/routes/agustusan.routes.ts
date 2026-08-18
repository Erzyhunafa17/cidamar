import { Router } from 'express';
import { agustusanController } from '../controllers/agustusan.controller';
import { publicRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// GET /api/agustusan
router.get('/', publicRateLimiter, agustusanController.getAll);

// GET /api/agustusan/:id
router.get('/:id', publicRateLimiter, agustusanController.getById);

export default router;
