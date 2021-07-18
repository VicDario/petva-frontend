import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpiner from '../Components/LoadingSpinner';

const Petsinadoption = ({ history }) => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getPetsInAdoption() 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                !!store.petsInAdoption &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div>
                                <h2 className="display-1">Mascotas en Adopción</h2>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    !!store.petsInAdoption ?
                                        store.petsInAdoption.length > 0 ?
                                            store.petsInAdoption.map((pet, index) => {
                                                return (
                                                    <div className="col-sm-6 col-md-4" key={index}>
                                                        <div className="card mb-3">
                                                            <img src={!!pet.picture ? pet.picture : "/images/default.jpg"} className="card-img-top" alt={pet.name} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{pet.name}</h5>
                                                                <p className="card-text">{pet.specie === 'cat' ? "Gato" : "Perro"}</p>
                                                                <p className="card-text">{!!pet.birth_date ? pet.birth_date : "No registra fecha de nacimiento"}</p>
                                                                <p className="card-text">{!!pet.chip_code ? pet.chip_code : "No registra codigo de chip"}</p>
                                                                {/* <Link to={"/user/pet/history/" + pet.id} className="btn btn-primary">Historial</Link> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div className="col-sm-12 pt-4">
                                                <h3 className="text-center">No Hay mascotas en Adopción</h3>
                                            </div>
                                        :
                                        <LoadingSpiner />
                                }
                            </div>
                           
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Petsinadoption;