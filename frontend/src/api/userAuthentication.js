const backendUrl = 'http://localhost:5000';

const apiLogin = async (email, password) => {
    try {
        const response = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`${response.message}${response.status}`);
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
            const errorData = await response.json();
            const errorMessage = errorData.message ||
                `Erro ao cadastrar usuário. Status: ${response.status}`;
            throw new Error(errorMessage);
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
