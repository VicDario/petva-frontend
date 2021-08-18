import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/appContext";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from 'moment';
import { IoHelpCircle } from "react-icons/io5";
import esLocale from '@fullcalendar/core/locales/es';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const DoctorCalendar = (props) => {
    const { actions } = useContext(Context);
    let calendar = useRef(null);
    let [title, setTitle] = useState('');
    let [id, setId] = useState('');
    let [idPet, setIdPet] = useState('');
    let [dateStart, setDateStart] = useState('');
    let [dateEnd, setDateEnd] = useState('');

    let syncEvens = async () => {
        let events = await actions.doctorGetReservations();
        let api = calendar.current.getApi();
        api.removeAllEvents();
        if (events === undefined ){
            actions.logOut();
            props.history.push("/doctor/login");
            return
        }
        for (let i = 0; i < events.length; i++) {
            let title = "";
            let backgroundColor = "";
            if (events[i].status === 'available'){
                title=`Hora disponible`;
                backgroundColor = "#82a2d6";
            }else if (events[i].status === 'reserved'){
                title = `Paciente: ${events[i].info_pet.name}, Telefono: ${events[i].phone}, Email: ${events[i].email_customer}. Cita reservada`;
                backgroundColor = "#2186d4";
            }else if(events[i].status === 'canceled'){
                if(events[i].info_pet === null){
                    title = `Cita cancelada, Sin informacion de paciente`;
                }else{
                    title = `Paciente: ${events[i].info_pet.name}, Telefono: ${events[i].phone}, Email: ${events[i].email_customer} Cancelada`;
                }
                backgroundColor = "#cf2020";
            }else if(events[i].status === 'confirmed'){
                title = `Paciente: ${events[i].info_pet.name}. En espera para consulta`;
                backgroundColor = "#359c33";
            }else if(events[i].status === 'missed'){
                title = `Cita Perdida`;
                backgroundColor = "#d44e29";
            }else if(events[i].status === 'finished'){
                title = `Cita Atendida`;
                backgroundColor = "#16526c";
            }
            let start = moment.parseZone(events[i].date_start).format();
            let end = moment.parseZone(events[i].date_end).format();
            let idPet = null
            if (events[i].info_pet !== null)    idPet = events[i].info_pet.id;
            
            api.addEvent({
                title,
                start,
                end,
                allDay: false,
                id: events[i].id,
                backgroundColor,
                status: events[i].status,
                idPet
            })
        }
    }

    const handleEventClick = (arg) => {
        let status = arg.event.extendedProps.status;
        setId(arg.event.id);
        setTitle(arg.event.title);
        setIdPet(arg.event.extendedProps.idPet);
        if (status === 'available'){
            let modal = new bootstrap.Modal(document.getElementById('modalAvailable'));
            modal.show();
        }
        if (status === 'canceled'){
            let modal = new bootstrap.Modal(document.getElementById('modalCanceled'));
            modal.show();
        }
        if(status === 'confirmed'){
            let modal = new bootstrap.Modal(document.getElementById('modalConfirmed'));
            modal.show();
        }
    }

    const handleChangeEvent = async (status) => {
        let resp = await actions.doctorUpdateReservation(id, status);
        if (resp.ok){
            syncEvens()
        }
    }

    const handleDayClick =(arg) => {
        let init = moment(arg.dateStr).format('DD/MM/YYYY HH:mm:ss');
        let end = moment(arg.dateStr).add(30, 'minutes').format('DD/MM/YYYY HH:mm:ss');
        setDateStart(String(init))
        setDateEnd(String(end))
        setTitle(`Desea abrir consulta ${init}?`)
        let modal = new bootstrap.Modal(document.getElementById('modalCreateHour'));
        modal.show();
    }

    const openHour = async () => {
        let resp = await actions.doctorAddReservation(dateStart, dateEnd);
        if (resp.ok){
            syncEvens();
        }
    }
    const goToAttention = () => {
        props.history.push(`/doctor/attending/${id}/${idPet}`);
    }
    useEffect(() => {
        syncEvens()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <FullCalendar
                timeZone = 'America/Santiago'
                locale = { esLocale }
                ref = { calendar }
                plugins = {[ timeGridPlugin, interactionPlugin ]}
                headerToolbar = {{
                    left: 'prev,next addEventButton',
                    center: 'title',
                    right: 'today timeGridDay,timeGridWeek'
                }}
                initialView = "timeGridDay"
                allDaySlot = { false }
                businessHours={{
                    daysOfWeek: [ 1, 2, 3, 4, 5, 6, 7 ],
                    startTime: '08:00',
                    endTime: '20:00' 
                }}
                slotDuration = { "00:30" }
                eventClick = { handleEventClick }
                dateClick = { handleDayClick }
                height = { "84vh" }
                customButtons = {{
                    addEventButton: {
                        text: 'Actualizar Calendario',
                        click: function() {
                            let api = calendar.current.getApi();
                            api.removeAllEvents();
                            syncEvens()
                        }
                    }
                }}
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
                        <p>- Seleccionar una fecha para ver las horas reservadas y las horas disponibles</p>
                        <p>- Puede cancelar consultas. Recomendable comunicarse con el cliente antes de cancelar la hora.</p>
                        <p>- Leyenda:</p>
                        <div className="d-flex align-items-center"><div className="cube-leyend available"></div><span>Cita abierta/disponible.</span></div>
                        <div className="d-flex align-items-center"><div className="cube-leyend reserved"></div><span>Cita reservada.</span></div>
                        <div className="d-flex align-items-center"><div className="cube-leyend canceled"></div><span>Cita cancelada.</span></div>
                        <div className="d-flex align-items-center"><div className="cube-leyend confirmed"></div><span>Cita confirmada</span></div>
                        <div className="d-flex align-items-center"><div className="cube-leyend missed"></div><span>Cita perdida.</span></div>
                        <div className="d-flex align-items-center"><div className="cube-leyend finished"></div><span>Cita finalizada/atendida.</span></div>
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
                        <button 
                            type="button" 
                            className="btn btn-warning" 
                            data-bs-dismiss="modal"
                            onClick={() => handleChangeEvent('missed')}
                        >
                            Perdida
                        </button>
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
                        <button 
                        type="button" 
                        className="btn btn-warning" 
                        data-bs-dismiss="modal"
                        onClick={() => handleChangeEvent('missed')}
                        >
                            Perdida
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalConfirmed" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Paciente en espera:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"   
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => goToAttention()}
                        >
                            Atender
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalCreateHour" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Abrir hora para consulta:</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {title}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"   
                            className="btn btn-success"
                            data-bs-dismiss="modal"
                            onClick={() => openHour()}
                        >
                            Crear hora
                        </button>
                        <button
                            type="button"   
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
        </>
    )
}

export default DoctorCalendar;