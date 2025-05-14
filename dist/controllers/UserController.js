"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    register = async (req, res) => {
        const { nome, email, senha } = req.body;
        try {
            const existingUser = await User_1.User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email já cadastrado!' });
            }
            ;
            if (!email.includes('@')) {
                return res.status(400).json({ message: 'Email inválido! seu email deve conter @' });
            }
            ;
            if (senha.length < 8) {
                return res.status(400).json({ message: 'Senha deve conter no mínimo 8 caractéres!' });
            }
            ;
            const hashPassword = await bcrypt_1.default.hash(senha, 10);
            const user = await User_1.User.create({ nome, email, senha: hashPassword });
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!',
                user: { id: user.id, nome: user.nome, email: user.email }
            });
        }
        catch (err) {
            console.error('Falha ao cadastrar usuário!');
            return res.status(500).json({ message: 'Falha ao cadastrar usuário!', error: err instanceof Error ? err.message : String(err) });
        }
        ;
    };
    login = async (req, res) => {
        const { email, senha } = req.body;
        try {
            const user = await User_1.User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Usuário não encontrado!' });
            }
            ;
            const isMatch = await bcrypt_1.default.compare(senha, user.senha);
            if (!isMatch) {
                return res.status(400).json({ message: 'Senha incorreta!' });
            }
            ;
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.status(200).json({ message: 'Login realizado com sucesso!', token });
        }
        catch (err) {
            console.error('Falha ao fazer login!');
            return res.status(500).json({ message: 'Falha ao fazer login!', error: err instanceof Error ? err.message : String(err) });
        }
        ;
    };
    getProfile = async (req, res) => {
        const userId = req.user.userId;
        try {
            const user = await User_1.User.findByPk(userId, { attributes: { exclude: ['senha'] } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
            ;
            return res.status(200).json({ message: 'Usuário carregado', user });
        }
        catch (err) {
            console.error('Falha ao carregar perfil!', err);
            return res.status(500).json({ message: 'Falha ao carregar perfil!' });
        }
        ;
    };
    updateProfile = async (req, res) => {
        const userId = req.user.userId;
        const { nome, email, senha } = req.body;
        if (!nome && !email && !senha) {
            return res.status(400).json({ message: 'Pelo menos um campo deve ser informado!' });
        }
        ;
        try {
            const user = await User_1.User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
            ;
            if (nome) {
                user.nome = nome;
            }
            ;
            if (email) {
                const existingUser = await User_1.User.findOne({ where: { email } });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email indisponível!' });
                }
                ;
                if (!email.includes('@')) {
                    return res.status(400).json({ message: 'Email inválido! seu email deve conter @' });
                }
                ;
                user.email = email;
            }
            if (senha) {
                if (senha.length < 8) {
                    return res.status(400).json({ message: 'Senha deve conter no mínimo 8 caractéres!' });
                }
                ;
                const hashPassword = await bcrypt_1.default.hash(senha, 10);
                user.senha = hashPassword;
            }
            await user.save();
            return res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
        }
        catch (err) {
            console.error('Falha ao atualizar dados!', err);
            return res.status(401).json({ message: 'Falha ao atualizar dados!' });
        }
        ;
    };
    deleteAccout = async (req, res) => {
        const userId = req.user.userId;
        try {
            const user = await User_1.User.destroy({ where: { id: userId } });
            if (user === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
            return res.status(204).send();
        }
        catch (err) {
            console.error('Falha ao deletar perfil!', err);
            return res.status(500).json({ message: 'Falha ao deletar perfil!' });
        }
        ;
    };
}
exports.UserController = UserController;
;
