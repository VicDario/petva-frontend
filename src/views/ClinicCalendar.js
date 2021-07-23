import { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from 'moment';
import { IoHelpCircle } from "react-icons/io5";

const ClinicCalendar = (props) => {
    const { actions } = useContext(Context);
    let calendar = useRef(null);

    const handleDateClick = (arg) => { // bind with an arrow function
        let api = calendar.current.getApi();
        api.removeAllEvents();
        syncEvens();
    }
    let syncEvens = async () => {
        let events = await actions.getHoursReserved();
        let api = calendar.current.getApi();
        if (events === undefined ){
            props.history.push("/clinic/login");
            return
        }
        for (let i = 0; i < events.length; i++) {
            let title = "";
            let backgroundColor = "";
            if (events[i].id_pet === null){
                title=`Dr. ${events[i].doctor_name} Disponible`;
                backgroundColor = "#4287f5";
            }else{
                title = `Dr. ${events[i].doctor_name}, Paciente: ${events[i].info_pet.name}, Email: ${events[i].email_customer}`;
                backgroundColor = "#f5ce42";
            }
            let start = moment.parseZone(events[i].date_start).format();
            let end = moment.parseZone(events[i].date_end).format();
            
            /* console.log(start);
            console.log(events[i].date_end)
            console.log(end);
            console.log(events[i].date_start) */
            api.addEvent({
                title,
                start,
                end,
                allDay: false,
                id: events[i].id,
                backgroundColor,
            })
        }
    }

    const handleEventClick = (arg) => {
        console.log(arg);
    }
    useEffect(() => {
        let api = calendar.current.getApi();
        api.removeAllEvents();
        syncEvens()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <FullCalendar
                timeZone= 'America/Santiago'
                ref={calendar}
                plugins={[ timeGridPlugin, interactionPlugin ]}
                headerToolbar= {{
                    left: 'prev,next addEventButton',
                    center: 'title',
                    right: 'today timeGridDay,timeGridWeek'
                }}
                initialView="timeGridDay"
                allDaySlot={false}
                businessHours={{
                    daysOfWeek: [ 1, 2, 3, 4, 5, 6, 7 ],
                    startTime: '08:00',
                    endTime: '20:00' 
                }}
                slotDuration={"00:30"}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={"84vh"}
                validRange= {function (){
                        const today = new Date();
                        const day = today.getDate();
                        const month = today.getMonth() + 1;
                        const year = today.getFullYear(); 
                        return {
                            start: `${year}-${month > 9 ? month : `0${month}`}-${day}`
                        }
                }}
                customButtons={{
                    addEventButton: {
                    text: 'Actualizar Calendario',
                    click: function() {
                        let api = calendar.current.getApi();
                        api.removeAllEvents();
                        syncEvens()
                    }
                }}}
            />

            <button type="button" className="btn btn-primary fixed" data-bs-toggle="modal" data-bs-target="#modalHelpCalendarClinic">
            <IoHelpCircle className="btn--help" />
            </button>

            <div className="modal fade" id="modalHelpCalendarClinic" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ayuda</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    - Seleccionar una fecha para ver las horas reservadas y las horas disponibles<br/>
                    - Puede borrar consultas. Recomendable comunicarse con el cliente antes de borrar la hora.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ClinicCalendar;