import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const HomeClinic = ()=>{
    const { store } = useContext(Context);
    let { token } = store;
    const history = useHistory();

    return (
        <>
        {
            token !==null ?
                (
                    <div className="container">
                        <div className="text-center my-4">
                            <h2 className="display-1">Bienvenido Clinica</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/clinic/profile" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Datos de mi clinica
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                    Perdidos y Encontrados
                                </button>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/clinic" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                Registrar un medico
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/clinic" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Lorem ipsum dolor sit amet
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
                history.push("/clinic/login")
        }
        </>
    );
}
export default HomeClinic;
