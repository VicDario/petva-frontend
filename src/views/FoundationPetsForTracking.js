import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LoadingSpiner from "../Components/LoadingSpinner";
import { Context } from "../store/appContext";
import { FaCat, FaDog } from "react-icons/fa";

const FoundationPetsForTracking = () => {
    const { actions, store } = useContext(Context);
    const history = useHistory();
    //let {pets} =store;
    useEffect(() => {
        actions.getPetsFoundationWithOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div className="row mb-2">
                                <div className="col-lg-9 col-md-12 col-sm-12">
                                    <h2 className="display-1 text-start mb-0">Mascotas con Dueño</h2>
                                    <hr className="hr-foundation-adoption mt-0 mb-4" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    !!store.petsWithOwner ?
                                        store.petsWithOwner.length > 0 ?
                                            store.petsWithOwner.map((pet, index) => {
                                                return (
                                                    <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                                        <div className="card card-pet mb-3 pt-3 align-items-center">
                                                            <img
                                                                src={!!pet.picture ? pet.picture : "/images/default.jpg"}
                                                                className="card-img-top img-pet" alt={pet.name}
                                                            />
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-center">
                                                                    <h2
                                                                        className="h3 card-title">{pet.name}
                                                                    </h2>
                                                                    <span className="card-title fs-3">
                                                                        {pet.specie === 'cat' ? <FaCat className="align-top ms-1" /> : <FaDog className="align-top ms-1" />}
                                                                    </span>
                                                                </div>
                                                                <p
                                                                    className="card-text">{!!pet.birth_date ? actions.getEdad(pet.birth_date) :
                                                                        "No registra fecha de nacimiento"}
                                                                </p>
                                                                <p
                                                                    className="card-text">{!!pet.code_chip ? pet.code_chip :
                                                                        "No registra codigo de chip"}
                                                                </p>
                                                                <div className="d-flex justify-content-around mt-3 mb-2">
                                                                    <Link to={"/foundation/pet/history/" + pet.id}
                                                                        className="btn btn-foundation-pets rounded-pill px-5 py-0 fs-4">
                                                                        Historial
                                                                    </Link>
                                                                </div>
                                                                <div className="row mt-3 d-flex justify-content-center">
                                                                    <div
                                                                        className="col-lg-12 col-md-12 col-sm-12 card-text my-1 badge rounded-pill bg-success fs-5 px-0">
                                                                        {pet.state === "owned" ? "Con Dueño" : "En adopción"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            :
                                            <div
                                                className="col-sm-12 pt-4">
                                                <h3
                                                    className="text-center">La fundación no posee mascotas
                                                    con dueño para seguimiento
                                                </h3>
                                            </div>
                                        :
                                        <LoadingSpiner />
                                }
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
export default FoundationPetsForTracking;