import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpiner from "../Components/loading-spiner.component";

const HomeDoctor = () => {
    const history = useHistory();
    const {store} = useContext(Context)

    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container-fluid">
                        {
                            !!store.doctorDetail ?
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center align-items-center flex-column">
                                        <h2 className="text-center my-4 title-home">Bienvenido, {store.doctorDetail.name}</h2>
                                        <Link
                                            to="/doctor/calendar"
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
                    history.push("/doctor/login")
            }
        </>
    );
}
export default HomeDoctor;
