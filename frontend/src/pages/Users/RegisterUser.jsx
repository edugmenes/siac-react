import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../../api/user";

const RegisterUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, ...values });
        setCurrentPage(2);
        form.resetFields(); // Limpa os campos para a próxima página
      })
      .catch((info) => {
        console.error("Erro na validação:", info);
      });
  };

  const handleBack = () => {
    setCurrentPage(1);
    form.setFieldsValue(formData); // Reinsere os valores salvos na primeira página
  };

  const handleFinish = async (values) => {
    // Combina os dados da segunda etapa com os da primeira
    const fullFormData = { ...formData, ...values };

    try {
      // Extrai e formata o perfil
      const perfilSelecionado = fullFormData.perfil;
      const [key, label] = perfilSelecionado.split("|");
      const formattedData = {
        ...fullFormData,
        perfilId: key,
        perfilLabel: label,
        data_nascimento: fullFormData.data_nascimento.format("YYYY-MM-DD"), // Converte a data para o formato adequado
      };

      // Chamada à API
      await apiRegister(formattedData);

      // Notificação de sucesso
      notification.success({
        message: "Sucesso",
        description: "Usuário cadastrado com sucesso!",
      });

      // Redireciona após o cadastro bem-sucedido
      navigate("/users");
    } catch (error) {
      // Notificação de erro
      notification.error({
        message: "Erro",
        description: `Falha no cadastro: ${error.message}`,
      });
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <Typography.Title level={2} style={{ marginBottom: "30px" }}>
        Cadastro de Usuário
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        disabled={isLoading}
      >
        {currentPage === 1 && (
          <>
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
                      { value: "1|administrador", label: "Administrador" },
                      { value: "2|paciente", label: "Paciente" },
                      { value: "4|professor", label: "Professor" },
                      { value: "3|recepcionista", label: "Recepcionista" },
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
                    placeholder="Selecione a data de nascimento"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} justify="space-around">
              <Button
                type="primary"
                size="large"
                style={{ width: "96%" }}
                onClick={handleNext}
              >
                Próximo
              </Button>
            </Row>
          </>
        )}

        {currentPage === 2 && (
          <>
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
                  label="Senha"
                  name="senha"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, insira uma senha!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Digite a senha" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Repetir Senha"
                  name="repetir_senha"
                  dependencies={["senha"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor, repita a senha!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("senha") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("As senhas não correspondem!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Repita a senha" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} justify="space-around">
              <Button
                size="large"
                style={{ width: "46.5%" }}
                onClick={handleBack}
              >
                Voltar
              </Button>
              <Button
                type="primary"
                size="large"
                style={{ width: "46.5%" }}
                loading={isLoading}
                onClick={() => form.submit()}
              >
                Cadastrar
              </Button>
            </Row>
          </>
        )}
      </Form>
    </div>
  );
};

export default RegisterUserPage;
