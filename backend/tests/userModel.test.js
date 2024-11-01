const {
  getUserByEmail,
  getUserProfileAndPermissions,
  registerUserData,
  updateUser,
  getUsers,
  getUserById,
  getUsersByRole,
} = require("../models/userModel");
const promisePool = require("../config/databaseConfig");

jest.mock("../config/databaseConfig", () => ({
  query: jest.fn(),
}));

describe("getUserByEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o usuário quando o email é encontrado", async () => {
    const mockEmail = "teste@exemplo.com";
    const mockUser = { id: 1, email: mockEmail, name: "Henricao" };

    promisePool.query.mockResolvedValue([[mockUser]]);

    const result = await getUserByEmail(mockEmail);

    expect(result).toEqual(mockUser);
  });

  it("deve retornar undefined quando o usuário não é encontrado", async () => {
    const mockEmail = "email@email.com";

    promisePool.query.mockResolvedValue([[]]);

    const result = await getUserByEmail(mockEmail);

    expect(result).toBeUndefined();
  });

  it("deve lançar um erro quando ocorre uma exceção na query", async () => {
    const mockEmail = "erro@email.com";

    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(getUserByEmail(mockEmail)).rejects.toThrow(
      "Erro ao buscar usuário por email: Erro de conexão"
    );
  });
});

describe("getUserProfileAndPermissions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o perfil e permissões do usuário quando o id é válido", async () => {
    const userId = 1;
    const mockPermissions = [
      { perfil: "Admin", permissao: "Criar" },
      { perfil: "Admin", permissao: "Editar" },
      { perfil: "Admin", permissao: "Excluir" },
    ];

    promisePool.query.mockResolvedValue([mockPermissions]);

    const result = await getUserProfileAndPermissions(userId);

    expect(result).toEqual(mockPermissions);
  });

  it("deve retornar um array vazio quando o usuário não possui perfil ou permissões", async () => {
    const userId = 2;

    promisePool.query.mockResolvedValue([[]]);

    const result = await getUserProfileAndPermissions(userId);

    expect(result).toEqual([]);
  });

  it("deve lançar um erro quando ocorre uma exceção na query", async () => {
    const userId = 3;

    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(getUserProfileAndPermissions(userId)).rejects.toThrow(
      "Erro ao buscar perfil e permissões do usuário: Erro de conexão"
    );
  });
});

describe("registerUserData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve cadastrar o usuário com sucesso quando o email não está cadastrado", async () => {
    const registerFormData = {
      nomeUser: "Joao Mercio",
      email: "joao@email.com",
      perfilLabel: "User",
      perfilId: 1,
      password: "123",
    };

    promisePool.query
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ insertId: 1, affectedRows: 1 }])
      .mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await registerUserData(registerFormData);

    expect(result).toEqual({
      success: true,
      message: "Usuário cadastrado com sucesso!",
      userId: 1,
    });
  });

  it("deve lançar um erro quando o email já está cadastrado", async () => {
    const registerFormData = {
      nomeUser: "Jonas Brother",
      email: "jonas@email.com",
      perfilLabel: "Admin",
      perfilId: 1,
      password: "123",
    };

    promisePool.query.mockResolvedValueOnce([[{}]]);

    await expect(registerUserData(registerFormData)).rejects.toThrow(
      "Email já cadastrado."
    );
  });

  it("deve lançar um erro quando ocorre uma exceção na query", async () => {
    const registerFormData = {
      nomeUser: "Error User",
      email: "erro@email.com",
      perfilLabel: "User",
      perfilId: 3,
      password: "123",
    };

    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(registerUserData(registerFormData)).rejects.toThrow(
      "Erro de conexão"
    );
  });
});

describe("updateUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar o usuário com sucesso quando o usuário existe e o email não está cadastrado por outro usuário", async () => {
    const userData = {
      idUser: 1,
      nome: "Felipe campeao",
      email: "felipao@email.com",
      perfilLabel: "User",
      perfilId: 1,
      celular: "123456789",
      data_nascimento: "1990-01-01",
    };

    promisePool.query
      .mockResolvedValueOnce([[{ idUser: 1 }]])
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ affectedRows: 1 }])
      .mockResolvedValueOnce([{ affectedRows: 1 }]);

    const result = await updateUser(userData);

    expect(result).toEqual({
      success: true,
      message: "Usuário atualizado com sucesso!",
    });
  });

  it("deve lançar um erro quando o usuário não é encontrado", async () => {
    const userData = {
      idUser: 2,
      nome: "Joca Tatu",
      email: "joca@email.com",
      perfilLabel: "Admin",
      perfilId: 1,
      celular: "987654321",
      data_nascimento: "1992-02-02",
    };

    promisePool.query.mockResolvedValueOnce([[]]);

    await expect(updateUser(userData)).rejects.toThrow(
      "Usuário não encontrado."
    );
  });

  it("deve lançar um erro quando o email já está cadastrado por outro usuário", async () => {
    const userData = {
      idUser: 1,
      nome: "Fuleco Brasa",
      email: "fuleco@email.com",
      perfilLabel: "User",
      perfilId: 2,
      celular: "321654987",
      data_nascimento: "1991-03-03",
    };

    promisePool.query
      .mockResolvedValueOnce([[{ idUser: 1 }]])
      .mockResolvedValueOnce([[{}]]);

    await expect(updateUser(userData)).rejects.toThrow(
      "Email já cadastrado por outro usuário."
    );
  });

  it("deve lançar um erro quando ocorre uma exceção na query", async () => {
    const userData = {
      idUser: 1,
      nome: "Error Connection",
      email: "erro@email.com",
      perfilLabel: "User",
      perfilId: 4,
      celular: "789654321",
      data_nascimento: "1994-05-05",
    };

    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    await expect(updateUser(userData)).rejects.toThrow("Erro de conexão");
  });
});

describe("getUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar uma lista de usuários com sucesso", async () => {
    const mockUsers = [
      { idUser: 1, nome: "Zeca Tatu" },
      { idUser: 2, nome: "Bandas" },
    ];

    promisePool.query.mockResolvedValueOnce([mockUsers]);

    const result = await getUsers();

    expect(result).toEqual({
      success: true,
      data: mockUsers,
    });
  });

  it("deve retornar uma mensagem de erro quando não há usuários", async () => {
    promisePool.query.mockResolvedValueOnce([[]]);

    const result = await getUsers();

    expect(result).toEqual({
      success: false,
      message: "Nenhum usuário encontrado",
    });
  });

  it("deve retornar uma mensagem de erro quando ocorre uma exceção", async () => {
    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    const result = await getUsers();

    expect(result).toEqual({
      success: false,
      message: "Erro ao buscar usuários",
      details: "Erro de conexão",
    });
  });
});

describe("getUserById", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o usuário com sucesso quando o id é válido", async () => {
    const mockUser = { idUser: 1, nome: "Marcio Donato" };

    promisePool.query.mockResolvedValueOnce([[mockUser]]);

    const result = await getUserById(1);

    expect(result).toEqual({
      success: true,
      data: mockUser,
    });
  });

  it("deve retornar uma mensagem de erro quando nenhum usuário é encontrado pelo id", async () => {
    promisePool.query.mockResolvedValueOnce([[]]);

    const result = await getUserById(2);

    expect(result).toEqual({
      success: false,
      message: "Nenhum usuário encontrado com esse id",
    });
  });

  it("deve retornar uma mensagem de erro quando ocorre uma exceção", async () => {
    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    const result = await getUserById(1);

    expect(result).toEqual({
      success: false,
      message: "Erro ao buscar usuário",
      details: "Erro de conexão",
    });
  });
});

describe("getUsersByRole", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar usuários por id_perfil com sucesso", async () => {
    const mockUsers = [
      { idUser: 1, nome: "Admin User" },
      { idUser: 2, nome: "Admin" },
    ];

    promisePool.query.mockResolvedValueOnce([mockUsers]);

    const result = await getUsersByRole(1);

    expect(result).toEqual({
      success: true,
      data: mockUsers,
    });
  });

  it("deve retornar uma mensagem de erro quando nenhum usuário é encontrado para o id_perfil", async () => {
    promisePool.query.mockResolvedValueOnce([[]]);

    const result = await getUsersByRole(2);

    expect(result).toEqual({
      success: false,
      message: "Nenhum usuário encontrado com o id_perfil: 2",
    });
  });

  it("deve retornar uma mensagem de erro quando ocorre uma exceção", async () => {
    promisePool.query.mockRejectedValue(new Error("Erro de conexão"));

    const result = await getUsersByRole(1);

    expect(result).toEqual({
      success: false,
      message: "Erro ao buscar usuários",
      details: "Erro de conexão",
    });
  });
});
