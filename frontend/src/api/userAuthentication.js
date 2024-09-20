const backendUrl = "http://localhost:5000";

const apiLogin = async (email, password) => {
  try {
    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`${response.message}${response.status}`);
    }

    const data = await response.json();
    // Armazena JWT no localStorage:
    localStorage.setItem("authToken", data.token);

    return data;
  } catch (error) {
    console.error("Falha no login: ", error);
    throw error;
  }
};

const apiRegister = async (registerFormValues) => {
  try {
    const response = await fetch(`${backendUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerFormValues),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao cadastrar usuário: ", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const url = `${backendUrl}/users`;

    console.log('b')

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
};

const getUsersByRole = async (id) => {
  try {
    const url = `${backendUrl}/user/roleId/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
};

module.exports = {
  apiLogin,
  apiRegister,
  getUsersByRole,
  getUsers
};
