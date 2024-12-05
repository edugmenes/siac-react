import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUsersById, updateUser} from "../../api/user";
import dayjs from "dayjs";

const EditUserPage = () => {
  const [user, setUser] = useState();
  const [perfilChanged, setPerfilChanged] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [form] = Form.useForm();
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const userData = await getUsersById(userId);
        const dataNascimento = userData.data.data_nascimento
          ? dayjs(userData.data.data_nascimento) // Converte para dayjs
          : null;
        setUser(userData.data);
        form.setFieldsValue({
          nome: userData.data.nome,
          email: userData.data.email,
          celular: userData.data.celular,
          perfil: userData.data.perfil,
          data_nascimento: dataNascimento,
        });
      } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(user.idUser);
      notification.success({
        message: "Sucesso",
        description: "Usuário excluido com sucesso!",
      });
      navigate("/users");
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha na atualização: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = async (values) => {
    try {
      setIsLoading(true);
      const [key, label] = values.perfil.split("|");
      const formattedValues = {
        ...values,
        data_nascimento: values.data_nascimento.format("YYYY-MM-DD"),
        perfilId: perfilChanged ? key : user.id_perfil,
        perfilLabel: perfilChanged ? label : user.perfil,
        idUser: user.idUser,
      };
      await updateUser(formattedValues);
      console.log();
      notification.success({
        message: "Sucesso",
        description: "Usuário atualizado com sucesso!",
      });
      navigate("/users");
    } catch (error) {
      notification.error({
        message: "Erro",
        description: `Falha na atualização: ${error.message}`,
        
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <Typography.Title level={2} style={{ marginBottom: "30px" }}>
        Edição de Usuário
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        disabled={isLoading}
      >
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
                onChange={() => setPerfilChanged(true)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Data de Nascimento"
              name="data_nascimento"
              style={{ marginBottom: "40px" }}
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

        <Row gutter={24} justify="space-between">
          <Col span={12}>
            <Button
              danger
              size="large"
              style={{ width: "100%" }}
              loading={isLoading}
              onClick={handleDelete}
            >
              Excluir usuário
            </Button>
          </Col>
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
              loading={isLoading}
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