import {Sequelize } from "sequelize";

const db = new Sequelize('petshop', 'developer', 'moninha', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
});

/*async function testarConexao() {
    try {
      await db.authenticate();
      console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }
  
  testarConexao();*/

export default db;