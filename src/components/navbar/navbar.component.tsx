import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@context/appContext";

// import { AiOutlineHome } from "react-icons/ai";
import { Avatar } from "@mui/material";
import styles from "./navbar.module.css";

const Navbar = () => {
  const { state } = useContext(Context);
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        <div className="row w-100">
          <div className="col-lg-9 col-md-6 col-sm-6 d-flex align-items-end">
            <Link className="text-decoration-none" to="/">
              <img
                className={styles.logo}
                src="/images/logo_cat_small.png"
                alt="logo"
              />
            </Link>
            <h2 className={`ps-1 my-auto ${styles["logo-text"]}`}>PetVA</h2>
          </div>
          {!state.user ? (
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="d-flex justify-content-center">
                <div className="text-end d-flex align-items-center justify-content-end m-2">
                  <button
                    className={`btn text-white fs-5 text-decoration-none rounded-pill text-white ${styles["btn-nav-register"]}`}
                    onClick={() => navigate("/register")}
                  >
                    Registrarse
                  </button>
                </div>
                <div className="text-end d-flex align-items-center justify-content-end">
                  <Link
                    className={`btn text-dark fs-5 text-decoration-none rounded-pill bg-light ${styles["btn-nav-login"]}`}
                    to="/login"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="d-flex justify-content-end">
                <div className="text-end">
                  {/* {localStorage.getItem("petvaUser") === "normal" && (
                    <Link
                      to="/user"
                      className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 me-1 fs-5"
                      style={{ width: "60px" }}
                    >
                      <AiOutlineHome className="navbar__button--icon text-decoration-none " />
                    </Link>
                  )}
                  {localStorage.getItem("petvaUser") === "foundation" && (
                    <Link
                      to="/foundation"
                      className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 me-1 fs-5"
                      style={{ width: "60px" }}
                    >
                      <AiOutlineHome className="navbar__button--icon text-decoration-none" />
                    </Link>
                  )}
                  {localStorage.getItem("petvaUser") === "clinic" && (
                    <Link
                      to="/clinic"
                      className="navbar__button text-decoration-none badge rounded-circle bg-dark px-3 py-3 me-1 fs-5"
                      style={{ width: "60px" }}
                    >
                      <AiOutlineHome className="navbar__button--icon text-decoration-none" />
                    </Link>
                  )}
                  {localStorage.getItem("petvaUser") === "doctor" && (
                    <Link
                      to="/doctor"
                      className="navbar__button text-decoration-none badge rounded-circle bg-dark px-3 py-3 me-1 fs-5"
                      style={{ width: "60px" }}
                    >
                      <AiOutlineHome className="navbar__button--icon text-decoration-none" />
                    </Link>
                  )} */}
                </div>

                <div className="dropdown dropstart">
                  <button
                    className="dropstart"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {state.user && (
                      <Avatar
                        alt={state.user.name}
                        src={state.user.picture}
                        sx={{ width: 60, height: 60 }}
                      />
                    )}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-left rouned-3"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <div className="container px-1">
                      <div className="d-flex justify-content-center me-5 pe-5 ms-2 pt-1">
                        {state.user && (
                          <>
                            <Avatar
                              alt={state.user.name}
                              src={state.user.picture}
                              sx={{ width: 45, height: 45 }}
                            />
                            <h5 className="my-auto ms-2">{state.user.name}</h5>
                          </>
                        )}
                      </div>
                      <div className="text-center d-grid">
                        {/* {
                          //state.user detalle navbar
                          store.userType === "normal" && !!store.userDetail && (
                            <>
                              <hr />
                              <Link
                                to="/user/profile"
                                className="justify-content-start d-flex ms-2 text-decoration-none text-dark"
                              >
                                Perfil
                              </Link>
                              <span className="justify-content-start d-flex ms-2">
                                Ajustes
                              </span>
                              <Link
                                to="/user/pets"
                                className="justify-content-start d-flex ms-2 text-decoration-none text-dark"
                              >
                                Mis Mascotas
                              </Link>
                              <span className="justify-content-start d-flex ms-2">
                                Ayuda
                              </span>
                              <hr className="my-1" />
                              <div className="row">
                                <Link
                                  to="/"
                                  onClick={actions.logOut}
                                  className="justify-content-start d-flex ms-2 text-decoration-none text-dark"
                                >
                                  Cerrar Sesión
                                </Link>
                              </div>
                            </>
                          )
                        }
                        {
                          //fundacion detalles navbar
                          store.userType === "foundation" &&
                            !!store.foundationDetail && (
                              <>
                                <hr />
                                <Link
                                  to="/foundation/profile"
                                  className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                >
                                  Perfil
                                </Link>
                                <span className="justify-content-start d-flex ms-2 mb-1">
                                  Ajustes
                                </span>
                                <Link
                                  to="/foundation/pets/adoption"
                                  className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                >
                                  Mascotas en adopción
                                </Link>
                                <span className="justify-content-start d-flex ms-2 mb-1">
                                  Ayuda
                                </span>
                                <hr className="my-1" />
                                <div className="row">
                                  <Link
                                    to="/"
                                    onClick={actions.logOut}
                                    className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                  >
                                    Cerrar Sesión
                                  </Link>
                                </div>
                              </>
                            )
                        }
                        {store.userType === "clinic" &&
                          !!store.clinicDetail && (
                            <>
                              <hr />
                              <Link
                                to="/clinic/profile"
                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                              >
                                Perfil
                              </Link>
                              <span className="justify-content-start d-flex ms-2 mb-1">
                                Ajustes
                              </span>
                              <Link
                                to="/clinic/doctor"
                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                              >
                                Mis Medicos
                              </Link>
                              <span className="justify-content-start d-flex ms-2 mb-1">
                                Ayuda
                              </span>
                              <hr className="my-1" />
                              <div className="row">
                                <Link
                                  to="/"
                                  onClick={actions.logOut}
                                  className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                >
                                  Cerrar Sesión
                                </Link>
                              </div>
                            </>
                          )}
                        {store.userType === "doctor" &&
                          !!store.doctorDetail && (
                            <>
                              <hr />
                              <Link
                                to="/doctor/profile"
                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                              >
                                Perfil
                              </Link>
                              <span className="justify-content-start d-flex ms-2 mb-1">
                                Ajustes
                              </span>
                              <Link
                                to="/doctor/calendar"
                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                              >
                                Calendario
                              </Link>
                              <span className="justify-content-start d-flex ms-2 mb-1">
                                Ayuda
                              </span>
                              <hr className="my-1" />
                              <div className="row">
                                <Link
                                  to="/"
                                  onClick={actions.logOut}
                                  className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                >
                                  Cerrar Sesión
                                </Link>
                              </div>
                            </>
                          )} */}
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
