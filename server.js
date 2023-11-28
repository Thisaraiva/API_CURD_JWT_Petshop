import express from "express";
import cors from 'cors';
import db from './config/database.js';
//import autenticacaoRoutes from './autenticacao.js'


const server = express();
server.use(express.json());
server.use(cors());

import tutorRoutes from './routes/tutor_routes.js';
server.use('/api', tutorRoutes);

import petRoutes from './routes/pet_routes.js';
server.use('/api', petRoutes);

import autenticacaoRoutes from './autenticacao.js'
server.use('/api', autenticacaoRoutes);

/*server.use((req, res, next) => {
    console.log(`Recebida requisição: ${req.method} ${req.url}`);
    next();
});*/

//Conexão com o banco de dados
try {
    await db.authenticate();
    console.log("Conexao com o MySQL estabelecida");
} catch (error) {
    console.error('Conexao com o MySQL NAO estabelecida: ', error);
}

server.listen(3000, () => console.log("Server ON em http://localhost:3000"));