import { Request, Response } from "express";
import models from '../models/index';

const { Categories } = models;

export class CategoryController{

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, description } = req.body;

        try{
            const existingCategory = await Categories.findOne({ where: {name} });
            if(existingCategory){ return res.status(400).json({ message: 'Categoria já registrada!' }); };

            const category = await Categories.create({ name, description });
            return res.status(201).json({ message: 'Categoria criada com sucesso!',
                category: {id: category.id, nome: category.name, descricao: category.description }
             });
        }
        catch(err){
            console.error('Falha ao criar categoria!', err);
            return res.status(500).json({ message: 'Falha ao criar categoria!', });
        };
    };

    getAll = async (req: Request, res: Response): Promise<Response> => {

        try{
            const category = await Categories.findAll();
            if(category.length === 0){ return res.status(404).json({ message: 'Nenhuma categoria encontrada!' }); };

            return res.status(200).json({ message: 'Categorias carregadas com sucesso!', category });
        }
        catch(err){
            console.error('Falha ao buscar categorias!', err);
            return res.status(500).json({ message: 'Falha ao buscar categorias!' });
        }
    };

    getById = async (req: Request, res: Response): Promise<Response> => {
        const categoryId = req.params.id;

        try{
            const category = await Categories.findByPk(categoryId);
            if(!category){ return res.status(404).json({ message: 'Categoria não encontrada!' }); };

            return res.status(200).json({ message: 'Categorias retornadas com sucesso!', category });
        }
        catch(err){
            console.error('Falha ao buscar categoria!', err);
            return res.status(500).json({ message: 'Falha ao retornar categorias!' });
        };
    };

    updateCategory = async (req: Request, res: Response): Promise<Response> => {
        const categoryId = req.params.id;
        const { name, description } = req.body;

        if(!name && !description){
            return res.status(400).json({ message: 'Ao menos um campo deve ser informado!' });
        }

        try{
            const category = await Categories.findByPk(categoryId);
            if(!category){ return res.status(404).json({ message: 'Categoria não encontrada!' }); };

            if(name){ category.name = name; };
            if(description){ category.description = description; };

            await category.save();
            return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
        }
        catch(err){
            console.error('Falha ao atualizar categoria!', err);
            return res.status(500).json({ message: 'Falha ao atualizar categoria!' });
        };
    };

    deleteCategory = async (req: Request, res: Response): Promise<Response> => {
        const categoryId = req.params.id;

        try{
            const category = await Categories.destroy({ where: {id: categoryId} });

            if(category === 0){ return res.status(404).json({ message: 'Categoria não encontrada!' }); };

            return res.status(204).send();
        }
        catch(err){
            console.error('Falha ao deletar categoria!', err);
            return res.status(500).json({ message: 'Falha ao deletar categoria!' });
        };
    };
};