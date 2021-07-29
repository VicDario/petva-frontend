import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
const HomeClinic = () => {
    const history = useHistory();
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.getClinicDetail();
        actions.getClinicDoctor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            {
                !!localStorage.getItem('petvaToken') ?
                    (
                        <div className="container">
                            {
                                !!store.clinicDetail &&
                            <div className="text-center my-4">
                                <h2 className="display-1">Bienvenido {store.clinicDetail.name}</h2>
                            </div>
                            }
                            <div className="row">
                                <div className="col-sm-12 col-md-4 d-flex justify-content-center">
                                    <Link to="/clinic/doctor/register" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                        Registrar un medico
                                    </Link >
                                </div>
                                <div className="col-sm-12 col-md-4 text-center d-flex justify-content-center">
                                    <Link to="/clinic/doctor" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                        Ver mis medicos
                                    </Link>
                                </div>
                                <div className="col-sm-12 col-md-4 d-flex justify-content-center">
                                    <Link to="/clinic/calendar" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                        Calendario
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
