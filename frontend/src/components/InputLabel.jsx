import React from "react";
import { Col, Form, Input, Select } from "antd";

const { Item } = Form;
const { Option } = Select;

// Componente para inputs de texto:
export const TextLabel = ({
  name,
  label,
  placeholder,
  rules = [],
  type = "text",
  hasFeedback = false,
  dependencies = [],
}) => (
  <Col span={24}>
    <Item
      name={name}
      label={label}
      rules={rules}
      hasFeedback={hasFeedback}
      style={{ marginBottom: "10px" }}
      dependencies={dependencies}
      labelCol={{ flex: "0 0 150px" }} // Define a largura fixa do label
      wrapperCol={{ flex: "1" }} // Define o restante para o input
    >
      {type === "password" ? (
        <Input.Password placeholder={placeholder} />
      ) : (
        <Input type={type} placeholder={placeholder} />
      )}
    </Item>
  </Col>
);

// Componente para dropdown (Select):
export const DropdownLabel = ({
  name,
  label,
  placeholder,
  rules = [],
  options = [],
}) => (
  <Col span={24}>
    <Item
      name={name}
      label={label}
      rules={rules}
      style={{ marginBottom: "10px" }}
      labelCol={{ flex: "0 0 150px" }} // Define a largura fixa do label
      wrapperCol={{ flex: "1" }} // Define o restante para o input
    >
      <Select placeholder={placeholder}>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Item>
  </Col>
);

export default {
  TextLabel,
  DropdownLabel,
};
