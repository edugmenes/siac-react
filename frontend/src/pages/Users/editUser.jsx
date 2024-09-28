import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
} from "antd";
import { useParams } from "react-router-dom";

const { Option } = Select;

const EditUserPage = () => {
  const [form] = Form.useForm();
  const { userId } = useParams(); // Captura o ID da URL

  console.log(userId);

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      dataNascimento: values.dataNascimento
        ? values.dataNascimento.format("YYYY-MM-DD")
        : null,
    };
    console.log("Dados do formulário:", formattedValues);
  };

  return (
    <div style={{ maxWidth: "600px", padding: "20px" }}>
      <Typography.Title level={2}>Edição de Usuário</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Nome"
              name="nome"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira um nome",
                },
              ]}
            >
              <Input placeholder="Digite o nome" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Por favor, insira um email válido!",
                },
              ]}
            >
              <Input placeholder="Digite o email" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Celular"
              name="celular"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira o número de celular!",
                },
              ]}
            >
              <Input placeholder="Digite o celular" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Perfil"
              name="perfil"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione o perfil!",
                },
              ]}
            >
              <Select
                placeholder="Selecione o perfil"
                size="large"
                options={[
                  { value: "2|paciente", label: "Paciente" },
                  { value: "4|professor", label: "Professor" },
                  { value: "3|recepcionista", label: "Recepcionista" },
                  { value: "1|administrador", label: "Administrador" },
                  { value: "5|psicologo", label: "Psicólogo" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Data de Nascimento"
              name="data_nascimento"
              rules={[
                {
                  required: true,
                  message: "Por favor, insira a data de nascimento!",
                },
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                size="large"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} justify="space-between">
          <Col span={12}>
            <Button danger size="large" style={{ width: "100%" }}>
              Excluir usuário
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Salvar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditUserPage;
