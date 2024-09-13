import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, Row, Col, Typography, Select } from "antd";
import backgroundImage from "../../images/register-background.jpg"; // Importe a imagem
import { apiRegister } from "../../api/userAuthentication.js";

const { Item } = Form;
const { Title } = Typography;
const { Option } = Select; // Importa o componente Option para o Select

const RegisterUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (registerFormValues) => {
    try {
      await apiRegister(registerFormValues);
      alert("Usuário cadastrado!");
      navigate("/"); // Redireciona para a página inicial após o login bem-sucedido
    } catch (error) {
      alert("Falha no cadastro.");
    }
  };

  return (
    <Row
      gutter={16}
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Col span={14}>
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <Title
            level={3} // Diminuir o tamanho do título
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Cadastre-se
          </Title>

          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            initialValues={{ prefix: "86" }}
            scrollToFirstError
          >
            <Row gutter={8}>
              <Col span={24}>
                <Item
                  name="nome"
                  label="Nome Completo"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira seu nome completo!",
                    },
                  ]}
                >
                  <Input placeholder="Nome Completo" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="email"
                  label="E-mail"
                  style={{ marginBottom: "8px" }}
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
                >
                  <Input placeholder="E-mail" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="nomeUser"
                  label="Nome de Usuário"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira o nome de usuário!",
                    },
                  ]}
                >
                  <Input placeholder="Nome de Usuário" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="perfil"
                  label="Perfil"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione o perfil!",
                    },
                  ]}
                >
                  <Select placeholder="Selecione o Perfil">
                    <Option value="paciente">Paciente</Option>
                    <Option value="professor">Professor</Option>
                    <Option value="recepcionista">Recepcionista</Option>
                    <Option value="administrador">Administrador</Option>
                    <Option value="psicologo">Psicólogo</Option>
                  </Select>
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="data_nascimento"
                  label="Data de Nascimento"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira sua data de nascimento!",
                    },
                  ]}
                >
                  <Input type="date" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="cep"
                  label="CEP"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    { required: true, message: "Por favor, insira seu CEP!" },
                  ]}
                >
                  <Input placeholder="CEP" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="endereco"
                  label="Endereço"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira seu endereço!",
                    },
                  ]}
                >
                  <Input placeholder="Endereço" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="telefone"
                  label="Telefone"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    {
                      required: false,
                      message: "Por favor, insira seu telefone!",
                    },
                  ]}
                >
                  <Input placeholder="Telefone" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="password"
                  label="Senha"
                  style={{ marginBottom: "8px" }}
                  rules={[
                    { required: true, message: "Por favor, insira sua senha!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Senha" />
                </Item>
              </Col>
              <Col span={24}>
                <Item
                  name="passwordToCompare"
                  label="Confirmar Senha"
                  dependencies={["password"]}
                  style={{ marginBottom: "8px" }}
                  hasFeedback
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
                >
                  <Input.Password placeholder="Confirmar Senha" />
                </Item>
              </Col>
              <Col span={24} style={{ textAlign: "center" }}>
                <Item>
                  <Button type="primary" htmlType="submit">
                    Registrar
                  </Button>
                </Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>

      <Col span={10}>
        <img
          src={backgroundImage} // Use a imagem importada
          alt="Cadastro Imagem"
          style={{ width: "95%", height: "90%", objectFit: "cover" }}
        />
      </Col>
    </Row>
  );
};

export default RegisterUser;
