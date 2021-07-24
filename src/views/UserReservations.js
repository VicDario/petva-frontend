import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";


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
                                                    <li
                                                        className="list-group-item m-2"
                                                        style={{width:"300px"}}
                                                    >
                                                        {reservation.date_start} {reservation.info_pet.name}
                                                    </li>
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