import React, { useEffect, useState } from "react";
import CardComponent from "../../components/Card";
import calendarImage from "../../images/calendar-button.png";
import scheduleImage from "../../images/notes-button.png";
import actionImage from "../../images/action-button.png";
import dashboardImage from "../../images/dashboard-button.png";
import folderImage from "../../images/folder-button.png";
import { jwtDecode } from "jwt-decode";
import { getUsersById } from "../../api/authentication";

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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        justifyContent: "left",
      }}
    >
      {hasPermission("full_access") && (
        <CardComponent
          title="Painel"
          pathImage={dashboardImage}
          redirectPath="/panel/dashboards"
        />
      )}

      {hasPermission("agendar_consultas") && (
        <CardComponent
          title="Agendamentos"
          pathImage={actionImage}
          redirectPath="/appointment/scheduling"
        />
      )}

      {hasPermission("criar_agenda") && (
        <CardComponent
          title="Agendas"
          pathImage={calendarImage}
          redirectPath="/agenda/create-agenda"
        />
      )}

      {hasPermission("criar_prontuario") && (
        <CardComponent
          title="Prontuários"
          pathImage={folderImage}
          redirectPath="/medical/patient-records"
        />
      )}

      {hasPermission("criar_relatorio") && (
        <CardComponent
          title="Relatórios"
          pathImage={scheduleImage}
          redirectPath="/reports"
        />
      )}
    </div>
  );
};

export default Home;
