import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpiner from "../Components/LoadingSpinner";
import { Context } from "../store/appContext";

const Fundationpets = () => {
    const { actions, store } = useContext(Context);
    const history = useHistory();
    //let {pets} =store;
    let token = localStorage.getItem('token');
    useEffect(() => {
        actions.getPetsFundation()
    }, [])
    return (
        <>
            {
                !!store.token &&

                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div>
                                <h2 className="display-1">Mascotas de la Fundación</h2>
                            </div>

                            {
                                !!store.pets ?
                                 store.pets.length > 0 ?
                                store.pets.map((pet, index) => {
                                    return (
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
                                :
                                        <div className="col-sm-12 pt-4">
                                            <h3 className="text-center">No tienes Mascotas registradas</h3>
                                        </div>
                                        :
                                        <LoadingSpiner/>
                            }
                            <div>
                                <Link to="/addpetuser" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                    Agregar Mascota
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>}
            {
                !store.token &&
                history.push("/")
                
            }
        </>
    );
}
export default Fundationpets;