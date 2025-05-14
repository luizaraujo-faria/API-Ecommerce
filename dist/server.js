"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/users', user_routes_1.default);
app.listen(port, () => {
    console.log('Servidor rodando!');
});
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Conectado ao banco de dados!\n');
})
    .catch((err) => {
    console.log('Falha ao conectar com o banco!', err);
});
