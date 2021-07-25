import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import moment from "moment";


const UserReservations = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    useEffect(() => {
        actions.userGetReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleDelete = (reserv) => {
        console.log(reserv);
        if(reserv>0 && reserv!==null){
            actions.userCancelReservation(reserv);
            Swal.fire({
                icon: "success",
                title: "Cita Eliminada Con Éxito",
                text: "Gracias por utilizar petVA",
                showConfirmButton: false,
                timer: 1800
            })
        }
        
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 mx-auto">
                    {
                        !!localStorage.getItem("petvaToken") ?
                            <div>
                                <h3>Mis consultas veterinarias</h3>
                                <ul className="list-group">
                                    {
                                        !!store.userReservations &&
                                        store.userReservations.map((reservation, index) => {
                                            return (
                                                <div
                                                className="d-flex "
                                                key={index}
                                                >
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Paciente</th>
                                                                <th scope="col">Veterinario</th>
                                                                <th scope="col">Clinica</th>
                                                                <th scope="col">Fecha</th>
                                                                <th scope="col">Hora</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{reservation.info_pet.name}</td>
                                                                <td>{reservation.doctor_name}</td>
                                                                <td>{reservation.id_clinic}</td>
                                                                <td>{moment(reservation.date_start).utc().format("L")}</td>
                                                                <td>{moment(reservation.date_start).utc().format("LT")}</td>



                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <button 
                                                        onClick={(e) => handleDelete(reservation.id)}
                                                    className="btn btn-danger m-2">
                                                        Cancelar Cita
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </ul>
                            </div>








                            : history.push("/")
                    }

                </div>
            </div>
        </div>
    )
}

export default UserReservations;