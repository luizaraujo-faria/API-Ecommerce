import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ message: 'Token não fornecido!' })
    };
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        (req as any).user = decoded;
        next();
    }
    catch(err){
        console.error('Autenticação falhou!', err);
        return res.status(500).json({ message: 'Falha ao realizar autenticação!' })
    };
};

export default authMiddleware;