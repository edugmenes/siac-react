import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Typography } from "antd";
import { TextLabel, DropdownLabel } from "../../components/InputLabel";
import {
  LeftOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { apiRegister } from "../../api/userAuthentication";
import backgroundImage from "../../images/login-background-v2.jpg";

const { Item } = Form;
const { Title } = Typography;

const RegisterUser = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({}); // Armazena os dados de ambas as etapas
  const navigate = useNavigate();

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        // Armazena os valores da primeira página do forms:
        setFormData({ ...formData, ...values });
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {
        // Se houver erros de validação, o usuário não avançará para a próxima etapa
      });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (values) => {
    // Combina os dados da segunda etapa com os da primeira
    const combinedData = { ...formData, ...values };
    try {
      await apiRegister(combinedData);
      alert("Usuário cadastrado!");
      navigate("/"); // Redireciona para a página inicial após o cadastro bem-sucedido
    } catch (error) {
      alert("Falha no cadastro.");
    }
  };

  return (
    <Row style={{ height: "100vh" }}>
      <Col
        span={12}
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/login")}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontSize: "1rem",
          }}
        >
          Voltar para Login
        </Button>
        <Title level={2} style={{ textAlign: "center", marginBottom: "2rem" }}>
          Junte-se a nós e cadastre-se!
        </Title>
        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          initialValues={{ prefix: "86" }}
          scrollToFirstError
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <Row gutter={8}>
            {currentStep === 1 && (
              <>
                <Col span={24}>
                  <TextLabel
                    name="nome"
                    label="Nome Completo"
                    placeholder="Nome Completo"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu nome completo!",
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="data_nascimento"
                    label="Data de Nascimento"
                    placeholder="Data de Nascimento"
                    type="date"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira sua data de nascimento!",
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="telefone"
                    label="Telefone"
                    placeholder="Telefone"
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="cep"
                    label="CEP"
                    placeholder="CEP"
                    rules={[
                      { required: true, message: "Por favor, insira seu CEP!" },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="endereco"
                    label="Endereço"
                    placeholder="Endereço"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu endereço!",
                      },
                    ]}
                  />
                </Col>
                <Col
                  span={24}
                  style={{ textAlign: "center", marginTop: "1rem" }}
                >
                  <Button
                    type="default"
                    icon={<RightOutlined />}
                    onClick={handleNext}
                  >
                    Avançar
                  </Button>
                </Col>
              </>
            )}

            {currentStep === 2 && (
              <>
                <Col span={24}>
                  <TextLabel
                    name="nomeUser"
                    label="Nome de Usuário"
                    placeholder="Nome de Usuário"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira o nome de usuário!",
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="email"
                    label="E-mail"
                    placeholder="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "O e-mail inserido não é válido!",
                      },
                      {
                        required: true,
                        message: "Por favor, insira seu e-mail!",
                      },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <DropdownLabel
                    name="perfil"
                    label="Perfil"
                    placeholder="Selecione o Perfil"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione o perfil!",
                      },
                    ]}
                    options={[
                      { value: "paciente", label: "Paciente" },
                      { value: "professor", label: "Professor" },
                      { value: "recepcionista", label: "Recepcionista" },
                      { value: "administrador", label: "Administrador" },
                      { value: "psicologo", label: "Psicólogo" },
                    ]}
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="password"
                    label="Senha"
                    placeholder="Senha"
                    type="password"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira sua senha!",
                      },
                    ]}
                    hasFeedback
                  />
                </Col>
                <Col span={24}>
                  <TextLabel
                    name="passwordToCompare"
                    label="Confirmar Senha"
                    placeholder="Confirmar Senha"
                    type="password"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Por favor, confirme sua senha!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("As senhas inseridas não correspondem!")
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  />
                </Col>
                <Col
                  span={24}
                  style={{ textAlign: "center", marginTop: "1rem" }}
                >
                  <Button
                    type="default"
                    icon={<LeftOutlined />}
                    onClick={handlePrevious}
                    style={{ marginRight: "8px" }}
                  >
                    Voltar
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Registrar
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Col>
      <Col
        span={12}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "right",
          backgroundAttachment: "fixed",
          height: "100%",
          position: "relative",
        }}
      />
    </Row>
  );
};

export default RegisterUser;
