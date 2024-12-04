import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Row,
  Table,
  TimePicker,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import ptBR from "antd/lib/locale/pt_BR";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { apiAgendaCreation } from "../../api/agenda";

const CreateAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFinalDate, setSelectedFinalDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [enableFinalDate, setEnableFinalDate] = useState(false);
  const [agendas, setAgendas] = useState([]);

  // Calcular o dia da semana com base na data
  const calculateDayOfWeek = (date) => {
    const days = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    return days[dayjs(date).day()];
  };

  const handleDateChange = (value) => setSelectedDate(value);
  const handleFinalDateChange = (value) => setSelectedFinalDate(value);
  const handleStartTimeChange = (value) => setSelectedStartTime(value);
  const handleEndTimeChange = (value) => setSelectedEndTime(value);

  const handleSubmit = () => {
    let newEntries = [];
    const currentAgendas = agendas.map((agenda) => agenda.data); // Datas já existentes

    if (enableFinalDate && selectedDate && selectedFinalDate) {
      let currentDate = dayjs(selectedDate);

      while (currentDate <= dayjs(selectedFinalDate)) {
        const formattedDate = currentDate.format("DD/MM/YYYY");

        // Adicionar apenas datas não duplicadas
        if (!currentAgendas.includes(formattedDate)) {
          newEntries.push({
            data: formattedDate,
            horaInicio: selectedStartTime.format("HH:mm"),
            horaFim: selectedEndTime.format("HH:mm"),
            diaSemana: calculateDayOfWeek(currentDate),
          });
        }
        currentDate = currentDate.add(1, "day");
      }
    } else if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format("DD/MM/YYYY");

      // Adicionar apenas se a data não existir
      if (!currentAgendas.includes(formattedDate)) {
        newEntries.push({
          data: formattedDate,
          horaInicio: selectedStartTime.format("HH:mm"),
          horaFim: selectedEndTime.format("HH:mm"),
          diaSemana: calculateDayOfWeek(selectedDate),
        });
      }
    }

    // Atualizar tabela apenas com novas entradas
    if (newEntries.length > 0) {
      setAgendas((prevAgendas) => [...prevAgendas, ...newEntries]);
    } else {
      notification.warning({
        message: "Atenção",
        description: "Nenhuma data nova foi adicionada.",
      });
    }
  };

  const handleSaveAgenda = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Token não encontrado no localStorage");
      return;
    }

    try {
      await apiAgendaCreation(agendas, authToken);
      notification.success({
        message: "Sucesso",
        description: "Agendas salvas com sucesso!",
      });
      setAgendas([]);
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha ao salvar agendas: ${error.message}`,
      });
    }
  };

  const handleDelete = (record) => {
    setAgendas((prevAgendas) =>
      prevAgendas.filter((agenda) => agenda !== record)
    );
  };

  const columns = [
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      width: 110,
    },
    {
      title: "Hora de Início",
      dataIndex: "horaInicio",
      key: "horaInicio",
    },
    {
      title: "Hora de Fim",
      dataIndex: "horaFim",
      key: "horaFim",
    },
    {
      title: "Dia da Semana",
      dataIndex: "diaSemana",
      key: "diaSemana",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button size="small" type="link" onClick={() => handleDelete(record)}>
          <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
        </Button>
      ),
      width: 100,
    },
  ];

  return (
    <>
      <Typography.Title level={2} style={{ marginBottom: "30px" }}>
        Criar Agenda de Atendimento
      </Typography.Title>
      <Row gutter={32}>
        <Col span={12}>
          <Form layout="vertical">
            <ConfigProvider locale={ptBR}>
              <Form.Item>
                <Checkbox
                  onChange={(e) => setEnableFinalDate(e.target.checked)}
                >
                  Inserir conjunto de datas
                </Checkbox>
              </Form.Item>
              <Form.Item
                label="Data Inicial"
                required
                rules={[{ required: true, message: "Selecione uma data" }]}
              >
                <DatePicker
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  size="large"
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                />
              </Form.Item>
              <Form.Item label="Data Final">
                <DatePicker
                  onChange={handleFinalDateChange}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  size="large"
                  disabled={!enableFinalDate}
                  disabledDate={(current) =>
                    current && current <= dayjs(selectedDate).startOf("day")
                  }
                />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Hora de Início" required>
                    <TimePicker
                      format="HH:mm"
                      onChange={handleStartTimeChange}
                      style={{ width: "100%" }}
                      size="large"
                      disabled={!selectedDate}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Hora de Fim" required>
                    <TimePicker
                      format="HH:mm"
                      onChange={handleEndTimeChange}
                      style={{ width: "100%" }}
                      size="large"
                      disabled={!selectedStartTime}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col>
                  <Button
                    size="large"
                    type="link"
                    style={{ marginRight: "10px" }}
                    icon={<PlusOutlined style={{ fontSize: "16px" }} />}
                    onClick={handleSubmit}
                  >
                    Adicionar
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    onClick={handleSaveAgenda}
                  >
                    Salvar Agenda
                  </Button>
                </Col>
              </Row>
            </ConfigProvider>
          </Form>
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={agendas}
            rowKey={(record) =>
              `${record.data}-${record.horaInicio}-${record.diaSemana}`
            }
            pagination={{ pageSize: 5 }}
            bordered
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CreateAgenda;
