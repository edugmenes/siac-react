const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userAuthModel = require('../models/userAuthModel');

// Função de login:
const userLogin = async (request, response) => {
    const { email, password } = request.body;

    try {
        // Verifique se o usuário existe e email:
        const user = await userAuthModel.getUserByEmail(email);
        if (!user) {
            return response.status(401).json({ message: 'Email não cadastrado!' });
        }
        if (email !== user.email) {
            return response.status(401).json({ message: 'Email incorreto!' });
        }

        // Verifique a senha:
        if (password !== user.password) {
            return response.status(401).json({ message: 'Senha incorreta!' });
        }

        // Buscar perfil e permissões:
        const userPermissions = await userAuthModel.getUserProfileAndPermissions(user.idUser);
        if (!userPermissions || userPermissions.length === 0) {
            return response.status(404).json({ message: 'Perfil ou permissões não encontrados: ' });
        }

        const permissions = userPermissions.map(permissions => permissions.permission);
        const profile = userPermissions[0].perfil;

        // Gerar o token JWT:
        const token = jwt.sign(
            { idUser: user.idUser, userName: user.nome, profile, permissions },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Retorna o token:
        return response.status(200).json({ token });
    } catch (error) {
        console.error('Erro no processo de autenticação: ', error);
        return response.status(500).json({ message: 'Erro no processo de autenticação: ' });
    }
};

// Funções para cadastro de usuário:
const userRegistration = async (request, response) => {

    const { body } = request;
    try {
        await userAuthModel.registerUserData(body)
        return response.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
    } catch (error) {
        if (error.message.includes('Email já cadastrado.')) {
            return response.status(400).json({ message: error.message })
        }

        return response.status(500).json({ message: 'Erro na criação de usuário' })
    }
};

const userAdressRegistration = async (request, response) => {
    const { cep } = request.body;
    console.log(cep);
    try {
        await userAuthModel.registerUserAdress(cep)
        return response.status(200).json(cep)
    } catch (error) {
        response.status(500).json({ message: "Não foi possível cadastrar o endereço.", details: error.message });
    }
}

const getUsers = async (request, response) => {
    try {
        const users = await userAuthModel.getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error); // Log the error for debugging
        response.status(500).json({ message: "Não foi possível buscar usuários", details: error.message });
    }
};

// Função para pegar usuário por id:
const getUsersByRole = async (request, response) => {
    const { id } = request.params; // Extrai o 'id' da URL

    try {
        const users = await userAuthModel.getUsersByRole(id);

        if (!users || users.length === 0) {
            return response.status(404).json({ message: `Nenhum usuário encontrado com o id_perfil: ${id}` });
        }

        response.status(200).json(users);
    } catch (error) {
        response.status(500).json({ message: "Não foi possível buscar usuários com esse perfil", details: error.message });
    }
};

module.exports = {
    userLogin,
    userRegistration,
    userAdressRegistration,
    getUsersByRole,
    getUsers
};