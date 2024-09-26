import { Button, Row, Table, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

const Appointment = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/appointments/schedule");
  };

  const mockedData = [
    {
      id: 211010201,
      date: "15/08/2024",
      time: "10:00",
      professional: "Henrique",
      status: "Encerrado",
    },
    {
      id: 367534352,
      date: "20/10/2024",
      time: "12:00",
      professional: "Raul",
      status: "Agendado",
    },
    {
      id: 53213231231,
      date: "22/10/2024",
      time: "11:30",
      professional: "Felipe",
      status: "Agendado",
    },
    {
      id: 1231231241,
      date: "30/10/2024",
      time: "17:00",
      professional: "Edu",
      status: "Agendado",
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
      // TODO: Tratar coluna status
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
        <Table
          columns={columns}
          dataSource={mockedData}
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default Appointment;
