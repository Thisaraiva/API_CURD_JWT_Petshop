// autenticacao.js
import { config } from 'dotenv-safe';
config();
import jwt from 'jsonwebtoken';
import express from 'express';

import http from 'http';
const autenticacao = express();
const app = express();

autenticacao.use(express.json());

autenticacao.get('/', (req, res, next) => {
    res.json({ message: "Servidor base '/' funcionando" });
});

autenticacao.get('/exemplo', verifyJWT, (req, res, next) => {
    console.log("Retorno do exemplo 'mockado' ....");
    res.json([{ id: 1, nome: 'camargo' }]);
});

autenticacao.post('/login', (req, res, next) => {
    // Esse teste abaixo deve ser feito no seu banco de dados
    if ((req.body.user === 'camargo') && (req.body.pwd === '123')) {
        // Auth ok
        const id = 1; // Esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // Expires in 5min
        });
        return res.json({ auth: true, token: token });
    }
    res.status(500).json({ message: 'Login inválido!' });
});

autenticacao.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
});

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Não há token' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Erro com a Autenticação do Token' })

        // Se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    })
}

const server = http.createServer(app); 
export default autenticacao;