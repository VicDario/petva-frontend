import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const ClinicProfileDetail = () => {
    const { actions, store } = useContext(Context);
    const { token } = store;
    const history = useHistory();
    useEffect(() => {
        actions.getClinicDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<>
        {token !== null ? (
            <div className="row">
                <div className="col-12">
                    <h1>Mis Datos</h1>
                </div>
                <div>
                    {
                        !!store.clinicDetail &&
                        <div className="card mb-3" style={{ maxWidth: 540 }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={store.clinicDetail.picture} className="img-fluid rounded-start" alt="Imagen Fundación" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{store.clinicDetail.name}</h5>
                                        <p className="card-text">
                                            <span className="me-1">Correo de contacto:</span>
                                            <span className="ms-1">{store.clinicDetail.email}</span>
                                        </p>
                                        <p className="card-text">
                                            <span className="me-1">Telefono de la clinica:</span>
                                            <span className="ms-1">{store.clinicDetail.phone}</span>
                                        </p>
                                        <p className="card-text">
                                            <span className="me-1">Dirección de la clinica:</span>
                                            <span className="ms-1">{store.clinicDetail.address}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        ) : (
            history.push("/clinic/login")
        )}
    </>
    );
}
export default ClinicProfileDetail;
