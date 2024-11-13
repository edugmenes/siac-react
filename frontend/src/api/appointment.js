const backendUrl = "https://siac-api.ddns.net";

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
    //console.log('Chegou na API')
    const url = `${backendUrl}/appointment/get`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica se a resposta é bem-sucedida (status 200-299)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json(); // Extrai os dados da resposta
    //console.log('Dados recebidos da controller:', data); // Loga os dados recebidos
    return data;
  } catch (error) {
    console.error("Erro ao buscar consultas: ", error);
    return null;
  }
};

const deleteAppointment = async (idHorario) => {
  try {
    const response = await fetch(`${backendUrl}/appointment/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idHorario }), 
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao excluir consulta: ", error);
    throw error;
  }
};


module.exports = {
  apiAppointmentScheduling,
  getAppointments,
  deleteAppointment
};