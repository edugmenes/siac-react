import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom"; // Importando o useNavigate

const CardComponent = ({ title, pathImage, redirectPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(redirectPath);
  };

  return (
    <Card
      style={{ width: 300, cursor: "pointer", marginLeft: "30px" }}
      cover={<img alt="exemplo" src={pathImage} onClick={handleClick} />}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "40px",
          marginTop: "auto",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "1.5em" }}>{title}</h3>
      </div>
    </Card>
  );
};

export default CardComponent;
