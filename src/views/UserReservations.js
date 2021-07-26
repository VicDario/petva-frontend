import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";


const UserReservations = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    const [reservId, setReservId] = useState();
    useEffect(() => {
        actions.userGetReservations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleDelete = () => {
        console.log(reservId);
        if (reservId > 0 && reservId!==null){
            actions.userCancelReservation(reservId);
            Swal.fire({
                icon: "success",
                title: "Cita Eliminada Con Éxito",
                text: "Gracias por utilizar petVA",
                showConfirmButton: false,
                timer: 1800
            })
        }else{
            Swal.fire({
                icon: "error",
                title: "No se pudo eliminar cita",
                text: "Debe haber algún problema",
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
                                                                <td>{reservation.clinic_name}</td>
                                                                <td>{moment(reservation.date_start).utc().format("L")}</td>
                                                                <td>{moment(reservation.date_start).utc().format("LT")}</td>



                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <button 
                                                        onClick={(e) => setReservId(reservation.id)}
                                                        className="btn btn-danger m-2"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal"
                                                        >
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
            {/* Modal para verificar eliminación*/}
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
                                Cancelar cita
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                
                            />
                        </div>
                        <div className="modal-body">
                            <h4>
                                ¿Estás Seguro que deseas cancelar tu cita?
                            </h4>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelete()} 
                                data-bs-dismiss="modal"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserReservations;