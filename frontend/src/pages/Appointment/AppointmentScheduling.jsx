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
import {
  apiAppointmentScheduling,
  getDatesAvailableToScheduling,
  getAvailableHoursToScheduling,
} from "../../api/appointment";

const AppointmentScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableProfessionals, setAvailableProfessionals] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedTimeId, setSelectedTimeId] = useState(null); // Guarda o id do horário selecionado
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Mock para as salas
    const mockRooms = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5"].map(
      (room) => ({
        label: room,
        value: room,
      })
    );
    setRooms(mockRooms);

    // Requisição para obter as datas disponíveis
    const fetchAvailableDates = async () => {
      try {
        const data = await getDatesAvailableToScheduling();

        if (data.success) {
          setAvailableDates(data.data);
        } else {
          notification.error({
            message: "Erro",
            description: data.message,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar datas disponíveis:", error);
      }
    };

    fetchAvailableDates();
  }, []);

  const handleDateChange = (value) => {
    setSelectedDate(value);

    // Filtra os profissionais disponíveis para a data selecionada
    const selectedDateString = value.format("YYYY-MM-DD");
    const filteredProfessionals = availableDates
      .filter(
        (item) => dayjs(item.data).format("YYYY-MM-DD") === selectedDateString
      )
      .map((item) => ({
        label: item.nome,
        value: item.idPsico,
      }));

    setAvailableProfessionals(filteredProfessionals); // Atualiza os profissionais disponíveis
  };

  const handleProfessionalChange = async (value) => {
    setSelectedProfessional(value);

    // Obter os horários disponíveis para o profissional selecionado
    const selectedProfessionalData = availableDates.filter(
      (item) => item.idPsico === value
    );

    if (selectedProfessionalData.length > 0) {
      const idAgenda = selectedProfessionalData[0].idAgenda;

      try {
        const response = await getAvailableHoursToScheduling(idAgenda);
        if (response.success) {
          const formattedHours = response.data.map((item) => {
            const hour = dayjs(item.hora, "HH:mm:ss").format("HH:mm"); // Formata para HH:mm
            return {
              label: hour,
              value: hour,
              idHorario: item.idHorario, // Aqui passamos o idHorario
            };
          });
          setAvailableHours(formattedHours); // Atualiza os horários disponíveis
        } else {
          notification.error({
            message: "Erro",
            description: response.message,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
      }
    }
  };

  const handleTimeChange = (value, option) => {
    setSelectedTimeId(option.idHorario); // Armazena o idHorario do horário selecionado
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? dayjs(values.date).format("DD/MM/YYYY") : null,
      time: values.time,
      idHorario: selectedTimeId,
    };

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    try {
      await apiAppointmentScheduling(formattedValues, authToken);
      notification.success({
        message: "Sucesso",
        description: "Consulta agendada com sucesso!",
      });
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha no agendamento: ${error.message}`,
      });
    }
  };

  const disabledDate = (current) => {
    // Desabilita datas que não estão na lista de datas disponíveis
    return (
      current &&
      !availableDates.some((date) => dayjs(date.data).isSame(current, "day"))
    );
  };

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "40px" }}>
        Agendar Consulta
      </Typography.Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <ConfigProvider locale={ptBR}>
          <Row gutter={16}>
            <Col span={12}>
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
                  onChange={handleProfessionalChange}
                  size="large"
                  placeholder="Selecione o profissional"
                  options={availableProfessionals}
                  disabled={!selectedDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Selecione o horário:"
                name="time"
                rules={[{ required: true, message: "Selecione um horário" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione o horário"
                  options={availableHours.map((hora) => ({
                    label: hora.label,
                    value: hora.value,
                    idHorario: hora.idHorario, // Passa o idHorario na opção
                  }))}
                  onChange={handleTimeChange} // Chama a função para capturar o idHorario
                  disabled={!selectedDate || !selectedProfessional}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Selecione a sala:"
                name="room"
                rules={[{ required: true, message: "Selecione uma sala" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  placeholder="Selecione a sala"
                  options={rooms}
                  disabled={!selectedDate || !selectedProfessional}
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
                style={{ marginRight: "10px" }}
              >
                Agendar consulta
              </Button>
            </Col>
          </Row>
        </ConfigProvider>
      </Form>
    </>
  );
};

export default AppointmentScheduling;
