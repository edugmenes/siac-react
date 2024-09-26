// const promisePool = require('../config/databaseConfig');

// const registerAgenda = async (id) => {
//     try {
//         const [users] = await promisePool.query(
//             `SELECT * FROM usuario WHERE id_perfil = ?`, [id]  // Prevenção contra SQL Injection
//         );

//         if (users.length === 0) {
//             return { success: false, message: `Nenhum usuário encontrado com o id_perfil: ${id}` };
//         }

//         return { success: true, data: users };  // Retorna os usuários se encontrados
//     } catch (error) {
//         console.error("Erro ao buscar usuários:", error);
//         return { success: false, message: "Erro ao buscar usuários", details: error.message };
//     }
// };

// const registerHours = async (id) => {
//     try {
//         const [users] = await promisePool.query(
//             `SELECT * FROM usuario WHERE id_perfil = ?`, [id]  // Prevenção contra SQL Injection
//         );

//         if (users.length === 0) {
//             return { success: false, message: `Nenhum usuário encontrado com o id_perfil: ${id}` };
//         }

//         return { success: true, data: users };  // Retorna os usuários se encontrados
//     } catch (error) {
//         console.error("Erro ao buscar usuários:", error);
//         return { success: false, message: "Erro ao buscar usuários", details: error.message };
//     }
// };