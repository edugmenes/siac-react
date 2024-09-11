import React from "react";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DownOutlined,
  FolderOutlined,
  HomeOutlined,
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
    link: "/painel",
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
    key: "6",
    label: "Configurações",
    link: "/settings",
    icon: <SettingOutlined style={{ fontSize: "24px" }} />,
  },
];

const handleLogout = () => {
  localStorage.removeItem('authToken'); // Remover o token específico
  window.location.href = '/login';  // Redirecionar para a página de login
};

const userMenu = (
  <Menu>
    <Menu.Item key="1" style={{ padding: 0 }}>
      <Button
        type="text"
        onClick={handleLogout}
        style={{ width: "100%", textAlign: "center", padding: "10px 0" }}
      >
        Sair
      </Button>
    </Menu.Item>
  </Menu>
);

const pageLayout = ({ children }) => (
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
        SIAC
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
            <span>Henrique Augusto Debia</span>
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
      <Layout style={{ padding: "0 24px 24px" }}>
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

export default pageLayout;
