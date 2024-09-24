import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Input, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/userAuthentication";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingKey, setEditingKey] = useState(null); // ID da linha em edição
  const [editedValues, setEditedValues] = useState({}); // Valores editados da linha

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/users/new");
  };

  // Função para iniciar o modo de edição
  const handleEdit = (record) => {
    setEditingKey(record.id); // Define qual linha está sendo editada
    setEditedValues(record); // Inicializa com os valores da linha atual
  };

  // Função para salvar as edições
  const handleSave = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...editedValues } : user
    );
    setUsers(updatedUsers);
    setEditingKey(null); // Encerra o modo de edição
  };

  // Função para cancelar as edições
  const handleCancel = () => {
    setEditingKey(null); // Sai do modo de edição sem salvar
    setEditedValues({}); // Limpa os valores editados
  };

  // Função para capturar as mudanças nos inputs
  const handleInputChange = (key, value) => {
    setEditedValues((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os usuários: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editedValues.nome}
            onChange={(e) => handleInputChange("nome", e.target.value)}
          />
        ) : (
          record.nome
        ),
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editedValues.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        ) : (
          record.email
        ),
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editedValues.celular}
            onChange={(e) => handleInputChange("celular", e.target.value)}
          />
        ) : (
          record.celular
        ),
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
      render: (_, record) =>
        editingKey === record.id ? (
          <Input
            value={editedValues.perfil}
            onChange={(e) => handleInputChange("perfil", e.target.value)}
          />
        ) : (
          record.perfil
        ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) =>
        editingKey === record.id ? (
          <Space size="middle">
            <Button
              onClick={() => handleSave(record.id)}
              type="link"
              icon={<SaveOutlined />}
            />
            <Button
              onClick={handleCancel}
              type="link"
              icon={<CloseOutlined />}
              style={{ color: "red" }}
            />
          </Space>
        ) : (
          <Button
            onClick={() => handleEdit(record)}
            type="link"
            icon={<EditOutlined />}
          />
        ),
    },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "40px" }}
      >
        <Typography.Title level={2}>Usuários</Typography.Title>
        <Button type="link" size="large" onClick={handleCreate}>
          <PlusOutlined /> Criar usuário
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey="id"
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default UsersList;
