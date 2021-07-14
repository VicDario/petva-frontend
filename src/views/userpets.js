import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Userpets = () => {
    const {actions,store} = useContext(Context);
    /* const obtenermascotas = ()=>{
        actions.getMascotasUser()
    } */
    let {pets} = store;

    useEffect(()=>{
        actions.getMascotasUser()
    },[])

    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <div>
                            <h2 className="display-1">Mis Mascotas</h2>
                        </div>
                        <div>
                            
                                <h1>{pets.name}</h1>
                            
                            
                            
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