import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { verifyToken, requireRole } from '../middlewares/auth.middleware';

const router = Router();

// Semua rute di users hanya boleh diakses oleh superadmin
router.use(verifyToken);
router.use(requireRole(['superadmin']));

// GET /api/users
router.get('/', usersController.getAllAdmins);

// POST /api/users
router.post('/', usersController.createAdmin);

// DELETE /api/users/:id
router.delete('/:id', usersController.deleteAdmin);

// PUT /api/users/:id/password
router.put('/:id/password', usersController.resetPassword);

export default router;
