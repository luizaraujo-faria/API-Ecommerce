import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { Products } from './Products';

export class CartItems extends Model{
    declare id: number;
    declare userId: number;
    declare productId: number;
    declare qtd: number;
    declare total: number;
    
    public static associations: {
        user: Association<CartItems, User>;
        products: Association<CartItems, Products>;
    };

    static associate(models: any){
        CartItems.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        CartItems.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'product'
        });
    };
};

CartItems.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'product_id'
        },
        qtd: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: 'CartItems',
        tableName: 'tbCart_Items', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);