import { useContext } from "react";
import { Context } from "../store/appContext";
import { FaCat, FaDog } from "react-icons/fa";


const LostPets = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            {
                !!store.LostPets &&
                <div
                    className="container">
                    <div
                        className="row my-4">
                        <div
                            className="col-12 text-center">
                            <div>
                                <h2
                                    className="display-1">
                                    Mascotas Perdidas
                                </h2>
                            </div>
                            <div
                                className="row justify-content-center">
                                {
                                    !!store.LostPets & store.LostPets[0].length > 0 ?
                                        store.LostPets[0].map((pet, index) => {
                                            return (
                                                <div
                                                    className="col-sm-6 col-md-4"
                                                    key={index}>
                                                    <div
                                                        className="card mb-3">
                                                        <img
                                                            src={!!pet.picture ? pet.picture : "/images/default.jpg"}
                                                            className="card-img-top"
                                                            alt={pet.name}
                                                            style={{ height: "50vh" }}
                                                        />
                                                        <div
                                                            className="card-body">
                                                            <h5
                                                                className="card-title">
                                                                {pet.name}
                                                                <span
                                                                    className="card-title fs-3 ">
                                                                    {
                                                                        pet.specie === 'cat' ?
                                                                            <FaCat
                                                                                className="align-top ms-1" />
                                                                            :
                                                                            <FaDog
                                                                                className="align-top ms-1" />
                                                                    }
                                                                </span>
                                                            </h5>
                                                            <p
                                                                className="card-text">
                                                                {
                                                                    !!pet.birth_date ?
                                                                        actions.getEdad(pet.birth_date)
                                                                        :
                                                                        "No registra fecha de nacimiento"}
                                                            </p>
                                                            <p
                                                                className="card-text fw-bold">Dueño: {pet.name_owner}
                                                            </p>
                                                            <p
                                                                className="card-text">Teléfono contacto: {pet.phone_owner}
                                                            </p>
                                                            <p
                                                                className="card-text">Email contacto: {pet.email_owner}
                                                            </p>
                                                            <p
                                                                className="card-text fw-bold bg-danger">Último lugar visto: {pet.last_location}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div
                                            className="col-sm-12 pt-4">
                                            <h3
                                                className="text-center">No Hay mascotas Perdidas
                                            </h3>
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

export default LostPets;
