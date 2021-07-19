import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

const Lostpets = ()=>{
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getLostPets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                !!store.LostPets &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div>
                                <h2 className="display-1">Mascotas Perdidas</h2>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    !!store.LostPets ?

                                        store.LostPets.map((pet, index) => {
                                            return (
                                                <div className="col-sm-6 col-md-4" key={index}>
                                                    <div className="card mb-3">
                                                        <img src={!!pet.picture ? pet.picture : "/images/default.jpg"} className="card-img-top" alt={pet.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{pet.name}</h5>
                                                            <p className="card-text">{pet.specie === 'cat' ? "Gato" : "Perro"}</p>
                                                            <p className="card-text">{!!pet.birth_date ? pet.birth_date : "No registra fecha de nacimiento"}</p>
                                                            <p className="card-text fw-bold">Dueño: {pet.contact_name}</p>
                                                            <p className="card-text">Teléfono contacto: {pet.phone}</p>
                                                            <p className="card-text">Email contacto: {pet.email}</p>
                                                            <p className="card-text">Dirección contacto: {pet.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="col-sm-12 pt-4">
                                            <h3 className="text-center">No Hay mascotas Perdidas</h3>
                                        </div>

                                }
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Lostpets;