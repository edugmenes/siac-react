//const backendUrl = "https://siac-api.ddns.net";
const backendUrl = "http://localhost:5000";

const apiAppointmentScheduling = async (formValues, authToken) => {
  try {
    const response = await fetch(`${backendUrl}/appointment/scheduling`, {
      method: 'PUT',
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

const appointmentRescheduling = async (recordId, formValues, authToken) => {
  try {
    const response = await fetch(`${backendUrl}/appointment/rescheduling/${recordId}`, {
      method: 'PUT',
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

const getAppointmentById = async (recordId) => {
  try {
    const response = await fetch(`${backendUrl}/appointment/get/${recordId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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

const getDatesAvailableToScheduling = async () => {
  try {
    const response = await fetch(`${backendUrl}/appointment/get/available/dates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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

const getProfessionalsForDate = async (idAgendas) => {
  const ids = idAgendas.join(',');

  try {
    const response = await fetch(`${backendUrl}/appointment/get/professionals?ids=${ids}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

const getAvailableHoursToScheduling = async (idAgenda) => {
  try {
    const response = await fetch(`${backendUrl}/appointment/get/hours/${idAgenda}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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
  getAppointmentById,
  getProfessionalsForDate,
  deleteAppointment,
  getDatesAvailableToScheduling,
  getAvailableHoursToScheduling,
  appointmentRescheduling
};
