import { Model, DataTypes, Association } from 'sequelize';
import { sequelize } from '../config/database';
import { CartItems } from './CartItems';
import { Order } from './Order';

export class User extends Model{
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: 'admin' | 'cliente';

    public static associations: {
        order: Association<User, Order>;
        cartItems: Association<User, CartItems>;
    };

    static associate(models: any){
        User.hasMany(models.Order, {
            foreignKey: 'userId',
            as: 'order'
        });

        User.hasMany(models.CartItems, {
            foreignKey: 'userId',
            as: 'cartItems'
        });        
    };
};

User.init(

    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: true,
            defaultValue: 'cliente',
            validate: {
              isIn: [[ 'admin', 'cliente' ]]
            }
          },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'tbUser', // nome exato da tabela criada no banco
        timestamps: false,   // se a tabela tem createdAt/updatedAt
        underscored: true, // ou true, se usa snake_case nos campos
    }
);