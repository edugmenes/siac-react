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
import dayjs from "dayjs";
import "antd/dist/reset.css";
import ptBR from "antd/lib/locale/pt_BR";
import { getUsersByRole } from "../../api/userAuthentication";
import { apiAppointmentScheduling } from "../../api/appointmentScheduling";

const AppointmentScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getUsersByRole(5);
        const doctorsToDropdown = response.data.map((d) => ({
          label: d.nome,
          value: d.idUser,
        }));
        setDoctors(doctorsToDropdown);
      } catch (error) {
        console.error("Erro ao buscar psicólogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDateChange = (value, dateString) => {
    setSelectedDate(value);
  };

  const handleTimeChange = (value, dateString) => {
    setSelectedTime(value);
    console.log("Data e hora selecionadas:", value, dateString);
  };

  const handleProfessionalChange = (value) => {
    console.log(value);
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format("DD/MM/YYYY") : null,
      time: values.time ? dayjs(values.time).format("HH:mm") : null,
    };

    try {
      await apiAppointmentScheduling(formattedValues);
      notification.success({
        message: "Sucesso",
        description: "Consultas agendada com sucesso!",
      });
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha no agendamento: ${error.message}`,
      });
    }
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 7 || i >= 19) {
        hours.push(i);
      }
    }
    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      if (i % 15 !== 0) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "40px" }}>
        Agendamento de Consulta
      </Typography.Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <ConfigProvider locale={ptBR}>
          <div>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="Selecione a data:"
                  name="date"
                  rules={[{ required: true, message: "Selecione uma data" }]}
                >
                  <DatePicker
                    onChange={handleDateChange}
                    format="DD/MM/YYYY"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Selecione o dia"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="Selecione o horário:"
                  name="time"
                  rules={[{ required: true, message: "Selecione um horário" }]}
                >
                  <DatePicker
                    picker="time"
                    onChange={handleTimeChange}
                    showTime={{
                      hideDisabledOptions: true,
                      disabledHours,
                      disabledMinutes,
                    }}
                    format="HH:mm"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Selecione a hora"
                    disabled={!selectedDate}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item
                  label="Selecione o profissional:"
                  name="professional"
                  rules={[
                    { required: true, message: "Selecione um profissional" },
                  ]}
                >
                  <Select
                    style={{ width: "100%" }}
                    onChange={handleProfessionalChange}
                    size="large"
                    placeholder="Selecione o profissional"
                    options={doctors}
                    disabled={!selectedTime}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={2}>
                <Button
                  size="large"
                  htmlType="submit"
                  type="primary"
                  style={{ marginTop: "30px" }}
                >
                  Agendar consulta
                </Button>
              </Col>
            </Row>
          </div>
        </ConfigProvider>
      </Form>
    </>
  );
};

export default AppointmentScheduling;
