import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpiner from '../Components/LoadingSpinner';
import { FaCat, FaDog } from "react-icons/fa";

const Userpets = ({ history }) => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getMascotasUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    

    return (
        <>
            {
                !!store.token &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div>
                                <h2 className="display-1">Mis Mascotas</h2>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    !!store.pets ?
                                        store.pets.length > 0 ?
                                            store.pets.map((pet, index) => {
                                                return (
                                                    <div className="col-sm-6 col-md-4" key={index}>
                                                        <div className="card mb-3">
                                                            <img src={!!pet.picture ? pet.picture : "/images/default.jpg"} className="card-img-top" alt={pet.name} style={{ height: "30vh" }} />
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-center">
                                                                    <h2> {pet.name}</h2>
                                                                    <span className="card-title fs-3 ">{pet.specie === 'cat' ? <FaCat className="align-top ms-1" /> : <FaDog className="align-top ms-1"/>}   </span>
                                                                </div>
                                                                
                                                                <p className="card-text">{!!pet.birth_date ? actions.getEdad(pet.birth_date) : "No registra fecha de nacimiento"}</p>
                                                                <p className="card-text">{!!pet.code_chip ? "Codigo Chip: "+pet.code_chip : "No registra codigo de chip"}</p>
                                                                {
                                                                    pet.state==="lost" &&
                                                                    <p className="card-text badge rounded-pill bg-danger fs-3">Perdida</p>
                                                                }
                                                                <div className="d-flex justify-content-around">
                                                                    <Link to={"/user/pet/history/" + pet.id} className="btn btn-primary">Historial</Link>
                                                                    

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
                            <LoadingSpiner />
                        }
                            </div>
                            <div className="my-5">
                                <Link to="/user/pets/add" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                    Agregar Mascota
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
            
            }{
                !store.token &&
                history.push("/")
            }
        </>
    )
}

export default Userpets;