
import { Link, useHistory } from "react-router-dom";
import {FcOvertime} from "react-icons/fc"
 


const HomeUser = () => {
    
    
    const history = useHistory()

    return (
        <> 
        {
            !!localStorage.getItem("petvaToken") ?
                <div className="container">
                    <div className="text-center my-4">
                        <h2 className="display-1">Bienvenido Usuario</h2>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <Link to="/user/reserve" 
                            className="btn btn-primary fs-2 fw-bold ">
                                <span className="fs-1 m-0"><FcOvertime/></span>
                                <p>Reservar</p>
                                <p>Hora Veterinaria</p>
                            </Link >
                        </div>
                       
                    </div>
                </div>
            :
                history.push("/user/login")
            }
        </>
    )
}

export default HomeUser;