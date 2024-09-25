import React, { useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FolderOutlined,
  HomeOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    label: "Inicio",
    link: "/",
    icon: <HomeOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "2",
    label: "Painel",
    link: "/painel/dashboards",
    icon: <AppstoreOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "3",
    label: "Documentos",
    link: "/documents",
    icon: <FolderOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "4",
    label: "Histórico de Consultas",
    link: "/appointments",
    icon: <ScheduleOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "5",
    label: "Lixeira",
    link: "/bin",
    icon: <DeleteOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "7",
    label: "Usuários",
    link: "/users",
    icon: <UserOutlined style={{ fontSize: "24px" }} />,
  },
  {
    key: "6",
    label: "Configurações",
    link: "/settings",
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
  },
];

const handleLogout = () => {
  localStorage.removeItem("authToken"); // Remover o token específico
  window.location.href = "/login"; // Redirecionar para a página de login
};

const userMenu = (
  <Menu>
    <Menu.Item key="1" icon={<EditOutlined />}>
      Editar Perfil
    </Menu.Item>
    <Menu.Item key="2" icon={<QuestionCircleOutlined />}>
      Ajuda
    </Menu.Item>
    <Menu.Item key="3" icon={<LogoutOutlined />} danger onClick={handleLogout}>
      Sair
    </Menu.Item>
  </Menu>
);

const PageLayout = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodifica o token
        setUserName(decodedToken.userName); // Armazena o nome do usuário
      } catch (error) {
        console.error(
          "Erro ao decodificar token para obter nome de usuário: ",
          error
        );
      }
    }
  }, []);

  return (
    <Layout>
      <Header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#001529",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            margin: "0",
            color: "#fff",
            fontSize: "40px",
            marginLeft: "40px",
          }}
        >
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            SIAC
          </Link>
        </h1>

        <Dropdown overlay={userMenu} trigger={["click"]}>
          <button
            onClick={(e) => e.preventDefault()}
            style={{
              color: "#fff",
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Space>
              <Avatar icon={<UserOutlined />} />
              <span>{userName || "Usuário"}</span>
              <DownOutlined />
            </Space>
          </button>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={230} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", height: "100vh" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 600,
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            SIAC ©{new Date().getFullYear()} Todos os direitos reservados.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
