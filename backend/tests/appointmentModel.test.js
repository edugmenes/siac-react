const { registerAgenda, registerHours } = require('../models/appointmentModel'); 
const promisePool = require('../config/databaseConfig'); 

jest.mock("../config/databaseConfig", () => ({
    query: jest.fn(),
  }));

describe("registerAgenda", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve cadastrar a agenda com sucesso", async () => {
    const mockFormValues = {
      date: "2024-10-29",
      dayOfWeek: "Terça-feira",
      professional: 1,
      initialTime: "09:00",
      endTime: "10:00"
    };

    promisePool.query.mockResolvedValueOnce([{ insertId: 123 }]);

    const result = await registerAgenda(mockFormValues);

    expect(result).toEqual({
      success: true,
      message: 'Cadastro de agenda realizado com sucesso!',
      data: { idAgenda: 123 },
      formValues: mockFormValues
    });
  });

  it("deve retornar uma mensagem de erro quando ocorre uma exceção", async () => {
    const mockFormValues = {
      date: "2024-10-29",
      dayOfWeek: "Terça-feira",
      professional: 1,
      initialTime: "09:00",
      endTime: "10:00"
    };

    promisePool.query.mockRejectedValue(new Error("Erro de conexão")); // Simula erro na query

    const result = await registerAgenda(mockFormValues);

    expect(result).toEqual({
      success: false,
      message: "Erro ao simular cadastro de agenda",
      details: "Erro de conexão"
    });
  });
});

describe("registerHours", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it("deve cadastrar o horário com sucesso", async () => {
    const mockFormValues = {
      professional: 1,
      initialTime: "09:00"
    };
    const mockIdUser = 1;
    const mockIdAgenda = 123;

    promisePool.query.mockResolvedValueOnce([{}]); // Mockando a resposta da query

    const result = await registerHours(mockFormValues, mockIdUser, mockIdAgenda);

    expect(result).toEqual({
      success: true,
      message: 'Dados de horário cadastrados no banco!',
      result: {}
    });
  });

  it("deve retornar uma mensagem de erro quando ocorre uma exceção", async () => {
    const mockFormValues = {
      professional: 1,
      initialTime: "09:00"
    };
    const mockIdUser = 1;
    const mockIdAgenda = 123;

    promisePool.query.mockRejectedValue(new Error("Erro de conexão")); // Simula erro na query

    const result = await registerHours(mockFormValues, mockIdUser, mockIdAgenda);

    expect(result).toEqual({
      success: false,
      message: "Erro ao cadastrar horários:",
      details: "Erro de conexão"
    });
  });
});
