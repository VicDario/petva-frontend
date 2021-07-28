import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";


const DoctorProfileDetail = () => {
    const { actions, store } = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        actions.getDoctorDetail();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (<>
        {
            !!localStorage.getItem("petvaToken") ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Mis Datos</h1>
                        </div>
                        <div>
                            {
                                !!store.doctorDetail &&
                                <div className="card mb-3" >
                                    <div className="row g-0">
                                        <div className="col-12 col-md-4 bg-dark text-center">
                                            <div className="mb-2">
                                                <img
                                                    src={!!store.doctorDetail.picture ? store.doctorDetail.picture
                                                        : "/images/default.jpg"}
                                                    className="imgRedondaA img-fluid"
                                                    alt="Imagen Perfil" />

                                            </div>
                                            <div className="my-2">
                                                <span
                                                    className="text-white me-3">
                                                    {store.doctorDetail.name} {store.doctorDetail.lastname}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-8 bg-dark">

                                            <div>
                                                <div className="row">
                                                    <div className="col-8 ms-3 text-white">
                                                        <h3>
                                                            <span className="me-2">
                                                                <FaUser />
                                                            </span>
                                                            <span className="me-2">
                                                                {store.doctorDetail.name}
                                                            </span>
                                                            <span>
                                                                {store.doctorDetail.lastname}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4 >Especialidad </h4>
                                                            <div>
                                                                <p>
                                                                    {!!store.doctorDetail.specialty ?
                                                                        store.doctorDetail.specialty : "No tienes especialidad registrada"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4>
                                                                Email
                                                            </h4>
                                                            <div>
                                                                <p>{!!store.doctorDetail.email ?
                                                                    store.doctorDetail.email :
                                                                    "No tienes email registrado"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            ) : (
                history.push('/user/login')
            )
        }
    </>
    );
}

export default DoctorProfileDetail;