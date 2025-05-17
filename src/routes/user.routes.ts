import express from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();
const userController = new UserController();

//Rotas públicas
router.post('/register', userController.registerUser);
router.post('/login', userController.login);

//Rotas privadas
router.post('/admin/register',authMiddleware, isAdmin, userController.registerAdmin);
router.get('/profile', authMiddleware, userController.getProfile);
router.patch('/profile', authMiddleware, userController.updateProfile);
router.delete('/delete', authMiddleware, userController.deleteAccout);

export default router;