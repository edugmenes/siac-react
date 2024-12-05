import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Select,
  Row,
  Col,
  notification,
} from "antd";
import jsPDF from "jspdf";
import dayjs from "dayjs";
import { createPatientRegister } from "../../api/patientRecords";
import { getUsersByRole } from "../../api/user";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const PatientRecords = () => {
  const [form] = Form.useForm();
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getUsersByRole(5);
        const patientsToDropdown = response.data.map((d) => ({
          label: d.nome,
          value: d.idUser,
        }));
        setPatients(patientsToDropdown);
      } catch (err) {
        throw new Error(
          err.message || "Erro desconhecido ao buscar pacientes."
        );
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async (values) => {
    const date = dayjs(values.date);
    const formattedDate = date.format("DD/MM/YYYY HH:mm");

    const formattedValues = {
      ...values,
      date: formattedDate,
    };

    try {
      await createPatientRegister(formattedValues);
      notification.success({
        message: "Prontuario cadastrado com sucesso!",
        description: "Sucesso!",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Erro ao cadastrar prontuário",
        description: error.message || "Erro desconhecido",
      });
    }
  };

  const handlePrint = async () => {
    const values = await form.validateFields();
    const doc = new jsPDF();

    // Configurações iniciais do PDF
    doc.setFontSize(12);
    doc.text("Prontuário de Consulta Psicológica", 10, 10);
    doc.text(
      `Data da Consulta: ${values.date.format("DD/MM/YYYY HH:mm")}`,
      10,
      20
    );
    doc.text(`Diagnóstico: ${values.diagnosis}`, 10, 30);
    doc.text(`Profissional Responsável: ${values.professional}`, 10, 40);

    // Tratamento da caixa de observações com quebra de linha
    const observations = doc.splitTextToSize(
      `Observações: ${values.observations}`,
      180
    );
    doc.text(observations, 10, 50);

    // Gera o PDF e faz o download
    doc.save("Prontuario.pdf");
  };

  return (
    <div>
      <Typography.Title level={2}>Prontuários</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="date"
              label="Data da Consulta"
              rules={[
                { required: true, message: "Por favor, selecione a data!" },
              ]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
                placeholder="Selecione a data"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="diagnosis"
              label="Diagnóstico"
              rules={[
                { required: true, message: "Por favor, insira o diagnóstico!" },
              ]}
            >
              <Input placeholder="Digite o diagnóstico" size="large" />
            </Form.Item>

            <Form.Item
              name="patient"
              label="Nome do paciente"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione o paciente!",
                },
              ]}
            >
              <Select
                placeholder="Selecione o paciente"
                size="large"
                options={patients}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar Prontuário
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={handlePrint}>
                Imprimir em PDF
              </Button>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="observations"
              label="Observações"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira as observações!",
                },
              ]}
            >
              <TextArea
                rows={9}
                autoSize={{ minRows: 10, maxRows: 16 }}
                placeholder="Digite as observações do prontuário"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PatientRecords;
