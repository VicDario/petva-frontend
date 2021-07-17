import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";



const Userpethistory = () => {

    const { actions,store } = useContext(Context);
    const { pet_id } = useParams();
    useEffect(() => {
        actions.getSinglePetFromUser(pet_id);
        actions.getHistoryUserPet(pet_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            Hola mascota id: {pet_id}
                        </h1>
                       
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="accordion" id="accordionExample">
                            {
                                !!store.historyUserPet &&
                                store.historyUserPet.History.vaccines.map((vacuna, index) => {
                                    return (
                                        <>
                                            <div className="accordion-item mb-4"
                                                key={index}>
                                                <h2 className="accordion-header" id="headingOne">
                                                    <button
                                                        className="accordion-button collapsed fs-5"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={"#collapse" + index}
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Vacuna id: {vacuna.id} 
                                                    </button>
                                                </h2>
                                                <div
                                                    id={"collapse" + index}
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="headingOne"
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="row">
                                                           
                                                            <div className="col-12">
                                                                <ul className="list-group mt-5">
                                                                    <li className="list-group-item"><strong>Fecha:</strong> {vacuna.date}</li>
                                                                    <li className="list-group-item"><strong>Laboratorio:</strong> {vacuna.laboratory}</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Userpethistory;