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
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-12">
                                    <h2 className="display-1">Mis Doctores</h2>
                                    <hr className="hr-clinic-doctor mt-0 mb-4" />
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-12 ">
                                    <div className="d-flex justify-content-end">
                                        <Link to="/clinic/doctor/register" className="text-decoration-none badge rounded-pill btn-clinic-doctor p-3 m-1 fs-4 ">
                                            Registrar un nuevo medico
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4">
                        {
                            !!store.clinicDoctor ?
                                store.clinicDoctor.length > 0 ?
                                    store.clinicDoctor.map((doctor, index) => {
                                        return (
                                            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                                <div className="card card-doctor mb-3 align-items-center">
                                                    <img
                                                        src={!!doctor.picture ? doctor.picture : "/images/default-doctor.jpg"}
                                                        className="card-img-top img-doctor" alt={doctor.name}
                                                    />
                                                    <div className="">
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="card-title d-flex justify-content-center mt-2">
                                                            <h2 className="h3 text-center">Dr. {doctor.name} {doctor.lastname}</h2>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <span>{doctor.email}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <span>{doctor.specialty}</span>
                                                        </div>
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <button type="button" onClick={(e) => handleDelete(doctor.id)} className="btn btn-outline-danger">Eliminar</button>
                                                        </div>
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

                </div>
            }
        </>
    );
};
export default ClinicDoctor;