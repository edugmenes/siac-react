import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Authentication/Login.jsx";
import RegisterUser from "./pages/Authentication/RegisterUser.jsx";
import Home from "./pages/Home/Home.jsx";
import PageLayout from "./components/PageLayout.jsx";
import Settings from "./pages/Settings.jsx";
import CreateAgenda from "./pages/Agenda/CreateAgenda.jsx";
import Documents from "./pages/Documents.jsx";
import Bin from "./pages/Help.jsx";
import Appointment from "./pages/Appointment/Appointment.jsx";
import AppointmentScheduling from "./pages/Appointment/AppointmentScheduling.jsx";
import UsersList from "./pages/Users/usersList.jsx";
import EditUserPage from "./pages/Users/editUser.jsx";
import PatitentRecors from "./pages/Medical/PatientRecords.jsx";

// Componente ProtectedRoute - Verifica se o usuário está autenticado:
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Verifica se o JWT está armazenado no localStorage
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Rotas de login e autenticação: */}
      <Route path="/login" element={<Login />} />
      <Route path="register-user" element={<RegisterUser />} />

      {/* Rotas protegidas (apenas para usuários cadastrados e autenticados/logados): */}
      <Route path="/" element={<ProtectedRoute element={PageLayout} />}>
        <Route index element={<ProtectedRoute element={Home} />} />
        <Route
          path="/agenda/create-agenda"
          element={<ProtectedRoute element={CreateAgenda} />}
        />
        <Route
          path="documents"
          element={<ProtectedRoute element={Documents} />}
        />
        <Route
          path="appointments"
          element={<ProtectedRoute element={Appointment} />}
        />
        <Route
          path="appointment/scheduling"
          element={<ProtectedRoute element={AppointmentScheduling} />}
        />
        <Route path="bin" element={<ProtectedRoute element={Bin} />} />
        <Route
          path="users/:userId"
          element={<ProtectedRoute element={EditUserPage} />}
        />
        <Route path="users" element={<ProtectedRoute element={UsersList} />} />
        <Route
          path="/medical/patient-records"
          element={<ProtectedRoute element={PatitentRecors} />}
        />
        <Route
          path="settings"
          element={<ProtectedRoute element={Settings} />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
