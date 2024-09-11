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
            throw new Error(`Erro no processo de autenticação. Status: ${response.status}`);
        }

        const data = await response.json();
        // Armazena JWT no localStorage:
        localStorage.setItem('authToken', data.token);

        return data;
    } catch (error) {
        console.error('Falha no login:', error);
        throw error;
    }
};

module.exports = {
    apiLogin
};
