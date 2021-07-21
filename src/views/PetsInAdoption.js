import { useContext } from "react";
import { Context } from "../store/appContext";
import { FaCat, FaDog } from "react-icons/fa";


const Petsinadoption = () => {
    const { actions, store } = useContext(Context);



    return (
        <>
            {
                !!store.petsInAdoption &&
                <div
                    className="container">
                    <div
                        className="row my-4">
                        <div
                            className="col-12 text-center">
                            <div>
                                <h2
                                    className="display-1">Mascotas en Adopción</h2>
                            </div>
                            <div
                                className="row justify-content-center">
                                {
                                    !!store.petsInAdoption && store.petsInAdoption[0].length > 0 ?
                                        store.petsInAdoption[0].map((pet, index) => {
                                            return (
                                                <div
                                                    className="col-sm-6 col-md-4"
                                                    key={index}>
                                                    <div
                                                        className="card mb-3">
                                                        <img
                                                            src={!!pet.picture ? pet.picture : "/images/default.jpg"}
                                                            className="card-img-top" alt={pet.name}
                                                            style={{ height: "50vh" }}
                                                            />
                                                        <div
                                                            className="card-body">
                                                            <h5
                                                                className="card-title">{pet.name}
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
                                                                className="card-text">{!!pet.birth_date ?
                                                                    actions.getEdad(pet.birth_date)
                                                                    : "No registra fecha de nacimiento"}
                                                            </p>
                                                            <p
                                                                className="card-text fw-bold">
                                                                Fundación: {pet.name_foundation}
                                                            </p>
                                                            <p
                                                                className="card-text">
                                                                Teléfono fundación: {pet.phone_foundation}
                                                            </p>
                                                            <p
                                                                className="card-text">
                                                                Email fundación: {pet.email_foundation}
                                                            </p>
                                                            <p
                                                                className="card-text">
                                                                Dirección fundación: {pet.address_foundation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        :
                                        <div className="col-sm-12 pt-4">
                                            <h3 className="text-center">No Hay mascotas en Adopción</h3>
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

export default Petsinadoption;
