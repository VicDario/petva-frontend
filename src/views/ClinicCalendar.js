import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from 'moment';
import { IoHelpCircle } from "react-icons/io5";
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const ClinicCalendar = (props) => {
    const { actions } = useContext(Context);
    let calendar = useRef(null);
    let [title, setTitle] = useState('');

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
            if (events[i].status === 'available'){
                title=`Dr. ${events[i].doctor_name} Disponible`;
                backgroundColor = "#3474d9";
            }else if (events[i].status === 'reserved'){
                title = `Dr. ${events[i].doctor_name}, Paciente: ${events[i].info_pet.name}, Telefono: ${events[i].phone}, Email: ${events[i].email_customer}`;
                backgroundColor = "#c29e29";
            }
            let start = moment.parseZone(events[i].date_start).format();
            let end = moment.parseZone(events[i].date_end).format();
            
            api.addEvent({
                title,
                start,
                end,
                allDay: false,
                id: events[i].id,
                backgroundColor,
                status: events[i].status
            })
        }
    }

    const handleEventClick = (arg) => {
        let status = arg.event.extendedProps.status;
        setTitle(arg.event.title);
        if (status === 'reserved'){
            let modal = new bootstrap.Modal(document.getElementById('modalReserved'));
            modal.show();
        }
        if (status === 'available'){
            let modal = new bootstrap.Modal(document.getElementById('modalAvailable'));
            modal.show();
        }
        if (status === 'canceled'){
            let modal = new bootstrap.Modal(document.getElementById('modalCanceled'));
            modal.show();
        } 
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
                eventClick={handleEventClick}
                height={"84vh"}
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
                        - Puede borrar consultas. Recomendable comunicarse con el cliente antes de cancelar la hora.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalAvailable" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Disponible</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalCanceled" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Cancelada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Disponible</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalReserved" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Reservada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Confirmar Asistencia</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                    </div>
                </div>
            </div>
        )
        </>
    )
}

export default ClinicCalendar;