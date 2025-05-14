"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
    createAt;
    updateAt;
}
exports.User = User;
;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'cliente'),
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'tbUser', // nome exato da tabela criada no banco
    timestamps: false, // se a tabela tem createdAt/updatedAt
    underscored: true, // ou true, se usa snake_case nos campos
});
