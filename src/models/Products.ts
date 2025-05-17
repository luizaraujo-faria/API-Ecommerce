import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { Categories } from './Categories';
import { OrderItems } from './OrderItems';
import { CartItems } from './CartItems';

export class Products extends Model{
    declare id: number;
    declare name: string;
    declare description: string;
    declare price: number;
    declare imageUrl: string;
    declare stock: number;
    declare categoryId: number;

    public static associations: {
        category: Association<Products, Categories>;
        orderItems: Association<Products, OrderItems>;
        cartItems: Association<Products, CartItems>;
    };

    static associate(models: any){
        Products.belongsTo(models.Categories, {
            foreignKey: 'categoryId',
            as: 'category'
        });

        Products.hasMany(models.OrderItems, {
            foreignKey: 'productId',
            as: 'orderItems'
        });

        Products.hasMany(models.CartItems, {
            foreignKey: 'productId',
            as: 'cartItems'
        });
    };
};

Products.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'category_id'
        }
    },
    {
        sequelize,
        modelName: 'Products',
        tableName: 'tbProducts', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);