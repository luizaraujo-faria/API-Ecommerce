import express from 'express';
import { sequelize } from './config/database';
import router from './routes/index.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router)

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