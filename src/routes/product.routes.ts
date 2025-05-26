import express from 'express';
import { ProductController } from '../controllers/ProductController';
import authMiddleware from '../middlewares/authMiddleware';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();
const productController = new ProductController();

//Rotas privadas
router.post('/addproduct', authMiddleware, isAdmin, productController.addProduct);
router.get('/getall', authMiddleware, isAdmin, productController.getAll);
router.get('/getbyid/:id', authMiddleware, isAdmin, productController.getById);
router.patch('/updateproduct/:id', authMiddleware, isAdmin, productController.updateProduct);
router.delete('/deleteproduct/:id', authMiddleware, isAdmin, productController.deleteProduct);

export default router;