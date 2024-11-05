import { Button, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react"; // Importa useState
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getAppointments } from "../../api/appointment";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]); // Estado para armazenar consultas

  const handleClick = () => {
    navigate("/appointment/scheduling");
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      console.log("response", response);

      // Verifica se a resposta foi bem-sucedida e se os dados existem
      if (response && response.success) {
        // Mapeia os dados para o formato que a tabela espera
        const formattedAppointments = response.data.map((appointment) => ({
          key: appointment.idHorario, // Chave única para cada entrada
          date: appointment.hora.split(" ")[0], // Se precisar de apenas a data
          time: appointment.hora.split(" ")[1], // Se precisar apenas do horário
          professional: appointment.idPsico, // ou outro campo que você queira mostrar
          status: appointment.status,
        }));

        setAppointments(formattedAppointments); // Atualiza o estado com os dados formatados
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []); // Array vazio para executar apenas na montagem

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
          onClick={() => navigate(`/appointments/schedule/${record.key}`)}
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
        <Typography.Title level={2}> Consultas </Typography.Title>
        <Button type="link" size="large" onClick={handleClick}>
          <PlusOutlined /> Criar consulta
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={appointments} // Usa o estado de appointments
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default Appointment;
