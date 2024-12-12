import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpiner from "../Components/loading-spiner.component";

const HomeClinic = () => {
    const history = useHistory();
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.getClinicDetail();
        actions.getClinicDoctor();
        if(localStorage.getItem("petvaUser") !== 'clinic') history.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container-fluid">
                        {
                            !!store.clinicDetail ?
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center align-items-center flex-column">
                                        <h2 className="text-center my-4 title-home">Bienvenido, {store.clinicDetail.name}</h2>
                                        <Link
                                            to="/clinic/doctor/register"
                                            className="btn-home link-green d-flex justify-content-between align-items-center my-4"
                                        >
                                            <span className="m-0">
                                                <img className="icon-link" src="/images/registration.png" alt="Registrar"/>
                                            </span>
                                            <p>Registrar Doctor</p>
                                        </Link>
                                        <Link
                                            to="/clinic/doctor"
                                            className="btn-home link-green d-flex justify-content-between align-items-center my-4"
                                        >
                                            <span className="fs-1 m-0">
                                                <img className="icon-link" src="/images/human-research.png" alt="Ver doctores" />
                                            </span>
                                            <p>Ver Doctores</p>
                                        </Link>
                                        <Link
                                            to="/clinic/calendar"
                                            className="btn-home link-green d-flex justify-content-between align-items-center my-4"
                                        >
                                            <span className="fs-1 m-0">
                                                <img className="icon-link" src="/images/calendario.png" alt="Calendario" />
                                            </span>
                                            <p>Calendario</p>
                                        </Link>
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center">
                                        <img src="/images/dog_home.png" className="image-home" alt="Perro"/>
                                    </div>
                                </div>

                            :
                                <LoadingSpiner />
                        }
                    </div>
                :
                    history.push("/clinic/login")
            }
        </>
    );
}
export default HomeClinic;
