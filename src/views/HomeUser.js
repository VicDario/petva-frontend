import { Link, useHistory } from "react-router-dom";
import { FcOvertime } from "react-icons/fc"
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import LoadingSpiner from "../Components/LoadingSpinner";
const HomeUser = () => {
    const history = useHistory();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getUserDetail();
        actions.getMascotasUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container-fluid">
                        {
                            !!store.userDetail && !!store.pets ?
                                store.pets.length > 0 ?
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center align-items-center flex-column">
                                            <h2 className="text-center my-4 title-home">Bienvenido, {store.userDetail.name}</h2>
                                            <Link to="/user/reserve"
                                                className="btn-home link-green d-flex justify-content-between align-items-center my-4">
                                                <span className="m-0">
                                                    <img className="" src="/images/calendario.png" alt=""/>
                                                </span>
                                                <p>Reservar Cita Veterinaria</p>
                                            </Link >
                                            <Link to="/user/reservations"
                                                className="btn-home link-green d-flex justify-content-between align-items-center my-4">
                                                <span className="fs-1 m-0">
                                                    <img className="" src="/images/reloj.png" />
                                                </span>
                                                <p>Ver mis citas</p>
                                            </Link >
                                        </div>
                                        <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center">
                                            <img src="/images/dog_home.png" className="image-home" alt="Perro"/>
                                        </div>
                                    </div>
                                :
                                    <div
                                        className="col-sm-12 py-4 d-flex justify-content-center"
                                    >
                                        <Link to="/user/pets/add"
                                            className="btn btn-success btn-lg text-center">
                                            Comencemos agregando tu mascota
                                        </Link>
                                    </div>
                            : 
                            <LoadingSpiner />
                        }
                    </div>
                    :
                    history.push("/user/login")
            }
        </>
    )
}

export default HomeUser;