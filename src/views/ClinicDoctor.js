import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LoadingSpiner from "../Components/LoadingSpinner";
const ClinicDoctor = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        actions.getClinicDoctor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {
                !!store.token &&
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
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-center">
                                                            <h2>{doctor.name}</h2>
                                                            <h2>{doctor.lastname}</h2>
                                                            <h2>{doctor.specialty}</h2>
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
                                        </div>): <LoadingSpiner/>
                        }
                    </div>
                </div>
            }
        </>
    );
};
export default ClinicDoctor;