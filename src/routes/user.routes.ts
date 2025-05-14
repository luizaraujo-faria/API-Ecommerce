import express from 'express';
import { UserController } from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
const userController = new UserController();

//Rotas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

//Rotas privadas
router.get('/profile', authMiddleware, userController.getProfile);
router.patch('/profile', authMiddleware, userController.updateProfile);
router.delete('/delete', authMiddleware, userController.deleteAccout);

export default router;