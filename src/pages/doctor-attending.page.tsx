import { useEffect, useContext, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import LoadingSpinner from '../Components/loading-spiner.component';
import moment from 'moment';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const DoctorAttending = (props) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [view, setView] = useState(false);
    let vaccineName = useRef(null);
    let vaccineLot = useRef(null);
    let vaccineDate = useRef(null);
    let vaccineLaboratory = useRef(null);
    let diagnosticDescription = useRef(null);
    let diagnosticDate = useRef(null);
    let surgeryDate = useRef(null);
    let surgeryDescription = useRef(null);

    useEffect(() => {
        actions.getInfoPetForDoctor(params.pet_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const calculateAge = (birth_date) => {
        const birthDate = moment(birth_date).format('YYYY-MM');
        let months = moment().diff(birthDate, 'months');
        let years = moment().diff(birthDate, 'years');
        if (years < 1)  return `${months} Meses`;
        if (months % 12 === 0)    return `${years} Años`;
        return `${years} Años ${months % 12} Meses`;
    }

    const formatDate = (date) => {
        console.log(date)
        let formatDate = moment(date).add(1, 'days').format('DD-MM-YYYY')
        return formatDate;
    }

    const vaccineToSend = async () => {
        let vaccine = {
            name: vaccineName.current.value,
            lot: vaccineLot.current.value,
            date: moment(vaccineDate.current.value).format('DD/MM/YYYY'),
            laboratory: vaccineLaboratory.current.value
        };
        console.log(vaccine)
        let resp = await actions.addVaccineToPet(params.pet_id, vaccine);
        if (resp.ok) {
            actions.getInfoPetForDoctor(params.pet_id)
            vaccineName.current.value = '';
            vaccineLot.current.value = '';
            vaccineDate.current.value = '';
            vaccineLaboratory.current.value = '';
        }
    }

    const diagnosticToSend = async () => {
        let diagnostic = {
            description: diagnosticDescription.current.value,
            date: moment(diagnosticDate.current.value).format('DD/MM/YYYY'),
            doctor: `${store.doctorDetail.name} ${store.doctorDetail.lastname}`
        };
        let resp = await actions.addDiagnosticToPet(params.pet_id, diagnostic);
        if (resp.ok) {
            actions.getInfoPetForDoctor(params.pet_id)
            diagnosticDescription.current.value = '';
            diagnosticDate.current.value = '';
        }
    }

    const surgeryToSend = async () => {
        let surgery = {
            description: surgeryDescription.current.value,
            date: moment(surgeryDate.current.value).format('DD/MM/YYYY'),
            doctor: `${store.doctorDetail.name} ${store.doctorDetail.lastname}`
        };
        let resp = await actions.addSurgeryToPet(params.pet_id, surgery);
        if (resp.ok) {
            actions.getInfoPetForDoctor(params.pet_id)
            surgeryDescription.current.value = '';
            surgeryDate.current.value = '';
        }
    }

    const handleClick = (event) => {
        if (event === 'vaccine') {
            let modal = new bootstrap.Modal(document.getElementById('modalVaccine'));
            modal.show();
        }
        if (event === 'diagnostic') {
            let modal = new bootstrap.Modal(document.getElementById('modalDiagnostic'));
            modal.show();
        }
        if (event === 'surgery') {
            let modal = new bootstrap.Modal(document.getElementById('modalSurgery'));
            modal.show();
        }
    }
    const FinishAttending = async () => {
        let resp = await actions.doctorUpdateReservation(params.reservation_id, 'finished');
        if(resp.ok) {
            props.history.push('/doctor/calendar');
        }
    }

    return (
        <>
        {
            !!store.infoPet ?
                String(store.infoPet.Pet.id) === params.pet_id ?
                    <div className="container mt-2">
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end my-2">
                            <button type="button" className="button-finished btn btn-danger" onClick={FinishAttending}>Terminar Consulta</button>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <img
                                    src={!!store.infoPet.Pet.picture ? store.infoPet.Pet.picture : '/images/default.jpg'}
                                    className="rounded image-pet"
                                    alt={`Foto de ${store.infoPet.Pet.name}`}
                                />
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <div>
                                    <h3>Nombre: {store.infoPet.Pet.name}</h3>
                                    <p>Edad: {calculateAge(store.infoPet.Pet.birth_date)}</p>
                                    <p>Especie: {store.infoPet.Pet.specie === 'cat' ? 'Felina' : 'Canina' }</p>
                                    <p>Raza: {!!store.infoPet.Pet.breed ? store.infoPet.Pet.breed : 'No registra raza'}</p>
                                    <p>Codigo de chip: {!!store.infoPet.Pet.code_chip ? store.infoPet.Pet.code_chip : "No registra codigo de chip"}</p>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check" onClick={() => setView('vaccines')} name="btnradio" id="btnradio1" autoComplete="off"/>
                                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Vacunas</label>

                                        <input type="radio" className="btn-check" onClick={() => setView('diagnostics')} name="btnradio" id="btnradio2" autoComplete="off" />
                                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Diagnosticos</label>

                                        <input type="radio" className="btn-check" onClick={() => setView('surgeries')} name="btnradio" id="btnradio3" autoComplete="off" />
                                        <label className="btn btn-outline-primary" htmlFor="btnradio3">Operaciones</label>
                                    </div>
                                </div>
                                {
                                    view === 'vaccines' &&
                                    <div className="row mt-2">
                                        <div className="col-md-12 d-flex justify-content-center my-1">
                                            <button type="button" value="vaccine" onClick={() => handleClick('vaccine')} className="btn btn-primary">Agregar Vacuna</button>
                                        </div>
                                        <div className="col-md-12 my-3">
                                            <div className="list-group">
                                            {
                                                store.infoPet.History.vaccines.map((vaccine, index) => {
                                                    return (
                                                        <div key={index} className="list-group-item list-group-item-action" aria-current="true">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <h5 className="mb-1">Nombre: {vaccine.name}</h5>
                                                                <small>{formatDate(vaccine.date)}</small>
                                                            </div>
                                                            <p className="mb-1">Laboratorio: {vaccine.laboratory}</p>
                                                            <small>Serie: {vaccine.lot}</small>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    view === 'diagnostics' &&
                                    <div className="row mt-2">
                                        <div className="col-md-12 d-flex justify-content-center my-1">
                                            <button onClick={() => handleClick('diagnostic')} type="button" className="btn btn-primary">Agregar Diagnostico</button>
                                        </div>
                                        <div className="col-md-12 my-3">
                                            <div className="list-group">
                                            {
                                                store.infoPet.History.diagnostics.map((diagnostic, index) => {
                                                    return (
                                                        <div key={index} className="list-group-item list-group-item-action" aria-current="true">
                                                            <div className="d-flex w-100 justify-content-between">
                                                                <p>{diagnostic.diagnostic}</p>
                                                                <small>{formatDate(diagnostic.date)}</small>
                                                            </div>
                                                            <p className="mb-1">Doctor: {diagnostic.doctor_name}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    view === 'surgeries' &&
                                    <div className="row mt-2">
                                        <div className="col-md-12 d-flex justify-content-center my-1">
                                            <button type="button" onClick={() => handleClick('surgery')} className="btn btn-primary">Agregar Operación</button>
                                        </div>
                                        <div className="col-md-12 my-3">
                                            <div className="list-group">
                                            {
                                                store.infoPet.History.surgeries.map((surgery, index) => {
                                                    return (
                                                        <div key={index} className="list-group-item list-group-item-action" aria-current="true">
                                                            <div className="d-flex w-100 justify-content-between">
                                                            <p>{surgery.description}</p>
                                                            <small>{formatDate(surgery.date)}</small>
                                                            </div>
                                                            <p className="mb-1">Doctor: {surgery.doctor_name}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                :
                    <LoadingSpinner />
            :
                <LoadingSpinner />
        }
        <div className="modal fade" id="modalVaccine" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar Vacuna:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <input ref={vaccineName} type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input ref={vaccineLot} type="text" className="form-control" placeholder="Serie" aria-label="Serie" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input ref={vaccineLaboratory} type="text" className="form-control" placeholder="Laboratory" aria-label="Laboratory" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <input ref={vaccineDate} type="date" className="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => vaccineToSend()}
                        >
                            Agregar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalDiagnostic" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar Diagnostico:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating">
                            <textarea
                                ref={diagnosticDescription}
                                className="form-control"
                                placeholder="Leave a description about diagnostic here..."
                                id="floatingTextarea2"
                                style={{height: "100px"}}
                            >
                            </textarea>
                            <label htmlFor="floatingTextarea2">Diagnostic:</label>
                        </div>
                        <div className="input-group mb-3">
                            <input ref={diagnosticDate} type="date" className="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => diagnosticToSend()}
                        >
                            Agregar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalSurgery" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Agregar Operación:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating">
                            <textarea
                                ref={surgeryDescription}
                                className="form-control"
                                placeholder="Leave a description about surgery here..."
                                id="floatingTextarea2"
                                style={{height: "100px"}}
                            >
                            </textarea>
                            <label htmlFor="floatingTextarea2">Surgery:</label>
                        </div>
                        <div className="input-group mb-3">
                            <input ref={surgeryDate} type="date" className="form-control" placeholder="Fecha" aria-label="Fecha" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => surgeryToSend()}
                        >
                            Agregar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default  DoctorAttending;
