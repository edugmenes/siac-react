import { PlusOutlined } from "@ant-design/icons";
import { Button, Row, Table, Typography } from "antd";
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
      const response = await getPatientRecords();
      setRecords(response.prontuarios);
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
      title: "Nome do paciente",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "Diagnóstico",
      dataIndex: "diagnosis",
      key: "diagnosis",
    },
    {
      title: "Observações",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}`;
      },
    },
  ];

  return (
    <>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: "40px" }}
      >
        <Typography.Title level={2}>Prontuários</Typography.Title>
        <Button type="link" size="large" onClick={handleCreate}>
          <PlusOutlined /> Criar prontuário
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
