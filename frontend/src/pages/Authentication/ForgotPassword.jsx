import React, { useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ForgotPasswordModal = ({ isVisible, handleCancel }) => {
  const [email, setEmail] = useState("");

  const onFinish = async (values) => {
    try {
      // Aqui você pode implementar a lógica de envio do link
      alert("Um link de recuperação foi enviado para o seu email!");
      handleCancel();
    } catch (error) {
      alert("Erro ao enviar o link.");
    }
  };

  return (
    <Modal
      title={null}
      visible={isVisible}
      onCancel={handleCancel}
      footer={null}
      centered={true} // Garante que o modal apareça no centro da telao
    >
      <div
        style={{
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Title
          level={2}
          style={{ marginBottom: "10px", fontWeight: "semi-bold" }}
        >
          Esqueceu a senha
        </Title>

        <Text
          type="secondary"
          style={{
            display: "block",
            marginBottom: "20px",
            fontSize: "15px",
          }}
        >
          Digite seu email que enviaremos uma nova senha para você
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
        </Form>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
