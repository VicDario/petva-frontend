import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { FaCat, FaDog } from "react-icons/fa";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import moment from "moment";
import 'moment/locale/es';


const ReserveTime = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    const [clinic, setClinic] = useState({
        id: "0",
        aux: null
    });
    const [doctor, setDoctor] = useState({

        id: "0"
    });
    const [reservation, setReservation] = useState({
        id: null
    });
    const [mascota, setPet] = useState({
        id: null
    });
    if (clinic.id === 0)
    {
        setDoctor({ id: "0" });
    }
    useEffect(() => {
        actions.getMascotasUser();
        actions.getClinicsList();
        if (clinic.id !== "0" && doctor.id !== "0")
        {
            if (clinic.id !== null && doctor.id !== null)
            {

                actions.getDoctorReservations(clinic.id, doctor.id)
            }
        }
        if (clinic.aux !== clinic.id)
        {
            if (clinic.id !== null && doctor.id !== null && clinic.id !== "0" && doctor.id !== "0")
            {

                actions.getDoctorReservations(clinic.id, doctor.id)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const giveValueClinic = (e) => {
        setClinic({
            ...clinic,
            id: e.target.value,
            aux: e.target.value
        });
        if (e.target.value !== "0")
        {
            actions.getDoctorsList(e.target.value);
            if (doctor.id !== "0" && doctor.id !== null)
            {
                actions.getDoctorReservations(clinic.id, e.target.value);
            }
        }
    }
    const giveValueDoctor = (e) => {
        setDoctor({
            ...doctor,
            id: e.target.value
        });
        if (e.target.value !== "0")
        {
            actions.getDoctorReservations(clinic.id, e.target.value);
        }

    }

    const postReservation = () => {
        if (mascota.id !== null && mascota.id !== "" && reservation.id !== null && reservation.id !== "" &&
            clinic.id !== null && clinic.id !== "" && doctor.id !== null && doctor.id !== "")
        {
            actions.bookAppointment(mascota.id, reservation.id, clinic.id, doctor.id);
            setClinic({ ...clinic, id: null, });
            setDoctor({ ...doctor, id: null });
            setReservation({ ...reservation, id: null })
            setPet({ ...mascota, id: null })
            Swal.fire({
                icon: "success",
                title: "Cita Agendada con Éxito",
                text: "Gracias por utilizar petVA",
                showConfirmButton: false,
                timer: 1800
            })
            history.push("/user")
        }
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>RESERVAR HORA MEDICA</h1>
                </div>
                <div className="col-12 col-md-8 mx-auto ">
                    <div>
                        <h3>Lista de Clínicas Veterinarias</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque, veniam!</p>
                    </div>
                    <div>
                        {
                            !!store.clinicsList &&

                            <select
                                className="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example"
                                onChange={(e) => { giveValueClinic(e) }}

                            >
                                <option value="0">Lista de Cínicas</option>
                                {store.clinicsList.map((clinic, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={clinic.id}>
                                            {clinic.name}
                                        </option>
                                    )
                                })}
                            </select>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-8 mx-auto">
                    {
                        clinic.id !== "0" ?
                            <>
                                <div>
                                    <h3>Lista Veterinarios</h3>
                                </div>
                                <div>
                                    {
                                        !!store.doctorsList &&

                                        <select
                                            className="form-select form-select-lg mb-3"
                                            aria-label=".form-select-lg example"
                                            onChange={(e) => { giveValueDoctor(e) }}
                                        >
                                            <option value="0">Veterinarios</option>
                                            {store.doctorsList.map((doctor, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={doctor.id}
                                                    >
                                                        {doctor.name} {doctor.lastname} -----  {doctor.specialty}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                            </>
                            :
                            <div>
                                <h3>
                                    Debes Seleccionar una clínica para ver sus veterinarios y reservar tu hora
                                </h3>
                            </div>
                    }
                </div>
                <div className="col-md-8 mx-auto col-12">

                    {
                        !!store.doctorReservations && clinic.id !== "0" && doctor.id !== "0" &&
                        <>
                            <div>
                                <h4>
                                    Horas Disponibles
                                </h4>
                            </div>
                            <div>
                                <ul className="list-group my-3">
                                    {
                                        store.doctorReservations.length > 0 && doctor.id > 0 ?
                                            <ul>
                                            {
                                                store.doctorReservations.map((reservation, index) => {
                                                    return (
                                                        <>
                                                            <li
                                                                key={index}
                                                                className="list-group-item "
                                                                aria-current="true"
                                                                value={reservation.id}
                                                            >{moment(reservation.date_start).locale("es").utc().format("LLLL")}
                                                            </li>
                                                            <button

                                                                type="button"
                                                                className="btn btn-primary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#exampleModal"
                                                                
                                                                onClick={() => { setReservation({ ...reservation, id: reservation.id }) }}
                                                            >
                                                                Reservar Hora
                                                            </button>
                                                        </>
                                                    )
                                                })
                                            }
                                            </ul>
                                        :
                                            <p>No Hay Horas Disponibles </p>
                                    }
                                </ul>
                            </div>
                        </>
                    }
                </div>

            </div>
            
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
                                Reservar Hora
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
                                <h3>
                                    Selecciona para que mascota es la consulta veterinaria
                                </h3>
                            </div>
                            <div className="d-flex">
                                {
                                    !!store.pets && !!store.doctorReservations && !!store.doctorsList && clinic.id !== 0 &&
                                    store.pets.map((pet, index) => {
                                        return (
                                            <>{
                                                pet.state === "owned" &&
                                                <div
                                                    key={index}
                                                    className="card-title fs-3 me-2 d-flex flex-column border">
                                                    <button
                                                        onClick={() => { setPet({ ...mascota, id: pet.id, name: pet.name }) }}
                                                    >
                                                        {pet.name}
                                                    </button>
                                                    <span
                                                        className="text-center"
                                                    > {pet.specie === 'cat' ? (<FaCat
                                                        className="align-top ms-1" />) : <FaDog
                                                        className="align-top ms-1" />}
                                                    </span>
                                                </div>
                                            }
                                            </>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Mascota</th>
                                            <th scope="col">Veterinario</th>
                                            <th scope="col">Clinica</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Hora</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{mascota.name}</td>
                                            <td>{reservation.doctor_name}</td>
                                            <td>{reservation.clinic_name}</td>
                                            <td>{moment(reservation.date_start).utc().format("LL")}</td>
                                            <td>{moment(reservation.date_start).utc().format("HH:mm")}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => { setPet({ ...mascota, id: null }) }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={postReservation}
                                    data-bs-dismiss="modal"
                                >
                                    Confirmar y reservar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReserveTime;