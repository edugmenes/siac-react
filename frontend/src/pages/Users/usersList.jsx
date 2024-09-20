import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/userAuthentication";
const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/users/new");
  };

  const handleEdit = (record) => {
    // Lógica para abrir um modal ou formulário para editar os dados de record
    console.log("Editar usuário:", record);
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
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
    },
    {
      title: "Ações",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="link">
            <EditOutlined />
          </Button>
        </Space>
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
        <Typography.Title level={2}>Consultas</Typography.Title>
        <Button type="link" size="large" onClick={handleCreate}>
          <PlusOutlined /> Criar usuário
        </Button>
      </Row>
      <Row>
        <Table columns={columns} dataSource={users} style={{ width: "100%" }} />
      </Row>
    </>
  );
};

export default UsersList;
