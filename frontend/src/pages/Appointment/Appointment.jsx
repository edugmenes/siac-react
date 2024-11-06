import { Badge, Button, Modal, notification, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteAppointment, getAppointments } from "../../api/appointment";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const handleClick = () => {
    navigate("/appointment/scheduling");
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();

      if (response && response.success) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const handleDelete = async (idHorario) => {
    console.log(idHorario);
    try {
      await deleteAppointment(idHorario);
      notification.success({
        message: "Sucesso",
        description: "Consulta excluida com sucesso!",
      });
      navigate("/appointments");
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha na exclusão: ${error.message}`,
      });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    {
      title: "Data",
      dataIndex: "dia",
      key: "dia",
      render: (text) =>
        new Date(text).toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    {
      title: "Horário",
      dataIndex: "hora",
      key: "hora",
    },
    {
      title: "Profissional",
      dataIndex: "psicologo",
      key: "psicologo",
    },
    {
      title: "Paciente",
      dataIndex: "paciente",
      key: "paciente",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Badge color="yellow" text={status} />,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button
          size="large"
          type="link"
          onClick={() => {
            Modal.confirm({
              title: "Tem certeza que deseja excluir?",
              content: `Você está prestes a excluir a consulta do paciente ${record.paciente}.`,
              okText: "Sim",
              cancelText: "Não",
              onOk: () => handleDelete(record.idHorario),
              maskClosable: true,
              centered: true
            });
          }}
        >
          <DeleteOutlined style={{ fontSize: "18px", color: "red" }} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "40px" }}
      >
        <Typography.Title level={2}> Consultas </Typography.Title>
        <Button type="link" size="large" onClick={handleClick}>
          <PlusOutlined /> Criar consulta
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={appointments}
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default Appointment;
