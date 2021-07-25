import { useContext } from "react";
import { useState } from "react";
import { Context } from "../store/appContext";

const DoctorAddReservation = () => {
    const { actions } = useContext(Context);
    const [generate, setGenerate] = useState({
        date: null,
        timeFinal: null,
        timeStart: null
    });
    const [hour, setHour] = useState({
        hour_start: null,
        hour_end: null
    });
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

    const generateReservation = () => {
        actions.doctorAddReservation((generate.date+generate.timeStart),(generate.date+generate.timeFinal))
        console.log(generate.date + generate.timeStart);
        console.log(generate.date + generate.timeFinal);
    }



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

                            />
                            {generate.date}
                        </div>
                        <div>
                            <label className="form-label" htmlFor="">Seleccionar Hora</label>
                            <input className="form-control" type="time"
                                max="22:30:00" min="06:00:00"
                                onChange={(e) => { generateTimeforSend(e.target.value) }}
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
                </div>
                <div className="col-md-4 col-12">
                    <h1>
                        Horas Reservadas
                    </h1>
                </div>

            </div>
        </div>

    )
}

export default DoctorAddReservation;