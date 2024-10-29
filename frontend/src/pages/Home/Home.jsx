import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import calendarImage from "../../images/calendar-button.png";
import scheduleImage from "../../images/notes-button.png";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setPermissions(decodedToken.permissions || []);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  // Verifica se o usuário tem a permissão específica:
  const hasPermission = (permission) => {
    return (
      permissions.includes("full_access") || permissions.includes(permission)
    );
  };

  return (
    <div style={{ display: "flex" }}>
      {hasPermission("agendar_consultas") && (
        <CardComponent
          title="Agendar Consultas"
          pathImage={calendarImage}
          redirectPath="/appointment/scheduling"
        />
      )}

      {hasPermission("cadastrar_agenda") && (
        <CardComponent
          title="Criar Agendas"
          pathImage={calendarImage}
          redirectPath="/agenda/create-agenda"
        />
      )}

      {hasPermission("criar_prontuario") && (
        <CardComponent
          title="Prontuários"
          pathImage={scheduleImage}
          redirectPath="/medical/patient-records"
        />
      )}
    </div>
  );
};

export default Home;
