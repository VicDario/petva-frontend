import { useContext, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from 'moment';

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
                title=`${events[i].doctor_name} Disponible`;
                backgroundColor = "#4287f5";
            }else{
                title = `${events[i].name_doctor}, Paciente: ${events[i].info_pet.name}, Email: ${events[i].email}`;
                backgroundColor = "#f5ce42";
            }
            let start = moment(events[i].date_start).format();
            let end = moment(events[i].end_time).format();
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
    useEffect(() => {
        syncEvens();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FullCalendar
        ref={calendar}
        plugins={[ timeGridPlugin, interactionPlugin ]}
        initialView="timeGridDay"
        allDaySlot={false}
        businessHours={{
            daysOfWeek: [ 1, 2, 3, 4, 5, 6, 7 ],
            startTime: '08:00', 
            endTime: '20:00' 
        }
        }
        slotDuration={"00:30"}
        dateClick={handleDateClick}
        height={"85vh"}
        validRange= {function (){
                const today = new Date();
                const day = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear(); 
                return {
                    start: `${year}-${month > 9 ? month : `0${month}`}-${day}`
                }
            }
        }
        />
    )
}

export default ClinicCalendar;