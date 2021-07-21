
import { Link } from "react-router-dom"
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { AiOutlineHome } from 'react-icons/ai';
import { IoLogOutOutline, IoLogInOutline } from 'react-icons/io5';
import { MdPets } from "react-icons/md";


const Navbar = () => {

    const { store, actions } = useContext(Context);



    useEffect(() => {
        if (localStorage.getItem("petvaToken") !== null) store.token = localStorage.getItem("petvaToken");
        else store.token = false;
        store.userType = localStorage.getItem("petvaUser")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //Si exite token recupera la sesion

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
                    localStorage.getItem("petvaToken") === null ?
                        <div className="collapse navbar-collapse  justify-content-md-end" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <div className="text-end" >


                                    <Link to="/register" className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">
                                        Registrarse <MdPets className="navbar__button--icon" />
                                    </Link>

                                </div>
                                <div className="text-end">
                                    <div className="dropdown">
                                        <button
                                            className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4 dropdown-toggle"
                                            id="dropdownMenuLink"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Iniciar sesión <IoLogInOutline className="navbar__button--icon" />
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <li>
                                                <Link className="dropdown-item" to="/user/login">
                                                    Usuario
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/foundation/login">
                                                    Fundación
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/clinic/login">
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
                                    {
                                        localStorage.getItem("petvaUser") === "normal" &&
                                        <Link to="/user" className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">
                                            Home <AiOutlineHome className="navbar__button--icon" />
                                        </Link>
                                    }{
                                        localStorage.getItem("petvaUser") === "foundation" &&
                                        <Link to="/foundation" className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4">
                                            Home <AiOutlineHome className="navbar__button--icon" />
                                        </Link>
                                    }
                                </div>
                                <div className="text-end">
                                    <Link to="/" onClick={actions.logOut} className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4" >
                                        Cerrar Sesión <IoLogOutOutline className="navbar__button--icon" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </nav>
    )
}
export default Navbar