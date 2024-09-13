import React from "react";
import CardComponent from "../../components/Card";
import calendarImage from "../../images/calendar-button.png";
import scheduleImage from "../../images/notes-button.png";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <CardComponent
        title="Agendar Consultas"
        pathImage={calendarImage}
        redirectPath="/appointments/schedule"
      />
      <CardComponent
        title="Criar Agendas"
        pathImage={calendarImage}
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
