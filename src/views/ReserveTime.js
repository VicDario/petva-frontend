
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";

const Reservetime = ()=>{
    const {store,actions} = useContext(Context);
    const [clinic, setClinic] = useState({
        name : null,
        id : "0"
    });
    const [doctor, setDoctor] = useState({
        
        id: null
    });
    
    useEffect(()=>{
        actions.getClinicsList();
        
    },[]);
    const giveValueClinic = (e)=>{
        setClinic({
            ...clinic,
            id : e.target.value,
            
        });
        if(e.target.value !== "0"){

            actions.getDoctorsList(e.target.value);
        }
    }
    const giveValueDoctor = (e) => {
        setDoctor({
            ...doctor,
            id: e.target.value,

        });
        
    }
    const getReservations = ()=>{
        actions.getDoctorReservations(clinic.id,doctor.id);
        console.log(doctor.id);
    }

    
    return(
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>RESERVAR HORA MEDICA</h1>
                </div>
                <div className="col-12 col-md-8 mx-auto">
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
                                onChange={(e)=>{giveValueClinic(e)}}
                               
                        >
                            <option value="0">Lista de Cínicas</option>
                            {store.clinicsList.map((clinic,index)=>{
                                return(
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
                                            onChange={(e) => { giveValueDoctor(e)}}
                                    

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
                        <button onClick={getReservations}>
                            Ver Horas disponibles
                        </button>
                </div>
                {
                    !!store.doctorReservations &&
                    <div>
                        <ul className="list-group">
                            {
                                store.doctorReservations.map((reservation,index)=>{
                                    return(
                                        <>
                                            <li 
                                            className="list-group-item " 
                                            aria-current="true"
                                            key={index}
                                            >{reservation.date_start}</li>
                                        </>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Reservetime;