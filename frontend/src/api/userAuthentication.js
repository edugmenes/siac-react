const backendUrl = 'http://localhost:5000';

const apiLogin = async (email, password) => {
    try {
        const response = await fetch(`${backendUrl}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Erro no processo de autenticação. Status: ${response.status}`);
        }

        const data = await response.json();
        // Armazena JWT no localStorage:
        localStorage.setItem('authToken', data.token);

        return data;
    } catch (error) {
        console.error('Falha no login: ', error);
        throw error;
    }
};

const apiRegister = async (registerFormValues) => {
    try {
        const response = await fetch(`${backendUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerFormValues),
        });

        if (!response.ok) {
            throw new Error(`Erro ao cadastrar usuário. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Falha ao cadastrar usuário: ', error);
        throw error;
    }
};


module.exports = {
    apiLogin,
    apiRegister
};
