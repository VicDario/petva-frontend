import { Link } from "react-router-dom"
import logo from "../images/logo_pata.jpg"


const Navbar = ()=>{
    return(
        <> 
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid ">
                    <Link className="text-decoration-none" to="/">
                    <img className="img-fluid logo" src={logo} alt="logo" /></Link>
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
                    <div className="collapse navbar-collapse  justify-content-md-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                           <div className="text-end">
                                <Link className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">Registrarse</Link>
                           </div>
                           <div className="text-end">
                                <Link className="text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4" to="/login">Iniciar Sesión</Link>
                           </div>
                            
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Navbar