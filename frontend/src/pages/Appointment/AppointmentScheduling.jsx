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
  getDatesAvailableToScheduling,
  getProfessionalsForDate,
  getAvailableHoursToScheduling,
  apiAppointmentScheduling,
} from "../../api/appointment";

const AppointmentScheduling = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableProfessionals, setAvailableProfessionals] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedTimeId, setSelectedTimeId] = useState(null);
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

    // Fetch dates from API
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

  const handleDateChange = async (value) => {
    if (!value) {
      resetFields();
      return;
    }

    setSelectedDate(value);
    setAvailableProfessionals([]);
    setSelectedProfessional(null);
    setAvailableHours([]);
    setSelectedTimeId(null);
    console.log("Datas disponíveis: ", availableDates);

    try {
      // Filtra as agendas que correspondem à data selecionada
      const selectedDateString = value.format("YYYY-MM-DD");
      console.log("Data selecionada: ", selectedDateString);

      const selectedAgendas = availableDates.filter(
        (item) => dayjs(item.data).format("YYYY-MM-DD") === selectedDateString
      );

      // Coleta os idAgenda
      const idAgendas = selectedAgendas.map((agenda) => agenda.idAgenda);
      console.log("Agendas encontradas na data:", idAgendas);

      // Faz a requisição passando a lista de idAgenda
      const response = await getProfessionalsForDate(idAgendas);
      if (response.success) {
        const professionals = response.data.map((prof) => ({
          label: prof.nome,
          value: prof.idPsico,
          idAgenda: prof.idAgenda,
        }));

        console.log("Profissionais encontrados na data:", professionals);
        setAvailableProfessionals(professionals);
      } else {
        notification.error({
          message: "Erro",
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar profissionais disponíveis:", error);
    }
  };

  const handleProfessionalChange = async (value) => {
    if (!value) {
      setSelectedProfessional(null);
      setAvailableHours([]);
      setSelectedTimeId(null);
      return;
    }

    setSelectedProfessional(value);
    setAvailableHours([]);
    setSelectedTimeId(null);

    // Encontrar o profissional selecionado e obter o idAgenda
    const selectedProfessionalData = availableProfessionals.find(
      (prof) => prof.value === value // Comparar idPsico
    );
    console.log("Profissional escolhido: ", selectedProfessionalData);

    // Passar apenas o idAgenda para a API
    const { idAgenda } = selectedProfessionalData;

    try {
      const response = await getAvailableHoursToScheduling(idAgenda);
      if (response.success) {
        const hours = response.data.map((hour) => ({
          label: dayjs(hour.hora, "HH:mm:ss").format("HH:mm"),
          value: hour.idHorario,
        }));

        console.log("Horários disponíveis: ", hours);
        setAvailableHours(hours);
      } else {
        notification.error({
          message: "Erro",
          description: response.message,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
    }
  };

  const handleTimeChange = (value) => {
    setSelectedTimeId(value || null);
  };

  const handleSubmit = async (values) => {
    console.log("Valores submetidos: ", values);
    const formattedValues = {
      date: selectedDate.format("YYYY-MM-DD"),
      professional: selectedProfessional,
      timeId: selectedTimeId,
      room: values.room,
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

  const resetFields = () => {
    setSelectedDate(null);
    setSelectedProfessional(null);
    setSelectedTimeId(null);
    setAvailableProfessionals([]);
    setAvailableHours([]);
  };

  const disabledDate = (current) => {
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
                  allowClear
                  onClear={() => setSelectedProfessional(null)}
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
                  allowClear
                  onClear={() => setSelectedTimeId(null)}
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
                  options={availableHours}
                  onChange={handleTimeChange}
                  disabled={!selectedProfessional}
                  allowClear
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
                  allowClear
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
