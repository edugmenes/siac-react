import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/index.jsx";
import Home from "./pages/Home";
import PageLayout from "./pages/PageLayout.js";
import Settings from "./pages/Settings";
import Painel from "./pages/Painel";
import Documents from "./pages/Documents";
import Bin from "./pages/Help";
import Appointments from "./pages/Appointments/Appointments";
import AppointmentSchedule from "./pages/Appointments/AppointmentSchedule";

// Componente ProtectedRoute - Verifica se o usuário está autenticado:
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Verifica se o JWT está armazenado no localStorage
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute element={PageLayout} />}>
        <Route index element={<ProtectedRoute element={Home} />} />
        <Route path="painel" element={<ProtectedRoute element={Painel} />} />
        <Route
          path="documents"
          element={<ProtectedRoute element={Documents} />}
        />
        <Route
          path="appointments"
          element={<ProtectedRoute element={Appointments} />}
        />
        <Route
          path="appointments/schedule"
          element={<ProtectedRoute element={AppointmentSchedule} />}
        />
        <Route path="bin" element={<ProtectedRoute element={Bin} />} />
        <Route
          path="settings"
          element={<ProtectedRoute element={Settings} />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
