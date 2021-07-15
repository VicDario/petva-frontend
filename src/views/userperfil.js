import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";


const Userperfil = () => {
    const { store } = useContext(Context);
    let { token } = store;
    const history = useHistory()

    return (

        <>
            {token}
            {
                token !== "" ?
                    <div className="container">
                        <div className="text-center my-4">
                            <h2 className="display-1">Bienvenido User</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold">
                                    Mis Datos
                                </button>
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                    Perdidos y Encontrados
                                </button>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/userpets" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Mis Mascotas
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold">
                                    Servicios
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    history.push("/user/login")
            }
        </>
    )
}

export default Userperfil;