import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './User';
import { OrderItems } from './OrderItems';

export class Order extends Model{
    declare id: number;
    declare userId: number;
    declare totalAmount: number;
    declare status: 'pending' | 'paid' | 'shipped' | 'canceled';

    public static associations: {
        user: Association<Order, User>;
        orderItems: Association<Order, OrderItems>;
    };

    static associate(models: any){
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });

        Order.hasMany(models.OrderItems, {
            foreignKey: 'orderId',
            as: 'orderItems'
        });        
    };
};

Order.init(
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
        totalAmount: {
            type: DataTypes.DECIMAL(8,2),
            allowNull: false,
            field: 'total_amount'
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'shipped', 'canceled'),
            allowNull: true,
            defaultValue: 'pending'
        }
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'tbOrder', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);