import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { FaCat, FaDog } from "react-icons/fa";
import Pagination from "react-js-pagination";


const Petsinadoption = () => {
    const { actions, store } = useContext(Context);
    const [activePage, setActivePage] = useState(1);
    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        actions.getPetsInAdoption(pageNumber);
        setActivePage(pageNumber);
    }

    return (
        <>
            {
                !!store.petsInAdoption &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div className="row mb-2">
                                <div className="col-lg-9 col-md-12 col-sm-12">
                                    <h2 className="display-1 text-start mb-0">
                                        Mascotas en Adopción
                                    </h2>
                                    <hr className="hr-in-adoption mt-0 mb-4" />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                {
                                    !!store.petsInAdoption && store.petsInAdoption[0].length > 0 ?
                                        store.petsInAdoption[0].map((pet, index) => {
                                            return (
                                                <div
                                                    className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                                    <div className="card card-pet mb-3 pt-3 align-items-center">
                                                        <img
                                                            src={!!pet.picture ? pet.picture : "/images/default.jpg"}
                                                            className="card-img-top img-pet" alt={pet.name}
                                                        />
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-center">
                                                                <h5 className="card-title">
                                                                    {pet.name}
                                                                </h5>
                                                                <span
                                                                    className="card-title fs-3 ">
                                                                    {
                                                                        pet.specie === 'cat' ?
                                                                            <FaCat className="align-top ms-1" />
                                                                            :
                                                                            <FaDog className="align-top ms-1" />
                                                                    }
                                                                </span>
                                                            </div>
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
                                                //pagination
                                                
                                                //Fin pagination
                                            )
                                        })
                                        :
                                        <div className="col-lg-12 col-md-12 col-sm-12 pt-4">
                                            <h3 className="text-center">No Hay mascotas en Adopción</h3>
                                        </div>
                                }
                            </div>
                            <div className="row">
                                <div className="animate__animated animate__fadeInDown col-md-12 py-3 d-flex justify-content-center">
                                    {
                                        !!store.petsInAdoption && (
                                            <Pagination
                                                activePage={activePage}
                                                itemsCountPerPage={10}
                                                totalItemsCount={store.petsInAdoption[0].length}
                                                pageRangeDisplayed={5}
                                                onChange={handlePageChange}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default Petsinadoption;
