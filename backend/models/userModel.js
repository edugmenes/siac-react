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

// Cadastra usuário no banco de dados:
const registerUserData = async (registerFormData) => {
    const { nomeUser, email, perfilLabel, perfilId, password } = registerFormData;

    try {
        const [existingUser] = await promisePool.query(
            `SELECT * FROM usuario WHERE email = ?`,
            [email]
        );

        if (existingUser.length > 0) {
            throw new Error('Email já cadastrado.');
        }

        const [result] = await promisePool.query(
            `INSERT INTO usuario (nome, email, password, perfil, id_perfil) VALUES (?, ?, ?, ?, ?)`,
            [nomeUser, email, password, perfilLabel, perfilId]
        );

        const [usuarioPerfil] = await promisePool.query(
            `INSERT INTO usuario_perfil (id_usuario, id_perfil) VALUES (?, ?)`,
            [result.insertId, perfilId]
        );

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: 'Usuário cadastrado com sucesso!',
                userId: result.insertId
            };
        } else {
            throw new Error('Falha ao cadastrar o usuário.');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const updateUser = async (userData) => {
  const {
    idUser,
    nome,
    email,
    perfilLabel,
    perfilId,
    celular,
    data_nascimento,
  } = userData;

  try {
    const [existingUser] = await promisePool.query(
      `SELECT * FROM usuario WHERE idUser = ?`,
      [idUser]
    );

    if (existingUser.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    const [emailUser] = await promisePool.query(
      `SELECT * FROM usuario WHERE email = ? AND idUser != ?`,
      [email, idUser]
    );

    if (emailUser.length > 0) {
      throw new Error("Email já cadastrado por outro usuário.");
    }

    const [result] = await promisePool.query(
      `UPDATE usuario SET nome = ?, email = ?, perfil = ?, id_perfil = ?, celular = ?, data_nascimento = ? WHERE idUser = ?`,
      [nome, email, perfilLabel, perfilId, celular, data_nascimento, idUser]
    );

    const [updatePerfil] = await promisePool.query(
      `UPDATE usuario_perfil SET id_perfil = ? WHERE id_usuario = ?`,
      [perfilId, idUser]
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Usuário atualizado com sucesso!",
      };
    } else {
      throw new Error("Falha ao atualizar o usuário.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUsers = async () => {
    try {
        const [users] = await promisePool.query(
            `SELECT * FROM usuario WHERE deletedAt is null`
        );

        if (users.length === 0) {
            return { success: false, message: `Nenhum usuário encontrado` };
        }

        return { success: true, data: users };
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return { success: false, message: "Erro ao buscar usuários", details: error.message };
    }
};

const getUserById = async (userId) => {
    try {
        const [user] = await promisePool.query(
            `SELECT * FROM usuario WHERE idUser = ?`, [userId]
        );

        if (user.length === 0) {
            return { success: false, message: `Nenhum usuário encontrado com esse id` };
        }

        return { success: true, data: user[0] };
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return { success: false, message: "Erro ao buscar usuário", details: error.message };
    }
};

const getUsersByRole = async (id) => {
    try {
        const [users] = await promisePool.query(
            `SELECT * FROM usuario WHERE id_perfil = ?`, [id]  // Prevenção contra SQL Injection
        );

        if (users.length === 0) {
            return { success: false, message: `Nenhum usuário encontrado com o id_perfil: ${id}` };
        }

        return { success: true, data: users };  // Retorna os usuários se encontrados
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return { success: false, message: "Erro ao buscar usuários", details: error.message };
    }
};

module.exports = {
    getUserByEmail,
    getUserProfileAndPermissions,
    registerUserData,
    updateUser,
    getUsersByRole,
    getUserById,
    getUsers
};