import React, { useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import ptBR from "antd/lib/locale/pt_BR";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const Painel = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [agendas, setAgendas] = useState([]);

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleStartTimeChange = (value) => {
    setSelectedStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    setSelectedEndTime(value);
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      data: values.data ? dayjs(values.data).format("DD/MM/YYYY") : null,
      horaInicio: values.horaInicio
        ? dayjs(values.horaInicio).format("HH:mm")
        : null,
      horaFim: values.horaFim ? dayjs(values.horaFim).format("HH:mm") : null,
      diaSemana: values.diaSemana,
    };

    setAgendas((prevAgendas) => [...prevAgendas, formattedValues]);

    message.success("Agenda adicionada à tabela!");
  };

  const handleSaveAgenda = () => {
    // Lógica para salvar todas as agendas no backend
    console.log("Salvando agendas:", agendas);
    message.success("Agendas salvas com sucesso!");
  };

  const handleDelete = (record) => {
    setAgendas((prevAgendas) =>
      prevAgendas.filter((agenda) => agenda !== record)
    );
    message.success("Agenda removida!");
  };

  const columns = [
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
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
        <>
          <Button
            size="large"
            type="link"
            onClick={() => console.log(`Editando: ${record.data}`)}
          >
            <EditOutlined style={{ fontSize: "18px" }} />
          </Button>
          <Button size="large" type="link" onClick={() => handleDelete(record)}>
            <DeleteOutlined style={{ fontSize: "18px", color: "red" }} />
          </Button>
        </>
      ),
      width: 150,
    },
  ];

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
        Criar Agenda de Atendimento
      </Typography.Title>
      <Row gutter={16}>
        <Col span={12}>
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            style={{ width: "97%" }}
          >
            <ConfigProvider locale={ptBR}>
              <div>
                <Row style={{ marginBottom: "20px" }}>
                  <Col span={24}>
                    <Form.Item
                      label="Selecione a data"
                      name="data"
                      rules={[
                        { required: true, message: "Selecione uma data" },
                      ]}
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
                <Row gutter={16} style={{ marginBottom: "20px" }}>
                  <Col span={12}>
                    <Form.Item
                      label="Hora de Início"
                      name="horaInicio"
                      rules={[
                        {
                          required: true,
                          message: "Selecione a hora de início",
                        },
                      ]}
                    >
                      <TimePicker
                        format="HH:mm"
                        onChange={handleStartTimeChange}
                        showTime={{
                          hideDisabledOptions: true,
                          disabledHours,
                          disabledMinutes,
                        }}
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Selecione o horário de início"
                        disabled={!selectedDate}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Hora de Fim"
                      name="horaFim"
                      rules={[
                        { required: true, message: "Selecione a hora de fim" },
                      ]}
                    >
                      <TimePicker
                        format="HH:mm"
                        onChange={handleEndTimeChange}
                        showTime={{
                          hideDisabledOptions: true,
                          disabledHours,
                          disabledMinutes,
                        }}
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Selecione o horário de fim"
                        disabled={!selectedStartTime}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label="Dia da Semana"
                      name="diaSemana"
                      rules={[
                        {
                          required: true,
                          message: "Selecione o dia da semana",
                        },
                      ]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Selecione o dia da semana"
                        disabled={!selectedEndTime}
                      >
                        <Option value="Segunda-feira">Segunda-feira</Option>
                        <Option value="Terça-feira">Terça-feira</Option>
                        <Option value="Quarta-feira">Quarta-feira</Option>
                        <Option value="Quinta-feira">Quinta-feira</Option>
                        <Option value="Sexta-feira">Sexta-feira</Option>
                        <Option value="Sábado">Sábado</Option>
                        <Option value="Domingo">Domingo</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
                <Row
                  justify="start"
                  align="middle"
                  style={{ marginTop: "30px" }}
                >
                  <Col>
                    <Button
                      type="link"
                      icon={
                        <PlusOutlined
                          style={{
                            fontSize: "20px",
                            border: "2px solid #1890ff",
                            borderRadius: "50%",
                            padding: "5px",
                          }}
                        />
                      }
                      size="large"
                      htmlType="submit"
                      style={{ marginRight: "10px" }}
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
              </div>
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
            pagination={false}
            bordered
            style={{ width: "100%", marginBottom: "30px" }} // Increased bottom margin
          />
        </Col>
      </Row>
    </>
  );
};

export default Painel;
