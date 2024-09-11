import "bootstrap/dist/css/bootstrap.min.css";
import psychologyImage from "../../images/psychology2.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../../api/userAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiLogin(email, password);
      alert("Sucesso no login!");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      alert("Falha no login.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-5 text-black">
            <div className="px-4 ms-xl-4">
              <i
                className="fas fa-crosw fa-2x me-3 pt-5 mt-xl-4"
                style={{ color: "#709085" }}
              ></i>
              <p className="h1 fw-semibold mb-0" style={{ fontSize: "3.5em" }}>
                SIAC
              </p>
              <p className="h5 fw-light mt-2" style={{ fontSize: "1.1em" }}>
                Sistema Integrado de Atendimento às Clínicas
              </p>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                <h3
                  className="fw-medium mb-2 pb-2"
                  style={{ fontSize: "1.5em" }}
                >
                  Log In
                </h3>

                <div data-mdb-input-init className="form-outline mb-2">
                  <input
                    id="form2Example18"
                    className="form-control form-control-lg"
                    style={{ fontSize: "1em" }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <label
                    className="form-label"
                    for="form2Example18"
                    style={{ fontSize: "1em" }}
                  >
                    Endereço de email
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    id="form2Example28"
                    className="form-control form-control-lg"
                    style={{ fontSize: "1em" }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <label
                    className="form-label"
                    for="form2Example28"
                    style={{ fontSize: "1em" }}
                  >
                    Senha
                  </label>
                </div>

                <div className="pt-1 mb-3">
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-info btn-lg btn-block"
                    style={{
                      backgroundColor: "#1a73e8",
                      color: "white",
                      borderColor: "white",
                    }}
                    type="sumbit"
                  >
                    Log In
                  </button>
                </div>

                <p className="small mb-4 pb-lg-2">
                  <a className="text-muted" href="#!">
                    Esqueceu a senha?
                  </a>
                </p>
                <p>
                  Ainda não tem conta?{" "}
                  <a href="#!" className="link-info">
                    Cadastre-se aqui
                  </a>
                </p>
              </form>
            </div>
          </div>

          <div className="col-sm-7 px-0 d-none d-sm-block">
            <img
              src={psychologyImage}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
