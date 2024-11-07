import React from "react";

const Dashboard = () => {
  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <iframe
        title="Painel SIAC"
        src="https://app.powerbi.com/reportEmbed?reportId=ea59471b-5290-4df9-87c7-6a75d13b0aaa&autoAuth=true&embeddedDemo=true"
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Dashboard;
