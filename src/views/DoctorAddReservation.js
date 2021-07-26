import { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";
import moment from "moment";
import Swal from "sweetalert2";
import { useEffect } from "react";


const DoctorAddReservation = () => {
    const { store,actions } = useContext(Context);
    const [generate, setGenerate] = useState({
        date: null,
        timeFinal: null,
        timeStart: null
    });
    const dateR = useRef(null);
    const timeR = useRef(null);
    /* const [hour, setHour] = useState({
        hour_start: null,
        hour_end: null
    }); */
    const generateDateforSend = (date, time) => {
        let dateF = date.split("-");
        dateF = dateF.reverse()
        dateF = dateF.join("/")
        dateF = dateF + " ";
        setGenerate({ ...generate, date: dateF })
    }
    const generateTimeforSend = (time) => {
        let timeF = parseInt(time.substring(3));
        let timeS = time+":00";
        timeF += 30;
        timeF = time.substring(0, 2) + ":" + timeF.toString()+":00"
        setGenerate({ ...generate, timeFinal: timeF, timeStart: timeS })
    }
    const generateTimeFinal = (date)=>{
        let dateM = new Date(date)
        const mediaHora = "00:30:00"
        dateM= moment(dateM).add(moment.duration(mediaHora))
        console.log(moment(dateM).format("hh:mm:ss"));
        return moment(dateM).format("HH:mm:ss")
    }

    const generateReservation = () => {
        if(generate.date !== "" && generate.timeStart !=="" && generate.timeFinal !== "" &&
            generate.date !== null && generate.timeStart !== null && generate.timeFinal !== null){

            actions.doctorAddReservation((generate.date+generate.timeStart),(generate.date+generate.timeFinal))
            /* console.log(generate.date + generate.timeStart);
            console.log(generate.date + generate.timeFinal); */
            Swal.fire({
                icon: "success",
                title: "Hora Generada con Éxito",
                text: "Gracias por utilizar petVA",
                showConfirmButton: false,
                timer: 1800
            })
            setGenerate({
                date: null,
                timeFinal: null,
                timeStart: null})
            dateR.current.value = null;
            timeR.current.value = null;

        }else{
            Swal.fire({
                icon: "error",
                title: "No se puede generar Hora",
                text: "Revisa que Fecha y hora sean correctos",
                showConfirmButton: false,
                timer: 1800
            })
        }
    }
    
    useEffect(()=>{
        actions.doctorGetReservationsReserved();

    },[])



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-12">
                    <div>
                        <h1>
                            Generar Hora Para reserva
                        </h1>
                    </div>
                    <div>
                        <div className="m-1">
                            <label className="form-label" htmlFor="">Selecciona Fecha</label>
                            <input className="form-control" type="date"
                                onChange={(e) => { generateDateforSend(e.target.value) }}
                                ref={dateR}

                            />
                            {generate.date}
                        </div>
                        <div>
                            <label className="form-label" htmlFor="">Seleccionar Hora</label>
                            <input className="form-control" type="time"
                                max="22:30:00" min="06:00:00"
                                onChange={(e) => { generateTimeforSend(e.target.value) }}
                                ref={timeR}
                            />
                        </div>
                        <div>
                            <button
                                onClick={generateReservation}
                            >
                                Generar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <h1>
                        Horas Disponibles para Reserva
                    </h1>
                    <div>
                        <ul>
                        {
                            !!store.doctorReservations &&
                            store.doctorReservations.map((reservation,index)=>{
                                return(
                                    
                                    <>{
                                        reservation.status === "available" &&
                                        <li
                                        key={index}>
                                            {reservation.date_start}
                                        </li>
                                    }</>
                                    
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
                <div className="col-md-4 col-12">
                    <h1>
                        Horas Reservadas
                    </h1>
                    <div>
                        <ul>
                            {
                                !!store.doctorReservations &&
                                store.doctorReservations.map((reservation, index) => {
                                    return (

                                        <>{
                                            reservation.status === "reserved" &&
                                            <li
                                                key={reservation.id*9}>
                                                {reservation.date_start}
                                            </li>
                                        }</>

                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default DoctorAddReservation;