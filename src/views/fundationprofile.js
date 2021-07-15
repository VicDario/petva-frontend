import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const FundationProfile = () => {
    const { store } = useContext(Context);
    let { token } = store;
    const history = useHistory();

    return (
        <>
            {
                token !== "" ? (
                    <div className="container">
                        <div className="text-center my-4">
                            <h2 className="display-1">Bienvenido Fundación</h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/fundation/profile" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                    Mis Datos
                                </Link >
                            </div>
                            <div className="col-12 col-md-6 text-center">
                                <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                    Perdidos y Encontrados
                                </button>
                            </div>
                            <div className="col-12 col-md-6 d-flex justify-content-center">
                                <Link to="/fundation/pets" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
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
                ) : (
                    history.push("/fundation/login")
                )
            }
        </>
    );
}
export default FundationProfile;