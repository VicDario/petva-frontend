import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa"


const Userpethistory = () => {

    const { actions, store } = useContext(Context);
    const { pet_id } = useParams();
    const { history } = useHistory();
    const {userPet} = store;

    const [newVaccine, setNewVaccine] = useState({
        date: null,
        lot: null,
        name: null,
        laboratory: null
    });
    const [newDiagnostic, setNewDiagnostic] = useState({
        date: null,
        diagnostic: null,
        doctor_name: null
    })
    const formatDate = (date) => {
        let newdate = date.split("-")
        newdate = newdate.reverse()
        newdate = newdate.join("/")
        console.log(newdate)

        return newdate
    }
    useEffect(() => {
        actions.getSinglePetFromUser(pet_id);
        actions.getHistoryUserPet(pet_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const addVaccine = () => {

        if (newVaccine.date !== null && newVaccine.lot !== null && newVaccine.name !== null && newVaccine.laboratory !== null)
        {
            actions.addVaccinetoPetUser(formatDate(newVaccine.date), newVaccine.lot, newVaccine.name, newVaccine.laboratory, pet_id)
            console.log("Vacuna agregada");
            setNewVaccine({
                date: null,
                lot: null,
                name: null,
                laboratory: null
            })
            /* actions.getHistoryUserPet(pet_id); */


        } else
        {
            console.log("Vacuna no agregada");
            alert("Debes llenar todos los campos para agregar vacuna");

        }
    }
    const addDiagnostic = () => {
        if (newDiagnostic.date !== null && newDiagnostic.diagnostic !== null && newDiagnostic.doctor_name !== null)
        {
            actions.addDiagnostictoPetUser(formatDate(newDiagnostic.date), newDiagnostic.diagnostic, newDiagnostic.doctor_name, pet_id)
            console.log("Diagnóstico agregado");
            setNewDiagnostic({
                date: null,
                diagnostic: null,
                doctor_name: null
            })
        } else
        {
            console.log("diagnóstico no agregado");
            alert("Debes llenar todos los campos para agregar diagnóstico");
        }
    }




    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <h1>
                            Pet_id: {pet_id}
                        </h1>
                        <div className="card mb-3">
                            <img src={/* !!pet.picture ? pet.picture :  */"/images/default.jpg"} className="card-img-top" alt="petname" />
                            <div className="card-body">
                                <h5 className="card-title">name</h5>
                                <p className="card-text">{/* { userPet.specie === 'cat' ? "Gato" : "Perro" } */} especie</p>
                                <p className="card-text">{/* {!!pet.birth_date ? pet.birth_date : "No registra fecha de nacimiento"} */}fecha</p>
                                <p className="card-text">{/* {!!pet.chip_code ? pet.chip_code : "No registra codigo de chip"} */}chip</p>
                                <div>
                                    <Link to="/userpets">
                                        <button className="btn btn-success">
                                            Volver a Mis Mascotas
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-12 col-md-3">
                        <div className="text-center">
                            <h2>Vacunas <span title="Agregar Vacuna" className="text-success" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><FaPlusCircle /></span></h2>
                        </div>
                        {
                            !!store.historyUserPet &&
                            store.historyUserPet.History.vaccines.map((vacuna, index) => {
                                return (
                                    <>
                                        <div className="accordion" id="Vacuna">

                                            <div className="accordion-item mb-4"
                                                key={index}>
                                                <h2 className="accordion-header" id="vacunaOne">
                                                    <button
                                                        className="accordion-button collapsed fs-5"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={"#vac" + index}
                                                        aria-expanded="true"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Vacuna N°: {index + 1}
                                                    </button>
                                                </h2>
                                                <div
                                                    id={"vac" + index}
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="vacunaOne"
                                                    data-bs-parent="#Vacuna"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="row">

                                                            <div className="col-12">
                                                                <ul className="list-group mt-1">
                                                                    <li className="list-group-item"><strong>Fecha:</strong> {vacuna.date}</li>
                                                                    <li className="list-group-item"><strong>Laboratorio:</strong> {vacuna.laboratory}</li>
                                                                </ul>
                                                            </div>
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
                    <div className="col-12 col-md-3">
                        <div className="text-center">
                            <h2>Consultas <span title="Agregar consulta" className="text-success" type="button" data-bs-toggle="modal" data-bs-target="#diagnostico"><FaPlusCircle /></span></h2>
                        </div>
                        {
                            !!store.historyUserPet &&
                            store.historyUserPet.History.diagnostics.map((diag, index) => {
                                return (
                                    <>
                                        <div className="accordion" id="accordionExample">

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
                                                        Consulta N°: {index + 1}
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
                                                                <ul className="list-group mt-1">
                                                                    <li className="list-group-item"><strong>Fecha Consulta:</strong> {diag.date}</li>
                                                                    <li className="list-group-item"><strong>Diagnóstico:</strong> {diag.diagnostic}</li>
                                                                    <li className="list-group-item"><strong>Nombre Doctor:</strong> {diag.doctor_name}</li>
                                                                </ul>
                                                            </div>
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
                {/* Modal  agregar Vacuna*/}
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Agregar Vacuna
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <label className="form-label" htmlFor="dateV">Fecha Vacuna: </label>
                                    <input className="form-control" id="dateV" type="date" onChange={(e) => { setNewVaccine({ ...newVaccine, date: e.target.value }) }} />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="lotV">Lote o Número de Serie: </label>
                                    <input className="form-control" id="lotV" type="text" onChange={(e) => { setNewVaccine({ ...newVaccine, lot: e.target.value }) }} />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="nameV">Nombre Vacuna: </label>
                                    <input className="form-control" id="nameV" type="text" onChange={(e) => { setNewVaccine({ ...newVaccine, name: e.target.value }) }} />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="laboratoryV">Laboratorio: </label>
                                    <input className="form-control" id="laboratoryV" type="text" onChange={(e) => { setNewVaccine({ ...newVaccine, laboratory: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button onClick={addVaccine} type="button" className="btn btn-primary" data-bs-dismiss={newVaccine.date !== null && newVaccine.lot !== null && newVaccine.name !== null && newVaccine.laboratory !== null ? "modal" : ""}>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal agregar Diagnostico */}
                <div
                    className="modal fade"
                    id="diagnostico"
                    tabIndex={-1}
                    aria-labelledby="diagnosticoLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="diagnosticoLabel">
                                    Agregar Consulta
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <label className="form-label" htmlFor="dateD">Fecha Consulta: </label>
                                    <input className="form-control" id="dateD" type="date" onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, date: e.target.value }) }} />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor="diagD">Diagnóstico: </label>
                                    <input className="form-control" id="diagD" type="text" onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, diagnostic: e.target.value }) }} />
                                </div>

                                <div>
                                    <label className="form-label" htmlFor="dnD">Nombre Doctor: </label>
                                    <input className="form-control" id="dnD" type="text" onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, doctor_name: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancelar
                                </button>
                                <button onClick={addDiagnostic} type="button" className="btn btn-primary" data-bs-dismiss={newDiagnostic.date !== null && newDiagnostic.diagnostic !== null && newDiagnostic.doctor_name !== null ? "modal" : ""}>
                                    Agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Userpethistory;