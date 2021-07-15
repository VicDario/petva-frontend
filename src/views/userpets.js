import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Userpets = () => {
    const {actions,store} = useContext(Context);
    const history = useHistory()
    /* const obtenermascotas = ()=>{
        actions.getMascotasUser()
    } */
    let {pets} = store;

    useEffect(()=>{
        actions.getMascotasUser()
    },[])

    return (
        <>
        {
            store.token && store.token !== "" ?

            <div className="container">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <div>
                            <h2 className="display-1">Mis Mascotas</h2>
                        </div>
                            
                            {
                                !!store.pets &&
                                store.pets.map((pet,index)=>{
                                    return(
                                        <>
                                        <ul className="list-group my-2">
                                            <li className="list-group-item">Nombre: {pet.name}</li>
                                            <li className="list-group-item">Fecha Nacimiento: {pet.birth_date}</li>
                                            <li className="list-group-item">Especie: {pet.specie}</li>
                                            <li className="list-group-item">Estado: {pet.state}</li>
                                        </ul>
                                        </>
                                    )
                                })
                            }
                        <div>
                            <Link to="/addpetuser" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                Agregar Mascota
                            </Link>
                        </div>
                    </div>
                </div>
            </div>:
            history.push("/login")
        }
        </>
    )
}

export default Userpets;