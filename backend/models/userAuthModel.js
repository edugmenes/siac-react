const promisePool = require('../config/databaseConfig');

// Captura usuário por email:
const getUserByEmail = async (email) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM usuario WHERE email = ?',
            [email]
        );

        return rows[0];
    } catch (error) {
        console.log('Erro ao buscar usuário por email: ', error);
        throw new Error('Erro ao buscar usuário por email: ' + error.message);
    }
};

// Captura o perfil e as permissões associadas ao perfil do usuário:
const getUserProfileAndPermissions = async (idUser) => {
    try {
        const [rows] = await promisePool.query(
            `SELECT p.tipo as perfil, perm.nome as permissao 
             FROM usuario_perfil up 
             JOIN perfil p ON up.id_perfil = p.id 
             JOIN perfil_permissao pp ON p.id = pp.id_perfil 
             JOIN permissao perm ON pp.id_permissao = perm.id 
             WHERE up.id_usuario = ?`,
            [idUser]
        );

        return rows;
    } catch (error) {
        console.log('Erro ao buscar perfil e permissões do usuário: ', error);
        throw new Error('Erro ao buscar perfil e permissões do usuário: ' + error.message);
    }
};

module.exports = {
    getUserByEmail,
    getUserProfileAndPermissions
};