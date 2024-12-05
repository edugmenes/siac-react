import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Row,
  Col,
  message,
  DatePicker,
} from "antd";
import jsPDF from "jspdf";
import { jwtDecode } from "jwt-decode";
import { ValidacaoReport,getEstagiarioProfessor } from "../../api/report";

const { TextArea } = Input;
const { Option } = Select;

const InternshipReport = () => {
  const [form] = Form.useForm();
  const [isSupervisorDisabled, setIsSupervisorDisabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (true /*decodedToken.perfil === "professor"*/) {
        form.setFieldsValue({ supervisor: "Seu Nome" });
        setIsSupervisorDisabled(true);
      }
    }

    var Dados = ValidacaoReport();
    console.log("dados: ", Dados);
  }, [form]);

  const handleSubmit = (values) => {
    console.log("Relatório de Estágio salvo:", values);
    message.success("Relatório de Estágio salvo com sucesso!");
  };

  const handlePrint = async () => {
    const values = await form.validateFields();
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Relatório de Estágio", 10, 10);
    doc.text(`Data: ${values.date.format("DD/MM/YYYY")}`, 10, 20);
    doc.text(`Nome do Estagiário: ${values.internName}`, 10, 30);
    doc.text(`Supervisor: ${values.supervisor}`, 10, 40);
    doc.text(`Área de Atuação: ${values.area}`, 10, 50);

    const feedback = doc.splitTextToSize(
      `Feedback do Supervisor: ${values.feedback}`,
      180
    );
    doc.text(feedback, 10, 60);

    const activities = doc.splitTextToSize(
      `Atividades Realizadas: ${values.activities}`,
      180
    );
    doc.text(activities, 10, 90);

    doc.save("Relatorio_Estagio.pdf");
  };

  return (
    <div>
      <Typography.Title level={2}>Relatórios</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="date"
              label="Data"
              rules={[{ required: true, message: "Por favor, selecione a data!" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                placeholder="Selecione a data"
              />
            </Form.Item>

            <Form.Item
              name="internName"
              label="Nome do Estagiário"
              rules={[{ required: true, message: "Por favor, selecione o estagiário!" }]}
            >
              <Select placeholder="Selecione o estagiário">
                <Option value="estagiario1">Ana Souza</Option>
                <Option value="estagiario2">Pedro Lima</Option>
                <Option value="estagiario3">Maria Santos</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="supervisor"
              label="Supervisor Responsável"
              rules={[{ required: true, message: "Por favor, selecione o supervisor!" }]}
            >
              <Select
                placeholder="Selecione o supervisor"
                disabled={isSupervisorDisabled}
              >
                <Option value="supervisor1">Dr. Silva</Option>
                <Option value="supervisor2">Dra. Pereira</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="area"
              label="Área de Atuação"
              rules={[{ required: true, message: "Por favor, selecione a área de atuação!" }]}
            >
              <Select placeholder="Selecione a área de atuação">
                <Option value="psicologia">Psicologia</Option>
                <Option value="fonoaudiologia">Fonoaudiologia</Option>
                <Option value="terapia ocupacional">Terapia Ocupacional</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Salvar Relatório
              </Button>
              <Button style={{ marginLeft: 10 }} onClick={handlePrint}>
                Imprimir em PDF
              </Button>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="activities"
              label="Atividades Realizadas"
              rules={[{ required: true, message: "Por favor, descreva as atividades realizadas!" }]}
            >
              <TextArea
                rows={5}
                autoSize={{ minRows: 5, maxRows: 10 }}
                placeholder="Descreva as atividades realizadas pelo estagiário"
              />
            </Form.Item>

            <Form.Item
              name="feedback"
              label="Feedback do Supervisor"
              rules={[{ required: true, message: "Por favor, insira o feedback do supervisor!" }]}
            >
              <TextArea
                rows={5}
                autoSize={{ minRows: 5, maxRows: 10 }}
                placeholder="Digite o feedback do supervisor sobre o desempenho do estagiário"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default InternshipReport;
