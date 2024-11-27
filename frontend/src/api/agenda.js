//const backendUrl = "https://siac-api.ddns.net";
const backendUrl = "http://localhost:5000";

//debugger;
const apiAgendaCreation = async (agendas, authToken) => {
    try {
        const response = await fetch(`${backendUrl}/agenda/creation`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ agendas }),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao agendar consulta:', error);
    }
}

module.exports = {
    apiAgendaCreation
};