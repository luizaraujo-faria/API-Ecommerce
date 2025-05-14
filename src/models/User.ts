import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class User extends Model{
    declare id: number;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare role: 'admin' | 'cliente';

    public readonly createAt!: Date;
    public readonly updateAt!: Date;
};

User.init(

    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          nome: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          senha: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          role: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: true,
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