import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Grid, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../../api/userAuthentication";
import backgroundImage from "../../images/login-background.jpg";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await apiLogin(values.email, values.password);
      alert("Sucesso no login!");
      navigate("/"); // Redireciona para a página inicial após o login bem-sucedido
    } catch (error) {
      alert("Falha no login.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
        }}
      >
        <Title
          level={1}
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "40px",
            fontWeight: "semi-bold",
          }}
        >
          SIAC
        </Title>
        <Text
          type="secondary"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "20px",
          }}
        >
          Sistema Integrado de Atendimento às Clínicas
        </Text>
        <Text
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          Entrar
        </Text>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Por favor insira seu email!" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Por favor insira sua senha!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembrar-me</Checkbox>
            </Form.Item>

            <Link to="/forgot-password" style={{ float: "right" }}>
              Esqueceu a senha?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Log In
            </Button>
          </Form.Item>

          <Form.Item>
            <Text type="secondary">
              Ainda não tem conta?{" "}
              <Link to="/register-user">Cadastre-se aqui</Link>
            </Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
