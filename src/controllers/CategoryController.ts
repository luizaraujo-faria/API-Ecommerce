import { Request, Response } from "express";
import models from '../models/index';

const { Categories } = models;

export class CategoryController{

    create = async (req: Request, res: Response): Promise<void> => {
        const { category, description } = req.body;

        try{
            const existingCategory = await Categories.findOne({ where: {category} });
            if(existingCategory){ 
                res.status(400).json({ message: 'Categoria já registrada!' });
                return; 
            };

            const categories = await Categories.create({ category, description });
            res.status(201).json({ message: 'Categoria criada com sucesso!',
                category: {id: categories.id, categoria: categories.category, descricao: categories.description }
             });
        }
        catch(err){
            console.error('Falha ao criar categoria!', err);
            res.status(500).json({ message: 'Falha ao criar categoria!', });
        };
    };

    getAll = async (req: Request, res: Response): Promise<void> => {

        try{
            const categories = await Categories.findAll();
            if(categories.length === 0){ 
                res.status(404).json({ message: 'Nenhuma categoria encontrada!' }); 
                return;
            };
            
            res.status(200).json({ message: 'Categorias carregadas com sucesso!', categories });
        }
        catch(err){
            console.error('Falha ao buscar categorias!', err);
            
            res.status(500).json({ message: 'Falha ao buscar categorias!' });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;

        try{
            const categories = await Categories.findByPk(categoryId);
            if(!categories){ 
                res.status(404).json({ message: 'Categoria não encontrada!' }); 
                return;
            };
            
            res.status(200).json({ message: 'Categorias retornadas com sucesso!', categories });
        }
        catch(err){
            console.error('Falha ao buscar categoria!', err);
            
            res.status(500).json({ message: 'Falha ao retornar categorias!' });
        };
    };

    updateCategory = async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;
        const { category, description } = req.body;

        if(!category && !description){
            res.status(400).json({ message: 'Ao menos um campo deve ser informado!' });
            return;
        }

        try{
            const categories = await Categories.findByPk(categoryId);
            if(!categories){ 
                res.status(404).json({ message: 'Categoria não encontrada!' }); 
                return;
            };

            if(categories){ categories.category = category; };
            if(description){ categories.description = description; };

            await categories.save();
            res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
        }
        catch(err){
            console.error('Falha ao atualizar categoria!', err);
            res.status(500).json({ message: 'Falha ao atualizar categoria!' });
        };
    };

    deleteCategory = async (req: Request, res: Response): Promise<void> => {
        const categoryId = req.params.id;

        try{
            const categories = await Categories.destroy({ where: {id: categoryId} });

            if(categories === 0){ 
                res.status(404).json({ message: 'Categoria não encontrada!' }); 
                return;
            };

            res.status(204).send();
        }
        catch(err){
            console.error('Falha ao deletar categoria!', err);
            res.status(500).json({ message: 'Falha ao deletar categoria!' });
        };
    };
};