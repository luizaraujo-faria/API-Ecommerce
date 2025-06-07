import { Request, Response, NextFunction } from 'express';
import models from '../models/index';

const { User } = models;

const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = (req as any).user?.userId;

    if(!userId){
        res.status(401).json({ message: 'Usuário não autenticado!' });
        return;
    };

    try{
        const user = await User.findByPk(userId);

        if(!user){
            res.status(404).json({ message: 'Usuário não encontrado!' });
            return;
        };

        if(user.role !== 'admin'){
            res.status(403).json({ message: 'Acesso restrito à administradores!' });
            return;
        };

        next();
    }
    catch(err){
        res.status(500).json({ message: 'Falha ao verificar permissão!', error: err });
    };
};

export default isAdmin;