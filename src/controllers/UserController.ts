import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index'
import dotenv from 'dotenv';

dotenv.config();
const { User } = models;
export class UserController{

    registerUser = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password} = req.body;

        try{
            const existingUser = await User.findOne({ where: {email} });
            if(existingUser){ return res.status(400).json({ message: 'Email já cadastrado!'}) };

            if(!email.includes('@')){
                return res.status(400).json({ message: 'Email inválido! seu email deve conter @'})   
            };

            if(password.length < 8){
                return res.status(400).json({ message: 'Senha deve conter no mínimo 8 caractéres!'});
            };

            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({ name, email, password: hashPassword });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', 
                user: {id: user.id, name: user.name, email: user.email} 
            });
        }
        catch(err){
            console.error('Falha ao cadastrar usuário!');
            return res.status(500).json({ message: 'Falha ao cadastrar usuário!', error: err instanceof Error ? err.message : String(err) });
        };
    };

    registerAdmin = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, password, role } = req.body;

        try{
            const existingUser = await User.findOne({ where: {email} });
            if(existingUser){ return res.status(400).json({ message: 'Email já cadastrado!'}) };

            if(!email.includes('@')){
                return res.status(400).json({ message: 'Email inválido! seu email deve conter @'})   
            };

            if(password.length < 8){
                return res.status(400).json({ message: 'Senha deve conter no mínimo 8 caractéres!'});
            };

            const hashPassword = await bcrypt.hash(password, 10);

            let finalRole = 'cliente';

            const loggedUserId = (req as any).user?.userId;
            if(loggedUserId){ 
                const loggedUser = await User.findByPk(loggedUserId);
                if(loggedUser && loggedUser.role === 'admin' && role){
                    finalRole = role;
                };
            };

            const user = await User.create({ name, email, password: hashPassword, role: finalRole });

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!', 
                user: {id: user.id, name: user.name, email: user.email, role: user.role} 
            });
        }
        catch(err){
            console.error('Falha ao cadastrar admin', err);
            return res.status(500).json({ message: 'falha ao cadastrar admin!' });
        };
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        try{
            const user = await User.findOne({ where: {email} });
            if(!user){ return res.status(400).json({ message: 'Usuário não encontrado!' })};

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){ return res.status(400).json({ message: 'Senha incorreta!' })};

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {expiresIn: '1d' });

            return res.status(200).json({ message: 'Login realizado com sucesso!', token });
        }
        catch(err){
            console.error('Falha ao fazer login!');
            return res.status(500).json({ message: 'Falha ao fazer login!', error: err instanceof Error ? err.message : String(err) });
        };
    };

    getProfile = async (req: Request, res: Response): Promise<Response> => {
        const userId = (req as any).user.userId;

        try{
            const user = await User.findByPk(userId, { attributes: { exclude: ['senha']} });

            if(!user){
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            };

            return res.status(200).json({ message: 'Usuário carregado', user });
        }
        catch(err){
            console.error('Falha ao carregar perfil!', err);
            return res.status(500).json({ message: 'Falha ao carregar perfil!' })
        };
    };

    updateProfile = async (req: Request, res: Response): Promise<Response> => {
        const userId = (req as any).user.userId;
        const {name, email, password} = req.body;

        if(!name && !email && !password){
            return res.status(400).json({ message: 'Pelo menos um campo deve ser informado!' });
        };

        try{
            const user = await User.findByPk(userId);

            if(!user){
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            };

            if(name){
                user.name = name;
            };

            if(email){

                const existingUser = await User.findOne({ where: {email} });
                if(existingUser){ return res.status(400).json({ message: 'Email indisponível!'}) };

                if(!email.includes('@')){
                    return res.status(400).json({ message: 'Email inválido! seu email deve conter @'})   
                };

                user.email = email;
            }

            if(password){
                if(password.length < 8){
                    return res.status(400).json({ message: 'Senha deve conter no mínimo 8 caractéres!'});
                };

                const hashPassword = await bcrypt.hash(password, 10);
                user.password = hashPassword;
            }

            await user.save();

            return res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
        }
        catch(err){
            console.error('Falha ao atualizar dados!', err);
            return res.status(401).json({ message: 'Falha ao atualizar dados!' });
        };
    };

    deleteAccout = async (req: Request, res: Response): Promise<Response> => {
        const userId = (req as any).user.userId;

        try{
            const user = await User.destroy({ where: {id: userId} });

            if(user === 0){
                return res.status(404).json({ message: 'Usuário não encontrado!' });
            }
            
            return res.status(204).send();
        }
        catch(err){
            console.error('Falha ao deletar perfil!', err);
            return res.status(500).json({ message: 'Falha ao deletar perfil!' });
        };
    };
};