
import { Link } from "react-router-dom"
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";


const Navbar = () => {

    const { store, actions } = useContext(Context);
    /*  let { token } = store; */
    /* let token = sessionStorage.getItem("token") */

    //const token = localStorage.getItem("token")
    useEffect(()=>{
        actions.syncTokenFromSessionStore();
    },[]);
    const history = useHistory();
    const logout = () => {
        actions.logOut()
        
        history.push("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
            <div className="container-fluid ">
                <Link className="text-decoration-none" to="/">
                <img className="img-fluid logo" src="/images/logo_cat_small.png" alt="logo" /></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {
                !store.token  ?
                <div className="collapse navbar-collapse  justify-content-md-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="text-end">
                            <Link to="/register" className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">Registrarse</Link>
                        </div>
                        <div className="text-end">
                            <div className="dropdown">
                                <button
                                    className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4 dropdown-toggle"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Iniciar sesión como
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li>
                                        <Link className="dropdown-item" to="/user/login">
                                            Usuario Normal
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/foundation/login">
                                            Fundación
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/clinica/login">
                                            Clínica
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="collapse navbar-collapse  justify-content-md-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <div className="text-end">
                            <Link to={store.userType==="normal"?"/user": store.userType==="foundation"?"/foundation":history.push("/")} className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">Mi Perfil</Link>
                        </div>
                        <div className="text-end">
                            <Link onClick={logout} className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4" >Cerrar Sesión</Link>
                        </div>
                    </div>
                </div>
                }
            </div>
        </nav>
    )
}
export default Navbar