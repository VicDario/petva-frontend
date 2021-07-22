
import { Link, useHistory } from "react-router-dom";
import UpdatePet from "./UpdatePet";



const HomeUser = () => {
    
    
    const history = useHistory()

    return (
        <> 
        {
            !!localStorage.getItem("petvatoken") !== null ?
                <div className="container">
                    <div className="text-center my-4">
                        <h2 className="display-1">Bienvenido Usuario</h2>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <Link to="/user/profile" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                Mis Datos
                            </Link >
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            <button className="btn btn-secondary btn-lg fs-2 my-3  item texto-borde fw-bold ">
                                Perdidos y Encontrados
                            </button>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <Link to="/user/pets" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                Mis Mascotas
                            </Link >
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                            <Link to="/services" className="btn btn-secondary btn-lg fs-2 my-3 item texto-borde fw-bold d-flex align-items-center justify-content-center ">
                                Servicios
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