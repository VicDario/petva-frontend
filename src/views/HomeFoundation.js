import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const HomeFoundation = () => {
    const { store } = useContext(Context);
    let { token } = store;
    const history = useHistory();

    return (
        <>
        {
            !!localStorage.getItem("token") !== null ? 
                (
                    <div className="container">
                        <div className="text-center my-4">
                            <h2 className="display-1">Bienvenido Fundación</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/foundation/profile" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Mis Datos
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                    Perdidos y Encontrados
                                </button>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/foundation/pets/adoption" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Mascotas en Adopción
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/foundation/pets/tracking" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Mascotas Adoptadas o con dueño
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/services" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Servicios
                                </Link >
                            </div>
                        </div>
                    </div>
                ) 
            : 
                history.push("/foundation/login")
            }
        </>
    );
}
export default HomeFoundation;