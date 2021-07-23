import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const DoctorProfileDetail = ()=>{
    const { actions, store } = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        //deberia estar el get mascotas foundation
        actions.getDoctorDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <>
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
                                <div className="card mb-3" style={{ maxWidth: 540 }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={store.doctorDetail.picture} className="img-fluid rounded-start" alt="Imagen Fundación" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{store.doctorDetail.name}</h5>
                                                <p className="card-text">
                                                    <span className="me-1">Correo de contacto:</span>
                                                    <span className="ms-1">{store.doctorDetail.email}</span>
                                                </p>
                                                <p className="card-text">
                                                    <span className="me-1">Detalles de la fundación:</span>
                                                    <span className="ms-1">{store.doctorDetail.specialty}</span>
                                                </p>
                                                <p className="card-text">
                                                    <span className="me-1">Dirección de la fundación:</span>
                                                    <span className="ms-1">{store.doctorDetail}</span>
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">Numero de Mascotas actuales: </small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ) : (
                history.push("/foundation/login")
            )
        }
    </>
    )
}
export default DoctorProfileDetail;