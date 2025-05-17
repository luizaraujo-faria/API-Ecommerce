import { Request, Response, NextFunction } from 'express';
import models from '../models/index';

const { User } = models;

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.userId;

    if(!userId){
        return res.status(401).json({ message: 'Usuário não autenticado!' });
    };

    try{
        const user = await User.findByPk(userId);

        if(!user){
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        };

        if(user.role !== 'admin'){
            return res.status(403).json({ message: 'Acesso restrito à administradores!' });
        };

        next();
    }
    catch(err){
        return res.status(500).json({ message: 'Falha ao verificar permissão!', error: err });
    };
};

export default isAdmin;