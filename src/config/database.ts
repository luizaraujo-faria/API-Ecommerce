import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(process.env.NAME_DATABASE!, process.env.USER_NAME!, process.env.USER_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});