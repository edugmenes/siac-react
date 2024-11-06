import { Button, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { getAppointments } from "../../api/appointment";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const handleClick = () => {
    navigate("/appointment/scheduling");
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      console.log("response", response);

      if (response && response.success) {
        const formattedAppointments = response.data.map((appointment) => ({
          key: appointment.idHorario,
          date: appointment.hora.split(" ")[0],
          time: appointment.hora.split(" ")[1],
          professional: appointment.idPsico,
          status: appointment.status,
        }));

        setAppointments(formattedAppointments);
      }
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
          dataSource={appointments}
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default Appointment;
