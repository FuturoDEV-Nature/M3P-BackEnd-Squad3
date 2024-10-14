const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config');

let connection;
try {
  connection = new Sequelize(databaseConfig);
  console.log('Conexão com o banco de dados estabelecida!');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error.message);
  process.exit(1); // Encerra a aplicação em caso de erro crítico
}

module.exports = { connection };
