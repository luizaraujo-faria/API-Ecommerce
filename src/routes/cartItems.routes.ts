import express from 'express';
import { CartItemsController} from '../controllers/CartItemsController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();
const cartItemsController = new CartItemsController();

router.post('/additem', authMiddleware, cartItemsController.addCartItem);
router.get('/getall', authMiddleware, cartItemsController.getAll);

export default router;