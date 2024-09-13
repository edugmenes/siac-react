import React from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  theme,
  Typography,
  Select,
  DatePicker,
  Row,
  Col,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
const { Option } = Select;

export default function SignUpPage() {
  const { token } = useToken();
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const styles = {
    container: {
      margin: "0 auto",
      padding: screens.md
        ? `${token.paddingXL}px`
        : `${token.paddingXL}px ${token.padding}px`,
      width: "50vw",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center",
    },
    section: {
      alignItems: "center",
      backgroundColor: token.colorBgContainer,
      display: "flex",
      height: "100vh", // Full height for proper alignment
    },
    signup: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    imageContainer: {
      textAlign: "center",
    },
    image: {
      width: "100%",
      maxWidth: "400px", // Set a max width for the image
      height: "auto",
    },
  };

  return (
    <section style={styles.section}>
      <Row gutter={32} align="middle">
        {/* Coluna com o formulário */}
        <Col xs={24} md={12}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Title style={styles.title}>Cadastre-se</Title>
              <Text style={styles.text}>
                Junte-se a nós! Crie uma conta para começar.
              </Text>
            </div>
            <Form
              name="normal_signup"
              onFinish={onFinish}
              layout="vertical"
              requiredMark="optional"
            >
              {/* Seu código atual do formulário */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu nome completo!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nome completo"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu telefone!",
                      },
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Telefone" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cep"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu CEP!",
                      },
                    ]}
                  >
                    <Input prefix={<HomeOutlined />} placeholder="CEP" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dob"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira sua data de nascimento!",
                      },
                    ]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="Data de nascimento"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu endereço!",
                      },
                    ]}
                  >
                    <Input placeholder="Endereço" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira o número do endereço!",
                      },
                    ]}
                  >
                    <Input placeholder="Número" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira sua cidade!",
                      },
                    ]}
                  >
                    <Input placeholder="Cidade" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu estado!",
                      },
                    ]}
                  >
                    <Input placeholder="Estado" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira seu nome de usuário!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nome de usuário"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Por favor, insira seu e-mail!",
                      },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="E-mail" />
                  </Form.Item>
                  <Form.Item
                    name="profile"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, selecione seu perfil!",
                      },
                    ]}
                  >
                    <Select placeholder="Selecione o perfil" allowClear>
                      <Option value="user">Usuário</Option>
                      <Option value="admin">Administrador</Option>
                      <Option value="moderator">Moderador</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    extra="A senha deve ter pelo menos 8 caracteres."
                    rules={[
                      {
                        required: true,
                        message: "Por favor, insira sua senha!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Senha"
                    />
                  </Form.Item>
                  <Form.Item
                    name="repeatPassword"
                    rules={[
                      {
                        required: true,
                        message: "Por favor, repita sua senha!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("As senhas não coincidem!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Repita a senha"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ marginBottom: "0px" }}>
                <Button block type="primary" htmlType="submit">
                  Cadastre-se
                </Button>
                <div style={styles.signup}>
                  <Text style={styles.text}>Já tem uma conta?</Text>{" "}
                  <Link href="">Faça login</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Coluna com a imagem */}
        <Col xs={0} md={12}>
          <div style={styles.imageContainer}>
            <img
              src="caminho-para-imagem.jpg"
              alt="Imagem de cadastro"
              style={styles.image}
            />
          </div>
        </Col>
      </Row>
    </section>
  );
}
