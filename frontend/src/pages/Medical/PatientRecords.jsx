import React from "react";
import { Form, Input, Button, DatePicker, Typography, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const PatientRecords = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Prontuário salvo:', values);
    // Aqui você pode enviar os dados para uma API ou realizar outra ação
  };

  return (
    <div>
      <Typography.Title level={2}>Prontuários</Typography.Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="date"
          label="Data da Consulta"
          rules={[{ required: true, message: "Por favor, selecione a data!" }]}
        >
          <DatePicker showTime format="DD/MM/YYYY HH:mm" />
        </Form.Item>

        <Form.Item
          name="diagnosis"
          label="Diagnóstico"
          rules={[{ required: true, message: "Por favor, insira o diagnóstico!" }]}
        >
          <Input placeholder="Digite o diagnóstico" />
        </Form.Item>

        <Form.Item
          name="professional"
          label="Profissional Responsável"
          rules={[{ required: true, message: "Por favor, selecione o profissional!" }]}
        >
          <Select placeholder="Selecione o profissional">
            <Option value="psicologo1">Psicólogo 1</Option>
            <Option value="psicologo2">Psicólogo 2</Option>
          </Select>
        </Form.Item>

        {/* Observações vai agora para o final */}
        <Form.Item
          name="observations"
          label="Observações"
          rules={[{ required: true, message: "Por favor, insira as observações!" }]}
        >
          <TextArea
            rows={4}
            autoSize={{ minRows: 4, maxRows: 8 }}  // O campo aumentará de tamanho conforme o texto cresce
            placeholder="Digite as observações do prontuário"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Prontuário
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PatientRecords;
