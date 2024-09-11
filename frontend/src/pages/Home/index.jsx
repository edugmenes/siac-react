import React from "react";
import CardComponent from "../../components/Card";
import scheduleImage from "../../images/1.webp";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <CardComponent
        title="Agendar Consultas"
        pathImage={scheduleImage}
        redirectPath="/appointments/schedule"
      />
      <CardComponent
        title="Criar Agendas"
        pathImage={scheduleImage}
        redirectPath="/painel"
      />
      <CardComponent
        title="Prontuários"
        pathImage={scheduleImage}
        redirectPath="/painel"
      />
    </div>
  );
};

export default Home;
