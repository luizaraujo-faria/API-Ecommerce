import { Request, Response } from 'express';
import models from '../models/index';

const { CartItems, Products } = models;

export class CartItemsController{

    addCartItem = async (req: Request, res: Response): Promise<void> => {
        const { productId, qtd } = req.body;
        const userId = (req as any).user.userId;

        try{
            const product = await Products.findByPk(productId);
            if(!product){ 
                res.status(404).json({ message: 'Produto não existe!' }); 
                return;
            };

            const existingItem = await CartItems.findOne({ 
                where: { userId, productId },
                include: { model: Products, attributes: ['price'], as: 'product'}
            });

            if(existingItem){
                existingItem.qtd += qtd;
                existingItem.total = existingItem.qtd * product.price;
                await existingItem.save();
                res.json(existingItem);
            }

            const subtotal = qtd * product.price;

            const newItem = await CartItems.create({ userId, productId, qtd, total: subtotal });
            res.status(201).json({ message: 'Produto adicionado com sucesso!', newItem });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao adicionar item!', error: err });
        };
    };

    getAll = async (req: Request, res: Response): Promise<void> => {
        const userId = (req as any).user.userId;

        try{
            const existingItems = await CartItems.findAll({
                where: { userId },
                include: { model: Products, attributes: ['name', 'imageUrl'], as: 'product', },
            });

            if(existingItems.length === 0){
                res.status(404).json({ message: 'Não há itens no carrinho!' });
                return;
            };

            res.status(200).json({ message: 'Itens no carrinho: ', existingItems });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao listar produtos do carrinho!' });
        }
    };
};