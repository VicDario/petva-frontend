import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LoadingSpiner from "../Components/LoadingSpinner";
import { Link } from "react-router-dom";
const ClinicDoctor = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getClinicDoctor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleDelete = (doctor_id) => {
        console.log(doctor_id);
        actions.deleteDoctor(doctor_id);
    };
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") &&
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <h2 className="display-1">Mis Doctores</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {
                            !!store.clinicDoctor ?
                                store.clinicDoctor.length > 0 ?
                                    store.clinicDoctor.map((doctor, index) => {
                                        return (
                                            <div className="col-sm-6 col-md-4" key={index}>
                                                <div className="card mb-3">
                                                    <img
                                                        src={!!doctor.picture ? doctor.picture : "/images/default-doctor.jpg"}
                                                        className="card-img-top" alt={doctor.name}
                                                        style={{ height: "50vh" }}
                                                    />
                                                    <div className="card-title">
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <h2 className="h2">{doctor.name}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <span>{doctor.name} {doctor.lastname}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <span>{doctor.email}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <span>{doctor.specialty}</span>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer d-flex justify-content-center">
                                                        <button type="button" onClick={(e) => handleDelete(doctor.id)} className="btn btn-outline-danger">Eliminar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <div className="col-sm-12 pt-4">
                                            <h3 className="text-center">
                                                No tienes medicos registrados
                                            </h3>
                                        </div>) : <LoadingSpiner />
                        }
                    </div>
                    <div className="row">
                        <div className="col-sm-12 d-flex justify-content-center">
                            <Link to="/clinic/doctor/register" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                Registrar un nuevo medico
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default ClinicDoctor;