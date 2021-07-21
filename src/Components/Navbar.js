import { Link, useHistory } from "react-router-dom"
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { AiOutlineHome } from 'react-icons/ai';
import {  IoLogInOutline } from 'react-icons/io5';
import { MdPets } from "react-icons/md";
import { Avatar } from "@material-ui/core";


const Navbar = () => {

    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        
        
        if (localStorage.getItem("petvaToken") !== null) store.token = localStorage.getItem("petvaToken");
        else store.token = false;
        store.userType = localStorage.getItem("petvaUser")
        if (store.userType==="normal"){
            actions.getUserDetail();
        } else if (store.userType === "foundation"){
            actions.getFoundationDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //Si exite token recupera la sesion

    const toUserDetails = ()=>{
        history.push("/user/profile");
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
                                        <Link
                                            to="/user"
                                            className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4"
                                        >
                                            <AiOutlineHome className="navbar__button--icon" />
                                        </Link>
                                    }{
                                        localStorage.getItem("petvaUser") === "foundation" &&
                                        <Link
                                            to="/foundation"
                                            className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 m-1 fs-4"
                                        >
                                            <AiOutlineHome className="navbar__button--icon" />
                                        </Link>
                                    }
                                </div>
                                
                                    <div className="dropdown dropstart">
                                        <span
                                        className="dropstart"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            
                                            {
                                            store.userType === "foundation" &&
                                             !!store.foundationDetail && 
                                            <Avatar
                                                alt={store.foundationDetail.name}
                                                src="/static/images/avatar/2.jpg"
                                                sx={{ width: 60, height: 60 }}
                                                
                                            />
                                            }
                                            {
                                            store.userType === "normal" &&
                                            !!store.userDetail &&
                                            <Avatar
                                                alt={store.userDetail.name}
                                                src="/static/images/avatar/2.jpg"
                                                sx={{ width: 60, height: 60 }}

                                            />
                                            }{
                                                        //espacio para clinica
                                            }
                                        </span>
                                    <ul className="dropdown-menu dropdown-menu-left " aria-labelledby="dropdownMenuButton1">
                                            
                                            <div className="container px-5">
                                                <div className="d-flex justify-content-center">
                                                {
                                                    !!store.userDetail ?
                                                        <Avatar
                                                            alt={store.userDetail.name}
                                                            src="/static/images/avatar/2.jpg"
                                                            sx={{ width: 45, height: 45 }}

                                                        />
                                                        :
                                                        <Avatar
                                                            alt="Usuario"
                                                            src="/static/images/avatar/2.jpg"
                                                            sx={{ width: 45, height: 45 }}

                                                        />
                                                }
                                                </div>
                                                <div className="text-center">
                                                  {
                                                    !!store.userDetail &&
                                                    <>
                                                    <h5>
                                                        {store.userDetail.name} {store.userDetail.lastname}
                                                    </h5>
                                                    <span>
                                                        {store.userDetail.email}
                                                    </span>
                                                    </>
                                                  }
                                                </div>
                                                <div className="text-center my-3">
                                                    <button onClick={toUserDetails} className="badge rounded-pill  text-dark">
                                                        Gestionar tú cuenta
                                                    </button>
                                                </div>
                                            <div className="row border text-center">
                                                <Link
                                                    to="/"
                                                    onClick={actions.logOut}
                                                    className=""
                                                >
                                                    Cerrar Sesión
                                                    
                                                </Link>
                                            </div>
                                            </div>
                                        </ul>
                                    </div>
                            </div>
                        </div>
                }
            </div>
        </nav>
    )
}
export default Navbar
