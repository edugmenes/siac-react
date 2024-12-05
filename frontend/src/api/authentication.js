const backendUrl = "https://siac-api.ddns.net";
const localUrl = "http://localhost:5000"

const apiLogin = async (email, password) => {
  try {
    const response = await fetch(`${localUrl}/auth/login`, {
      method: "POST",
      credentials: 'include', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data: ", data);
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
    const response = await fetch(`${localUrl}/auth/register`, {
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
    console.error("Falha ao cadastrar usuário: ", error);
    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    const response = await fetch(`${localUrl}/update/${userData.idUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao atualizar usuário: ", error);
    throw error;
  }
};

const deleteUser = async (idUser) => {
  try {
    const response = await fetch(`${backendUrl}/user/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idUser }), 
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha ao excluir usuário: ", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const url = `${backendUrl}/users`;

    const response = await fetch(url, {
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
    console.error("Erro ao buscar usuários: ", error);
    return null;
  }
};

const getUsersById = async (userId) => {
  try {
    const url = `${backendUrl}/users/${userId}`;

    const response = await fetch(url, {
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
    console.error("Erro ao buscar usuários: ", error);
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
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar usuários: ", error);
    return null;
  }
};

module.exports = {
  apiLogin,
  apiRegister,
  updateUser,
  getUsersByRole,
  getUsersById,
  deleteUser,
  getUsers,
};
