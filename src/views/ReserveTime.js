
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";
import { FaCat, FaDog, FaUser } from "react-icons/fa";

const Reservetime = () => {
    const { store, actions } = useContext(Context);
    const [clinic, setClinic] = useState({
        name: null,
        id: "0"
    });
    const [doctor, setDoctor] = useState({

        id: null
    });
    const [reservation, setReservation] = useState({
        id: null
    });
    console.log(reservation.id);

    useEffect(() => {
        actions.getMascotasUser();
        actions.getClinicsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const giveValueClinic = (e) => {
        setClinic({
            ...clinic,
            id: e.target.value,

        });
        if (e.target.value !== "0")
        {

            actions.getDoctorsList(e.target.value);
        }
    }
    const giveValueDoctor = (e) => {
        setDoctor({
            ...doctor,
            id: e.target.value,

        });
        if (e.target.value !== "0")
        {

            actions.getDoctorReservations(clinic.id, e.target.value);
        }

    }
    /* const giveValueToReservation = () => {
        setReservation({
            ...reservation,
            id:   
        })
    } */

    const postReservation = ()=>{
        /* actions.bookAppointment(pet_id, reservation_id, clinic.id, doctor.id); */
    }
    


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>RESERVAR HORA MEDICA</h1>
                </div>
                <div className="col-12 col-md-8 mx-auto">
                    <div className="text-center">
                        <h5>Conoce el id de tus Mascotas</h5>
                        
                    </div>
                    <div>
                        {
                            !!store.pets &&
                                store.pets.length > 0 ?
                                <div className="d-flex">
                                    {
                                        store.pets.map((pet, index) => {
                                            return (
                                                <>
                                                    <div
                                                        
                                                        key={index}
                                                        className="card-title fs-3 me-2 d-flex flex-column border">
                                                        <span>
                                                            {pet.name} 
                                                        </span>
                                                        <span
                                                            className="text-center"
                                                        >{/* {pet.specie === 'cat' ? (<FaCat
                                                            className="align-top ms-1" />) : <FaDog
                                                            className="align-top ms-1" />} */}
                                                            {pet.id}
                                                        </span>

                                                    </div>

                                                </>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <p>No tienes mascotas inscritas</p>
                        }
                    </div>
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
                                            <option value="null">Veterinarios</option>
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
                        !!store.doctorReservations &&
                        <>
                            <div>
                                <h4>
                                    Horas Disponibles
                                </h4>
                            </div>
                            <div>
                                <ul className="list-group my-3">
                                    {
                                        store.doctorReservations.map((reservation, index) => {
                                            return (
                                                <>
                                                    <li
                                                        className="list-group-item "
                                                        aria-current="true"
                                                        key={index}
                                                        value={reservation.id}
                                                    >{reservation.date_start}</li>
                                                    <button
                                                    onClick={()=>{setReservation({...reservation,id:reservation.id})}}
                                                    >
                                                        Tomar hora
                                                    </button>
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </>
                    }
                </div>
                {
                    reservation.id !== null &&
                    <div className="col-12">
                    <h3>Confirmar datos</h3>
                    <div></div>
                    <div>
                        <button>
                            Confirmar Hora
                        </button>
                        <button>
                            Cancelar
                        </button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Reservetime;