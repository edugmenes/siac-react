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
import AppointmentRescheduling from "./pages/Appointment/AppointmentRescheduling.jsx";
import UsersList from "./pages/Users/UsersList.jsx";
import EditUserPage from "./pages/Users/EditUser.jsx";
import RegisterUserPage from "./pages/Users/RegisterUser.jsx";
import PatitentRecors from "./pages/Medical/PatientRecords.jsx";
import Dashboard from "./pages/Panel/Dashboards.jsx";
import InternalReports from "./pages/Reports/InternReports.jsx";

// Componente ProtectedRoute - Verifica se o usuário está autenticado:
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Verifica se o JWT está armazenado no localStorage
  return isAuthenticated ? children : <Navigate to="/login" />; // Renderiza filhos ou redireciona para o login
};

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Rotas de login e autenticação: */}
      <Route path="/login" element={<Login />} />
      <Route path="register-user" element={<RegisterUser />} />

      {/* Rotas protegidas (apenas para usuários cadastrados e autenticados/logados): */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PageLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agenda/create-agenda"
          element={
            <ProtectedRoute>
              <CreateAgenda />
            </ProtectedRoute>
          }
        />
        <Route
          path="documents"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <ProtectedRoute>
              <Appointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/scheduling"
          element={
            <ProtectedRoute>
              <AppointmentScheduling />
            </ProtectedRoute>
          }
        />
        <Route
          path="appointment/rescheduling/:recordId"
          element={
            <ProtectedRoute>
              <AppointmentRescheduling />
            </ProtectedRoute>
          }
        />
        <Route
          path="bin"
          element={
            <ProtectedRoute>
              <Bin />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/:userId"
          element={
            <ProtectedRoute>
              <EditUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="users/register"
          element={
            <ProtectedRoute>
              <RegisterUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medical/patient-records"
          element={
            <ProtectedRoute>
              <PatitentRecors />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/panel/dashboards"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <InternalReports />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
