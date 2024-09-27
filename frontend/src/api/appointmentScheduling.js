const backendUrl = "http://localhost:5000";

debugger;
const apiAppointmentScheduling = async (formValues, authToken) => {
    try {
        const response = await fetch(`${backendUrl}/appointment/scheduling`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
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
    apiAppointmentScheduling
};