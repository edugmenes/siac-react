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
        redirectPath="/appointment/scheduling"
      />
      <CardComponent
        title="Criar Agendas"
        pathImage={calendarImage}
        redirectPath="/agenda/create-agenda"
      />
      <CardComponent
        title="Prontuários"
        pathImage={scheduleImage}
        redirectPath="/medical/patient-records"
      />
    </div>
  );
};

export default Home;
