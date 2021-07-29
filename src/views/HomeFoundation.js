import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
//import { useEffect } from "react";


const HomeFoundation = () => {
    const { store, actions } = useContext(Context);
    //let { token } = store;
    const history = useHistory();
    useEffect(() => {
        actions.getFoundationDetail();
        actions.getPetsFoundationWithOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    (
                        <div className="container">
                            {
                                !!store.foundationDetail &&

                            <div className="text-center my-4">
                                <h2 className="display-1">Bienvenido {store.foundationDetail.name}</h2>
                            </div>
                            }
                            <div className="row">
                                <div className="col-lg-4 col-md-6 text-center">
                                    <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                        Perdidos y Encontrados
                                    </button>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex justify-content-center">
                                    <Link to="/foundation/pets/adoption" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                        Mascotas en Adopción
                                    </Link >
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex justify-content-center">
                                    <Link to="/foundation/pets/tracking" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                        Mascotas Adoptadas o con dueño
                                    </Link >
                                </div>
                            </div>
                        </div>
                    )
                    :
                    history.push("/foundation/login")
            }
        </>
    );
}
export default HomeFoundation;