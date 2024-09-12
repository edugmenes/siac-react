const backendUrl = 'http://localhost:5000';

const apiRegister = async (registerFormValues) => {
    try {
        console.log(registerFormValues);
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
    apiRegister
};
