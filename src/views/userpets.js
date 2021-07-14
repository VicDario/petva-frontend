import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Userpets = () => {
    const {actions} = useContext(Context);
    const obtenermascotas = ()=>{
        actions.getMascotasUser()
    }

    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <div>
                            <h2 className="display-1">Mis Mascotas</h2>
                        </div>
                        <div>
                            <p>No tienes mascotas registradas aún....</p>
                            <button onClick={obtenermascotas}>
                                obtener amscotas
                            </button>
                        </div>
                        <div>
                            <Link to="/addpetuser" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                Agregar Mascota
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userpets;