import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { Products } from './Products';

export class Categories extends Model{
    declare id: number;
    declare name: string;
    declare description: string;

    public static associations: {
        products: Association<Categories, Products>;
    };

    static associate(models: any){
        Categories.hasMany(models.Products, {
            foreignKey: 'categoryId',
            as: 'products'
        });
    };
};

Categories.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Categories',
        tableName: 'tbCategories', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);