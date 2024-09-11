const mysql = require('mysql2');
require('dotenv').config();

// Cria a conexão com o pool:
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000,
    queueLimit: 0
});

// Promessa do pool de conexão para uso com async/await
const promisePool = pool.promise();

//  Lidar com sinais de término de processo:
const handleShutdown = () => {
    pool.end((error) => {
        if (error) {
            console.error('Erro ao fechar a conexão pool:', error);
        } else {
            console.log('Conexão pool fechada com sucesso!');
        }
        process.exit(0); // Encerra o processo após fechar a conexão pool.
    });
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

// Testar a conexão (opcional):
const testConnection = async () => {
    try {
        const [rows] = await promisePool.query('SELECT VERSION()');
        console.log('Sucesso ao conectar com banco de dados! Versão MySQL:', rows[0]['VERSION()']);
    } catch (error) {
        console.error('Erro ao conectar com banco de dados:', error);
    }
};

testConnection();

module.exports = promisePool;
