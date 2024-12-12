import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpiner from '.@components/loading-spinner/loading-spinner.component';
import { FaCat, FaDog } from "react-icons/fa";

const UserPets = ({ history }) => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getMascotasUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {
                !!store.token &&
                <div
                    className="container">
                    <div
                        className="row my-4">
                        <div
                            className="col-12 text-center">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <h2
                                        className="display-1 text-start mb-0">
                                        Mis Mascotas
                                    </h2>
                                    <hr className="hr-user-pets mt-0 mb-4" />
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <div
                                        className=" d-flex justify-content-end me-3">
                                        <Link
                                            to="/user/pets/add"
                                            className="text-decoration-none badge rounded-pill btn-user-pets p-3 m-1 fs-4">
                                            Agregar Mascota
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="row justify-content-center mt-4">
                                {
                                    !!store.pets ?
                                        store.pets.length > 0 ?
                                            store.pets.map((pet, index) => {
                                                return (
                                                    <div
                                                        className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                                        <div
                                                            className="card card-pet mb-3 pt-3 align-items-center">
                                                            <img
                                                                src={!!pet.picture ? pet.picture : "/images/default.jpg"}
                                                                className="card-img-top img-pet mt-2" alt={pet.name}
                                                            />
                                                            <div
                                                                className="card-body">
                                                                <div
                                                                    className="d-flex justify-content-center">
                                                                    <h2>{pet.name}</h2>
                                                                    <span
                                                                        className="card-title fs-3 ">{pet.specie === 'cat'
                                                                            ? <FaCat className="align-top ms-1" /> :
                                                                            <FaDog className="align-top ms-1" />}
                                                                    </span>
                                                                </div>
                                                                <p
                                                                    className="card-text">
                                                                    {!!pet.birth_date ? actions.getEdad(pet.birth_date)
                                                                        : "No registra fecha de nacimiento"}
                                                                </p>
                                                                <p className="card-text">
                                                                    {!!pet.code_chip ? "Codigo Chip: " + pet.code_chip
                                                                        : "No registra codigo de chip"}
                                                                </p>
                                                                <div
                                                                    className="d-flex justify-content-around my-3">
                                                                    <Link
                                                                        to={"/user/pet/history/" + pet.id}
                                                                        className="btn btn-user-pets rounded-pill px-5 py-0 fs-4">
                                                                        Historial
                                                                    </Link>
                                                                </div>
                                                                {
                                                                    pet.state === "lost" &&
                                                                    <p
                                                                        className="card-text badge rounded-pill bg-danger fs-5">
                                                                        Perdida
                                                                    </p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div
                                                className="col-sm-12 pt-4">
                                                <h3
                                                    className="text-center">
                                                    No tienes Mascotas registradas
                                                </h3>
                                            </div>
                                        :
                                        <LoadingSpiner />
                                }
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

export default UserPets;
