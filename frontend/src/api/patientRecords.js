const backendUrl = "http://localhost:5000";

const createPatientRegister = async (registerFormValues) => {
  try {
    const response = await fetch(`${backendUrl}/patient-records/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerFormValues),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao cadastrar prontuario: ", error);
    throw error;
  }
};

const getPatientRecords = async () => {
  console.log("Chegou na API para buscar prontuários");
  try {
    const response = await fetch(`${backendUrl}/patient-records/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao buscar prontuários: ", error);
    throw error;
  }
};

module.exports = {
  getPatientRecords,
  createPatientRegister,
};
