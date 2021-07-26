import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const HomeDoctor = () => {
    const history = useHistory();
    const {store} = useContext(Context)
    return (
        <>
            {
                !!localStorage.getItem('petvaToken') ?
                    <div className="container">
                        {
                        !!store.doctorDetail &&
                        <div className="text-center my-4">
                            <h2 className="display-1">Bienvenido {store.doctorDetail.name}</h2>
                        </div>
                        }
                        <div className="row">
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/doctor/add/reservation" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Generar hora para reserva
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 text-center d-flex justify-content-center">
                                <Link to="/doctor" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Ver mis medicos
                                </Link>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/doctor/calendar" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Calendario
                                </Link >
                            </div>

                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/services" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Servicios
                                </Link >
                            </div>
                        </div>
                    </div>
                :
                    history.push("/doctor/login")
            }
        </>
    );
}
export default HomeDoctor;