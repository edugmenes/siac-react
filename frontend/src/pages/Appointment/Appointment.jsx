import {
  Badge,
  Button,
  Modal,
  notification,
  Row,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
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
        // Ordena as consultas pela data em ordem decrescente
        const sortedData = response.data.sort(
          (a, b) => new Date(b.dia) - new Date(a.dia)
        );
        setAppointments(sortedData);
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  const handleDelete = async (idHorario) => {
    try {
      await deleteAppointment(idHorario);
      notification.success({
        message: "Sucesso",
        description: "Consulta excluida com sucesso!",
      });
      fetchAppointments();
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha na exclusão: ${error.message}`,
      });
    }
  };

  const handleReschedule = (record) => {
    Modal.confirm({
      title: "Tem certeza que deseja remarcar a consulta?",
      content: `Você está prestes a remarcar a consulta do paciente ${record.paciente}.`,
      okText: "Sim",
      cancelText: "Não",
      onOk: () => navigate(`/appointment/rescheduling/${record.idHorario}`),
      maskClosable: true,
      centered: true,
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    {
      title: "Data",
      dataIndex: "dia",
      key: "dia",
      width: 180,
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
      width: 160,
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
      render: (status) => {
        let badgeProps = {};

        switch (status) {
          case "Agendada":
            badgeProps = { color: "yellow", text: "Agendada" };
            break;
          case "Remarcada":
            badgeProps = { color: "blue", text: "Remarcada" };
            break;
          case "Cancelada":
            badgeProps = { color: "red", text: "Cancelada" };
            break;
          case "Concluída":
            badgeProps = { color: "green", text: "Concluída" };
            break;
          default:
            badgeProps = { color: "gray", text: "Indefinido" };
        }

        return <Badge color={badgeProps.color} text={badgeProps.text} />;
      },
    },
    {
      title: "Ações",
      key: "actions",
      align: "center",
      width: 160,
      render: (_, record) => (
        <>
          <Button
            size="large"
            type="link"
            onClick={() => {
              Modal.confirm({
                title: "Tem certeza que deseja cancelar?",
                content: `Você está prestes a cancelar a consulta do paciente ${record.paciente}.`,
                okText: "Sim",
                cancelText: "Não",
                onOk: () => handleDelete(record.idHorario),
                maskClosable: true,
                centered: true,
              });
            }}
            disabled={record.status === "Cancelada"}
          >
            <DeleteOutlined
              style={{
                fontSize: "18px",
                color: record.status === "Cancelada" ? "gray" : "red",
              }}
            />
          </Button>
          <Button
            size="large"
            type="link"
            onClick={() => handleReschedule(record)}
            disabled={record.status === "Cancelada"}
          >
            <CalendarOutlined
              style={{
                fontSize: "18px",
                color: record.status === "Cancelada" ? "gray" : "blue",
              }}
            />
          </Button>
        </>
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
