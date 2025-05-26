import express from 'express';
import { sequelize } from './config/database';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log('Servidor rodando!');
});

sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados!\n');
    })
    .catch((err) => {
        console.log('Falha ao conectar com o banco!', err);
    });