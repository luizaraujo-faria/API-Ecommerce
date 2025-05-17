import express from 'express';
import { CategoryController } from '../controllers/CategoryController';
import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();
const categoryController = new CategoryController();

//Rotas privadas
router.post('/create', authMiddleware, isAdmin, categoryController.create);
router.get('/getall', authMiddleware, isAdmin, categoryController.getAll);
router.get('/getbyid/:id', authMiddleware, isAdmin, categoryController.getById);
router.patch('/updatecat/:id', authMiddleware, isAdmin, categoryController.updateCategory);
router.delete('/deletecat/:id', authMiddleware, isAdmin, categoryController.deleteCategory);


export default router;