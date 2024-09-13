import React, { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/login-background-dark.jpg";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onFinish = async (values) => {
    try {
      // Aqui você pode implementar a lógica de envio do link
      alert("Um link de recuperação foi enviado para o seu email!");
    } catch (error) {
      alert("Erro ao enviar o link.");
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
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "semi-bold",
          }}
        >
          Esqueceu a senha
        </Title>

        <Text
          type="secondary"
          style={{
            textAlign: "center",
            display: "block",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          Digite seu email e enviaremos um link com uma senha temporária para
          você
        </Text>

        <Form
          name="forgotPassword"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Enviar link
            </Button>
          </Form.Item>

          <Form.Item>
            <Text type="secondary">
              Lembrou a senha? <Link to="/login">Voltar para o login</Link>
            </Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
