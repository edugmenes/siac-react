import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../api/user";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/users/register");
  };

  const handleEdit = (record) => {
    navigate(`/users/${record.idUser}`);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();

      if (response && response.data) {
        // Ordena os usuários pelo `idUser` em ordem decrescente
        const sortedUsers = response.data.sort((a, b) => b.idUser - a.idUser);
        setUsers(sortedUsers);
      }
    } catch (error) {
      console.error("Erro ao buscar os usuários: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      width: 220,
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "email",
      width: 300,
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
      width: 200,
    },
    {
      title: "Perfil",
      dataIndex: "perfil",
      key: "perfil",
      width: 195,
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
        <Typography.Title level={2}> Usuários </Typography.Title>
        <Button type="link" size="large" onClick={handleCreate}>
          <PlusOutlined /> Criar usuário
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default UsersList;
