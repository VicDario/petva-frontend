import { Link, useHistory } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import LoadingSpiner from "../Components/loading-spiner.component";
//import { useEffect } from "react";


const HomeFoundation = () => {
    const { store, actions } = useContext(Context);
    //let { token } = store;
    const history = useHistory();
    useEffect(() => {
        actions.getFoundationDetail();
        actions.getPetsFoundation();
        actions.getPetsFoundationWithOwner();
        if(localStorage.getItem("petvaUser") !== 'foundation') history.push("/");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container-fluid">
                        {
                            !!store.foundationDetail ?
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center align-items-center flex-column">
                                        <h2 className="text-center my-4 title-home">Bienvenido, {store.foundationDetail.name}</h2>
                                        <Link
                                            to="/foundation/pets/adoption"
                                            className="btn-home link-green d-flex justify-content-between align-items-center my-4"
                                        >
                                            <span className="m-0">
                                                <img className="icon-link" src="/images/pet.png" alt="pet"/>
                                            </span>
                                            <p>Mascotas en adopcion</p>
                                        </Link>
                                        <Link
                                            to="/foundation/pets/tracking"
                                            className="btn-home link-green d-flex justify-content-between align-items-center my-4"
                                        >
                                            <span className="fs-1 m-0">
                                                <img className="icon-link" src="/images/dog.png" alt="house" />
                                            </span>
                                            <p>Mascotas en seguimiento</p>
                                        </Link>
                                    </div>
                                    <div className="col-md-6 col-sm-12 my-1 d-flex justify-content-center">
                                        <img src="/images/dog_home.png" className="image-home" alt="Perro"/>
                                    </div>
                                </div>

                            :
                                <LoadingSpiner />
                        }
                    </div>
                :
                    history.push("/foundation/login")
            }
        </>
    );
}
export default HomeFoundation;
