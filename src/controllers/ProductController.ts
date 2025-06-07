import { Request, Response } from 'express';
import models from '../models/index';
import { CategoryController } from './CategoryController';

const { Products, Categories } = models;

export class ProductController{

    addProduct = async (req: Request, res: Response): Promise<void> => {
        const { name, description, price, stock, categoryId} = req.body;

            if(!name || !description || price == null || stock == null || !categoryId){
                res.status(400).json({ message: 'Todos os campos devem ser preenchidos!' }); 
                return;
            };

            if(name.length > 225 || description.length > 225){
                res.status(400).json({ message: 'Nome e ou descrição excede o limite de caracteres!' });
                return;
            };

            if(typeof price !== 'number' || price < 0){ 
                res.status(400).json({ message: 'Preço inválido!' });
                return; 
            };

            if(!Number.isInteger(stock) || stock < 0){ 
                res.status(400).json({ message: 'Valor de estoque inválido!' });
                return;
            }

            const existingProduct = await Products.findOne({ where: {name} });
            if(existingProduct){ 
                res.status(400).json({ message: 'Produto já adicionado!' });
                return; 
            };
            
            const formattedPrice = parseFloat(price.toFixed(2));

        try{
            const product = await Products.create({ name, description, price: formattedPrice, stock, categoryId });

            res.status(201).json({ message: 'Produto adicionado com sucesso!', 
                product: {id: product.id, name: product.name, desc: product.description, 
                    price: product.price, stock: product.stock, category: product.categoryId}
            });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao adicionar produto!' });
        };
    };

    getAll = async (req: Request, res: Response): Promise<void> => {

        try{
            const product = await Products.findAll({ include: { model: Categories, attributes: ['category'], as: 'category'} });
            if(product.length === 0){ 
                res.status(404).json({ message: 'Nenhum produto encontrado!' }); 
                return;
            };

            res.status(200).json({ message: 'Produtos carrgados com sucesso!', product });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'falha ao buscar produtos!' });
        };
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const productId = req.params.id;

        try{
            const product = await Products.findByPk(productId, { include: { model: Categories, attributes: ['category'], as: 'category'} });
            if(!product){ 
                res.status(404).json({ message: 'Produto não encontrado!' }); 
                return;
            };

            res.status(200).json({ message: 'Produto encontrado com sucesso!', product });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao buscar produto!' });
        };
    };

    updateProduct = async (req: Request, res: Response): Promise<void> => {
        const productId = req.params.id;
        const { name, description, price, stock, categoryId } = req.body;

        if(!name && !description && !price && !stock && !categoryId){
            res.status(400).json({ message: 'Ao menos um campo deve ser fornecido!' });
        };

        try{
            const product = await Products.findByPk(productId);
            if(!product){ 
                res.status(404).json({ message: 'Produto não encontrado!' });
                return; 
            };

            if(name){ product.name = name; };
            if(description){ product.description = description; };
            if(price){ product.price = price; };
            if(stock){ product.stock = stock; };
            if(categoryId){ product.categoryId = categoryId; };

            await product.save();
            res.status(200).json({ message: 'Produto atualizado com sucesso!', product });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao atualizar produto!' });
        };
    };

    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        const productId = req.params.id;

        try{
            const product = await Products.destroy({ where: { id: productId } });
            if(product === 0){ 
                res.status(404).json({ message: 'Produto não encontrado!' }); 
                return;
            };

            res.status(204).send();
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Falha ao deletar produto!' });
        };
    };
};