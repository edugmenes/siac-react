import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Row, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientRecords } from "../api/patientRecords";

const PatientRecordsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/medical/patient-records");
  };

  const fetchRecords = async () => {
    setIsLoading(true);
    try {
      console.log('a')
      const response = await getPatientRecords();

      console.log('response', response)
      setRecords(response);
    } catch (error) {
      console.error("Erro ao buscar os prontuarios: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
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
          dataSource={records}
          loading={isLoading}
          style={{ width: "100%" }}
        />
      </Row>
    </>
  );
};

export default PatientRecordsList;
