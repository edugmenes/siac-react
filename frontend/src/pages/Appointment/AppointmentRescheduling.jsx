import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Typography,
  notification,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import ptBR from "antd/lib/locale/pt_BR";
import { getUsersByRole } from "../../api/user";
import { getAppointmentById } from "../../api/appointment";

const AppointmentRescheduling = () => {
  const { recordId } = useParams();
  const [form] = Form.useForm();
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Obtém os dados da consulta pelo ID
        const response = await getAppointmentById(recordId);
        const consultationData = response?.data[0];

        if (consultationData) {
          form.setFieldsValue({
            date: dayjs(consultationData.dia),
            time: dayjs(consultationData.hora, "HH:mm"),
            professional: consultationData.idPsico,
            room: consultationData.sala || undefined,
          });
        }

        // Obtém lista de psicos:
        const usersResponse = await getUsersByRole(5);
        const doctorsToDropdown = usersResponse.data.map((d) => ({
          label: d.nome,
          value: d.idUser,
        }));
        setDoctors(doctorsToDropdown);

        // Mock de salas (pode ser substituído por uma API de salas)
        const mockRooms = ["Sala 1", "Sala 2", "Sala 3"].map((room) => ({
          label: room,
          value: room,
        }));
        setRooms(mockRooms);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      }
    };

    fetchInitialData();
  }, [recordId, form]);

  const handleSubmit = async (values) => {
    try {
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };

      notification.success({
        message: "Sucesso",
        description: "Consulta remarcada com sucesso!",
      });
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha ao remarcar consulta: ${error.message}`,
      });
    }
  };

  const handleCancel = () => {
    navigate("/appointments");
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "40px" }}>
        Remarcar Consulta
      </Typography.Title>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <ConfigProvider locale={ptBR}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Selecione a data:"
                name="date"
                rules={[{ required: true, message: "Selecione uma data" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione o dia"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Selecione o horário:"
                name="time"
                rules={[{ required: true, message: "Selecione um horário" }]}
              >
                <DatePicker
                  picker="time"
                  format="HH:mm"
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione a hora"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Selecione o profissional:"
                name="professional"
                rules={[
                  { required: true, message: "Selecione um profissional" },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione o profissional"
                  options={doctors}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Selecione a sala:"
                name="room"
                rules={[{ required: false }]}
              >
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione a sala"
                  options={rooms}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col>
              <Button
                size="large"
                htmlType="submit"
                type="primary"
                style={{ marginRight: "10px" }}
              >
                Remarcar consulta
              </Button>
              <Button size="large" onClick={handleCancel}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </ConfigProvider>
      </Form>
    </>
  );
};

export default AppointmentRescheduling;
