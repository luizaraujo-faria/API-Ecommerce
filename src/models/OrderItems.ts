import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { Products } from './Products';
import { Order } from './Order';

export class OrderItems extends Model{
    declare id: number;
    declare orderId: number;
    declare productId: number;
    declare qtd: number;
    declare unitPrice: number;
    declare total: number;

    public static associations: {
        order: Association<OrderItems, Order>;
        products: Association<OrderItems, Products>;
    };

    static associate(models: any){
        OrderItems.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        });

        OrderItems.belongsTo(models.Products, {
            foreignKey: 'productId',
            as: 'product'
        });        
    };
};

OrderItems.init(
        {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'order_id'
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
        unitPrice: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
            field: 'unit_price'
        },
        total: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'OrderItems',
        tableName: 'tbOrder_Items', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);