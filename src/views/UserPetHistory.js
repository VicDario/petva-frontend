import { useHistory, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaTrash } from "react-icons/fa"
import { FaCat, FaDog } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const UserPetHistory = () => {

    const { actions, store } = useContext(Context);
    const { pet_id } = useParams();
    const { userPet } = store;
    const [last_location, setLastLocation] = useState();
    const history = useHistory();

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
    const [newSurgery, setNewSurgery] = useState({
        date: null,
        description: null,
        doctor_name: null
    })
    const formatDate = (date) => {
        let newdate = date.split("-")
        newdate = newdate.reverse()
        newdate = newdate.join("/")
        console.log(newdate)

        return newdate
    }
    const [save, setSave] = useState("off");
    const [updates, setUpdates] = useState({
        name: null,
        code_chip : null,
        breed : null
    });
    const register = () => {
        if (save === "off")
        {

            setSave("on")
        } else
        {
            setSave("off")

        }
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

    const addSurgery = () => {
        if (newSurgery.date !== null && newSurgery.description !== null && newSurgery.doctor_name !== null)
        {
            actions.addSurgerytoPetUser(formatDate(newSurgery.date), newSurgery.description, newSurgery.doctor_name, pet_id)
            console.log("Cirugia agregada");
            setNewSurgery({
                date: null,
                description: null,
                doctor_name: null
            })
        } else
        {
            console.log("cirugía no agregada");
            alert("Debes llenar todos los campos para agregar cirugía");
        }
    }
    const reportLost = () => {
        actions.userReportPetLost(pet_id, last_location);
        console.log(last_location)
    }
    const reportFounded = () => {
        if(pet_id!==null){
            actions.userReportPetFounded(pet_id);
            
        }
    }
    const deletePet = () => {
        if(pet_id!==null){
            actions.userDeletePet(pet_id,history);
            Swal.fire({
                icon: "success",
                title: "Mascota Eliminada :(",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const update = () => {
        if (userPet!== null
        )
        {

            actions.userPutPet(updates.name, updates.code_chip, updates.breed,
                 validarVacio(store.auxPicture),userPet.id);
            Swal.fire({
                icon: "success",
                title: "Usuario Actualizado",
                showConfirmButton: false,
                timer: 1500
            });
            register();
        }
    }
    const validarVacio = (dato) => {
        if (dato === "")
        {
            dato = null
        }
        return dato
    }
    const handleLoad = (e) => {
        let file = e.target.files[0]; // load the picture (just one file)
        actions.convertImgToBase64(file); //Save picture in base64 format at store in auxPicture
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-3">
                    {
                        !!userPet &&
                        <div className="d-flex justify-content-around">
                            <h1>
                                {userPet.name}
                            </h1>
                            <span
                                className="text-primary fs-3"
                                type="button"
                                title="Editar Mascota"
                                onClick={register}
                            >
                                <FiEdit />
                            </span>
                            <span
                                onClick={deletePet}
                                className="text-danger fs-3"
                                type="button"
                                title="Eliminar Mascota"
                            >
                                <FaTrash />
                            </span>
                        </div>
                    }
                    {
                        !!userPet &&
                        <div className="card mb-3">
                            <img
                                src={!!userPet.picture ? userPet.picture : "/images/default.jpg"}
                                className="card-img-top" alt="petname" />
                            <div
                                className="card-body">
                                {/* <h5 className="card-title">{userPet.name}</h5> */}
                                <span
                                    className="card-title fs-3 ">{userPet.specie === 'cat'
                                        ? <FaCat className="align-middle ms-1" />
                                        : <FaDog className="align-middle ms-1" />}
                                </span>
                                <p
                                    className="card-text">{!!userPet.birth_date ? actions.getEdad(userPet.birth_date)
                                        : "No registra fecha de nacimiento"}
                                </p>
                                {
                                    userPet.state === "lost" &&
                                    <p
                                        className="card-text badge rounded-pill bg-danger fs-3">
                                        Perdida
                                    </p>
                                }
                                <p
                                    className="card-text">N°Chip: {!!userPet.code_chip ? userPet.code_chip
                                        : "No registra codigo de chip"}
                                </p>
                                <div>
                                    <Link to="/user/pets">
                                        <button className="btn btn-success my-3">
                                            Volver a Mis Mascotas
                                        </button>
                                    </Link>
                                    {
                                        userPet.state !== "lost" &&
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#perdida"
                                        >
                                            Reportar Perdida
                                        </button>
                                    }
                                    {
                                        userPet.state === "lost" &&
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#encontrada"
                                        >
                                            Reportar Encontrada
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    save === "on" &&
                    <div className="col-12 col-md-7 mx-auto">
                        <h4 className="text-center">Edita Tu mascota</h4>

                        <div className="col-md-7 col-12 bg-secondary text-white p-3 mx-auto">
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="">
                                    Nombre
                                </label>
                                <input
                                    placeholder={userPet.name}
                                    className="form-control text-white bg-dark"
                                    type="text" 
                                    onChange={(e) => { setUpdates({ ...updates, name: e.target.value }) }}
                                />
                            </div>
                            <div
                                className="">
                                <label
                                    className="form-label"
                                    htmlFor="">Código Chip</label>
                                <input
                                    placeholder={userPet.code_chip}
                                    className="form-control text-white bg-dark"
                                    type="text" 
                                    onChange={(e) => { setUpdates({ ...updates, code_chip: e.target.value }) }}
                                />
                            </div>
                            <div className="">
                                <label
                                    className="form-label"
                                    htmlFor="">Raza</label>
                                <input
                                    placeholder={userPet.breed}
                                    className="form-control text-white bg-dark"
                                    type="text"
                                    onChange={(e) => { setUpdates({ ...updates, breed: e.target.value }) }}
                                />
                            </div>
                            <div className="">
                                <label
                                    className="form-label"
                                    htmlFor="">Foto(No obligatorio)</label>
                                <input className="form-control text-white bg-dark"
                                    type="file"
                                    placeholder="Foto Mascota"
                                 onChange={e => handleLoad(e)} accept="image/png, .jpg, .jpeg" 
                                />
                            </div>
                            <div
                                className="d-flex justify-content-around my-3">
                                <button
                                    className="btn btn-success"
                                     onClick={update} >
                                    Guardar Cambios
                                </button>
                                <button
                                    className="btn btn-dark"
                                    onClick={register} >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12 col-md-3">
                    <div className="text-center">
                        <h2>Vacunas
                            <span
                                title="Agregar Vacuna"
                                className="text-success"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                <FaPlusCircle />
                            </span>
                        </h2>
                    </div>
                    {
                        !!store.historyUserPet &&
                        store.historyUserPet.History.vaccines.map((vacuna, index) => {
                            return (
                                <div
                                    className="accordion" id="Vacuna">
                                    <div
                                        className="accordion-item mb-4"
                                        key={index}>
                                        <h2
                                            className="accordion-header"
                                            id="vacunaOne">
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
                                            <div
                                                className="accordion-body">
                                                <div
                                                    className="row">
                                                    <div
                                                        className="col-12">
                                                        <ul
                                                            className="list-group mt-1">
                                                            <li
                                                                className="list-group-item">
                                                                <strong>Fecha:</strong> {vacuna.date}
                                                            </li>
                                                            <li
                                                                className="list-group-item"><strong>
                                                                    Laboratorio:</strong> {vacuna.laboratory}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-12 col-md-3">
                    <div className="text-center">
                        <h2>
                            Consultas
                            <span
                                title="Agregar consulta"
                                className="text-success"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#diagnostico">
                                <FaPlusCircle />
                            </span>
                        </h2>
                    </div>
                    {
                        !!store.historyUserPet &&
                        store.historyUserPet.History.diagnostics.map((diag, index) => {
                            return (
                                <div
                                    className="accordion"
                                    id="accordionExample">
                                    <div
                                        className="accordion-item mb-4"
                                        key={index}>
                                        <h2
                                            className="accordion-header"
                                            id="headingOne">
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
                                            <div
                                                className="accordion-body">
                                                <div
                                                    className="row">
                                                    <div
                                                        className="col-12">
                                                        <ul
                                                            className="list-group mt-1">
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Fecha Consulta:
                                                                </strong> {diag.date}
                                                            </li>
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Diagnóstico:
                                                                </strong> {diag.diagnostic}
                                                            </li>
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Nombre Doctor:
                                                                </strong> {diag.doctor_name}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div
                    className="col-12 col-md-3">
                    <div
                        className="text-center">
                        <h2>Cirugías <span
                            title="Agregar Cirugía"
                            className="text-success" type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#cirugia">
                            <FaPlusCircle />
                        </span>
                        </h2>
                    </div>
                    {
                        !!store.historyUserPet &&
                        store.historyUserPet.History.surgeries.map((cirugia, index) => {
                            return (
                                <div
                                    key={index}
                                    className="accordion"
                                    id="Cirugia">
                                    <div
                                        className="accordion-item mb-4"
                                        key={index}>
                                        <h2
                                            className="accordion-header"
                                            id="cirugiaOne">
                                            <button
                                                className="accordion-button collapsed fs-5"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={"#cir" + index}
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                Cirugía N°: {index + 1}
                                            </button>
                                        </h2>
                                        <div
                                            id={"cir" + index}
                                            className="accordion-collapse collapse"
                                            aria-labelledby="cirugiaOne"
                                            data-bs-parent="#Cirugia"
                                        >
                                            <div
                                                className="accordion-body">
                                                <div
                                                    className="row">
                                                    <div
                                                        className="col-12">
                                                        <ul
                                                            className="list-group mt-1">
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Fecha:</strong> {cirugia.date}
                                                            </li>
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Laboratorio:</strong> {cirugia.description}
                                                            </li>
                                                            <li
                                                                className="list-group-item">
                                                                <strong>
                                                                    Nombre Doctor:</strong> {cirugia.doctor_name}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <label
                                    className="form-label"
                                    htmlFor="dateV">Fecha Vacuna:
                                </label>
                                <input
                                    className="form-control"
                                    id="dateV"
                                    type="date"
                                    onChange={(e) => { setNewVaccine({ ...newVaccine, date: e.target.value }) }} />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="lotV">
                                    Lote o Número de Serie:
                                </label>
                                <input
                                    className="form-control"
                                    id="lotV" type="text"
                                    onChange={(e) => { setNewVaccine({ ...newVaccine, lot: e.target.value }) }} />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="nameV">Nombre Vacuna: </label>
                                <input
                                    className="form-control"
                                    id="nameV" type="text"
                                    onChange={(e) => { setNewVaccine({ ...newVaccine, name: e.target.value }) }} />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="laboratoryV">Laboratorio: </label>
                                <input
                                    className="form-control"
                                    id="laboratoryV"
                                    type="text"
                                    onChange={(e) => { setNewVaccine({ ...newVaccine, laboratory: e.target.value }) }} />
                            </div>
                        </div>
                        <div
                            className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addVaccine}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss={newVaccine.date !== null &&
                                    newVaccine.lot !== null &&
                                    newVaccine.name !== null
                                    && newVaccine.laboratory !== null ? "modal" : ""}>
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
                <div
                    className="modal-dialog">
                    <div
                        className="modal-content">
                        <div
                            className="modal-header">
                            <h5
                                className="modal-title" id="diagnosticoLabel">
                                Agregar Consulta
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div
                            className="modal-body">
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="dateD">Fecha Consulta: </label>
                                <input
                                    className="form-control"
                                    id="dateD"
                                    type="date"
                                    onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, date: e.target.value }) }} />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="diagD">Diagnóstico: </label>
                                <input
                                    className="form-control"
                                    id="diagD"
                                    type="text"
                                    onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, diagnostic: e.target.value }) }}
                                />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="dnD">Nombre Doctor:
                                </label>
                                <input
                                    className="form-control"
                                    id="dnD"
                                    type="text"
                                    onChange={(e) => { setNewDiagnostic({ ...newDiagnostic, doctor_name: e.target.value }) }} />
                            </div>
                        </div>
                        <div
                            className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addDiagnostic}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss={newDiagnostic.date !== null &&
                                    newDiagnostic.diagnostic !== null &&
                                    newDiagnostic.doctor_name !== null ? "modal"
                                    : ""}>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal agregar Cirugía */}
            <div
                className="modal fade"
                id="cirugia"
                tabIndex={-1}
                aria-labelledby="cirugiaLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog">
                    <div
                        className="modal-content">
                        <div
                            className="modal-header">
                            <h5
                                className="modal-title"
                                id="cirugiaLabel">
                                Agregar Cirugía
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div
                            className="modal-body">
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="dateC">
                                    Fecha Cirugía:
                                </label>
                                <input
                                    className="form-control"
                                    id="dateC"
                                    type="date"
                                    onChange={(e) => { setNewSurgery({ ...newSurgery, date: e.target.value }) }}
                                />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="cirD">Descripción: </label>
                                <input
                                    className="form-control"
                                    id="cirD"
                                    type="text"
                                    onChange={(e) => { setNewSurgery({ ...newSurgery, description: e.target.value }) }}
                                />
                            </div>
                            <div>
                                <label
                                    className="form-label"
                                    htmlFor="cirDn">
                                    Nombre Doctor:
                                </label>
                                <input
                                    className="form-control"
                                    id="cirDn"
                                    type="text"
                                    onChange={(e) => { setNewSurgery({ ...newSurgery, doctor_name: e.target.value }) }}
                                />
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
                            <button
                                onClick={addSurgery}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss={newSurgery.date !== null &&
                                    newSurgery.description !== null &&
                                    newSurgery.doctor_name !== null ?
                                    "modal" : ""}>
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Para mascota perdida */}
            <div
                className="modal fade"
                id="perdida"
                tabIndex={-1}
                aria-labelledby="perdidaLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog">
                    <div
                        className="modal-content">
                        <div
                            className="modal-header">
                            <h5
                                className="modal-title text-center"
                                id="perdidaLabel">
                                ¿Estás Seguro que quieres Reportar Tú Mascota como PERDIDA?
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
                                <label
                                    className="form-label"
                                    htmlFor="">
                                    Indica la última ubicación donde viste tu mascota, la fecha y alguna descripción
                                </label>
                            </div>
                            <div>
                                <input
                                    className="form-control"
                                    onChange={(e) => { setLastLocation(e.target.value) }}
                                    type="text" />
                            </div>
                        </div>
                        <div
                            className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={reportLost}
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Reportar como Perdida
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Para mascota encontrada */}
            <div
                className="modal fade"
                id="encontrada"
                tabIndex={-1}
                aria-labelledby="encontradaLabel"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog">
                    <div
                        className="modal-content">
                        <div
                            className="modal-header">
                            <h5
                                className="modal-title text-center"
                                id="encontradaLabel">
                                Nos emociona que hayas encontrado
                                tu mascota! Pulsa cambiar estado para notificar que la has encontrado.
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={reportFounded}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Cambiar estado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPetHistory;
