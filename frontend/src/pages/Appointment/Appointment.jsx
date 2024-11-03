import { Button, Row, Table, Typography } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getAppointments } from "../../api/appointment";

const Appointment = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/appointments/schedule");
  };

  const fetchAppointments = async () => {
    try {
      console.log("2");
      const response = await getAppointments();
      console.log("response", response);
    } catch (error) {
      console.error("Erro ao buscar compromissos:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []); // Array vazio para executar apenas na montagem

  const mockedData = [
    {
      id: 211010201,
      date: "15/08/2024",
      time: "10:00",
      professional: "Henrique",
      status: "Encerrado",
      key: 2, // Adicione uma key única, que pode ser o mesmo valor do id
    },
    {
      id: 367534352,
      date: "20/10/2024",
      time: "12:00",
      professional: "Raul",
      status: "Agendado",
      key: 1, // Adicione uma key única
    },
    {
      id: 53213231231,
      date: "22/10/2024",
      time: "11:30",
      professional: "Felipe",
      status: "Agendado",
      key: 3, // Adicione uma key única
    },
    {
      id: 1231231241,
      date: "30/10/2024",
      time: "17:00",
      professional: "Edu",
      status: "Agendado",
      key: 4, // Adicione uma key única
    },
  ];

  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Horário",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Profissional",
      dataIndex: "professional",
      key: "professional",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button
          size="large"
          type="link"
          onClick={() => navigate(`/appointments/schedule/${record.id}`)}
        >
          <EditOutlined style={{ fontSize: "18px" }} />
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "40px" }}
      >
        <Typography.Title level={2}>Consultas</Typography.Title>
        <Button type="link" size="large" onClick={handleClick}>
          <PlusOutlined /> Criar consulta
        </Button>
      </Row>
      <Row>
        <Table columns={columns} dataSource={mockedData} style={{ width: "100%" }} />
      </Row>
    </>
  );
};

export default Appointment;
