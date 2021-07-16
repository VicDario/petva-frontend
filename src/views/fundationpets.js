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
                            <div className="row justify-content-center">
                                
                            {
                                !!store.pets ?
                                 store.pets.length > 0 ?
                                store.pets.map((pet, index) => {
                                    return (
                                        <div className="col-sm-6 col-md-4">
                                            <div class="card mb-3">
                                                <img src={!!pet.picture ? pet.picture : "/images/default.jpg"} className="card-img-top" alt={pet.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{pet.name}</h5>
                                                    <p class="card-text">{pet.specie === 'cat' ? "Gato" : "Perro"}</p>
                                                    <p class="card-text">{!!pet.birth_date ? pet.birth_date : "No registra fecha de nacimiento"}</p>
                                                    <p class="card-text">{!!pet.chip_code ? pet.chip_code : "No registra codigo de chip"}</p>
                                                    <p class="card-text badge rounded-pill bg-success">{pet.state}</p>
                                                    
                                                    <div className="d-flex justify-content-around">
                                                    <Link href="/infomascota" class="btn btn-primary">Detalles</Link>
                                                    <Link to={"/foundation/transfer/" +pet.id} class="btn btn-danger">Transferir</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                        <div className="col-sm-12 pt-4">
                                            <h3 className="text-center">No tienes Mascotas registradas</h3>
                                        </div>
                                        :
                                        <LoadingSpiner/>
                            }
                            </div>
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