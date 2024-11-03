const backendUrl = "http://localhost:5000";

//debugger;
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

const getAppointments = async () => {
  try {
    console.log('3')
    const url = `${backendUrl}/appointment/get`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('response', response)

    // const data = await response.json();
    // return data
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    return null;
  }
};

module.exports = {
    apiAppointmentScheduling,
    getAppointments
};