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
        if (localStorage.getItem("petvaUser") !== 'normal') {
            history.push("/user/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container-fluid">
                        {
                            !!store.userDetail &&
                            <div className="row">
                                <div className="col-md-6 my-1 d-flex justify-content-center ps-5">
                                    <div className="my-4">
                                        <h2 className="fw-bold title-home">Bienvenido, {store.userDetail.name}</h2>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            !!store.pets ?
                                store.pets.length > 0 ?
                                    <>
                                    <div className="row">
                                        <div className="col-md-6 my-1 d-flex justify-content-center pb-3">
                                            <Link to="/user/reserve"
                                                className="link-green btn-home">
                                                <span className="fs-1 m-0"><FcOvertime /></span>
                                                <p>Reservar</p>
                                                <p>Hora Veterinaria</p>
                                            </Link >
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 my-1 d-flex justify-content-center">
                                            <Link to="/user/reservations"
                                                className="link-green btn-home">
                                                <span className="fs-1 m-0"><FcOvertime /></span>
                                                <p>Ver y editar</p>
                                                <p>mis horas veterinarias</p>
                                            </Link >
                                        </div>
                                    </div>
                                    </>
                                :
                                    <div
                                        className="col-sm-12 py-4 d-flex justify-content-center">
                                        <Link to="/user/pets/add"
                                            className="btn btn-success btn-lg text-center">
                                            Comencemos agregando tu mascota
                                        </Link>
                                    </div>
                                : <LoadingSpiner />
                        }
                    </div>
                    :
                    history.push("/user/login")
            }
        </>
    )
}

export default HomeUser;