"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
const userController = new UserController_1.UserController();
//Rotas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);
//Rotas privadas
router.get('/profile', authMiddleware_1.default, userController.getProfile);
router.patch('/profile', authMiddleware_1.default, userController.updateProfile);
router.delete('/delete', authMiddleware_1.default, userController.deleteAccout);
exports.default = router;
