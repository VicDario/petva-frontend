import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";

const Userprofiledetail = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getUserDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Mis Datos</h1>
                    </div>
                    <div>
                        {
                            !!store.userDetail &&
                            <div className="card mb-3" style={{ maxWidth: 540 }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={store.userDetail.picture} className="img-fluid rounded-start" alt="Imagen Perfil" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{store.userDetail.name} {store.userDetail.lastname}</h5>
                                            <p className="card-text">
                                                <span className="me-1">Tu nombre: </span>
                                                <span className="ms-1">{store.userDetail.name}</span>
                                            </p>
                                            <p className="card-text">
                                                <span className="me-1">Tu apellido: </span>
                                                <span className="ms-1">{store.userDetail.lastname}</span>
                                            </p>
                                            <p className="card-text">
                                                <span className="me-1">Tu correo: </span>
                                                <span className="ms-1">{store.userDetail.email}</span>
                                            </p>
                                            <p className="card-text">
                                                <span className="me-1">Tu telefono: </span>
                                                <span className="ms-1">{store.userDetail.phone}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Userprofiledetail;