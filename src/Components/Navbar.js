import { Link, useHistory } from "react-router-dom"
import { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { AiOutlineHome } from 'react-icons/ai';
import { Avatar } from "@material-ui/core";
//import { IoLogInOutline } from 'react-icons/io5';
//import { MdPets } from "react-icons/md";


const Navbar = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();
    const toRegister = () => {
        history.push("/register")
    }
    useEffect(() => {
        if (localStorage.getItem("petvaToken") !== null) store.token = localStorage.getItem("petvaToken");
        else store.token = false;
        store.userType = localStorage.getItem("petvaUser")
        if (store.userType === "normal") {
            actions.getUserDetail();
        } else if (store.userType === "foundation") {
            actions.getFoundationDetail();
        } else if (store.userType === "clinic") {
            actions.getClinicDetail();
        } else if (store.userType === "doctor") {
            actions.getDoctorDetail();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //Si exite token recupera la sesion

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid">
                <div className="row w-100">
                    <div className="col-lg-9 col-md-6 col-sm-6 d-flex align-items-end">
                        <Link className="text-decoration-none" to="/">
                            <img className="logo" src="/images/logo_cat_small.png" alt="logo" />
                        </Link>
                        <h2 className="logo-text ps-1 my-auto">
                            PetVA
                        </h2>
                    </div>
                    {
                        localStorage.getItem("petvaToken") === null ?
                            <div className="col-lg-3 col-md-6 col-sm-6 ">
                                <div className="d-flex justify-content-center">
                                    <div className="text-end d-flex align-items-center justify-content-end m-2" >
                                        <button
                                            className="btn text-white fs-5 text-decoration-none rounded-pill btn-nav-register"
                                            onClick={toRegister}
                                        >
                                            {/* <Link to="/register" className="text-decoration-none">
                                        Registrarse <MdPets className="navbar__button--icon text-decoration-none" />
                                    </Link> */}
                                            Registrarse
                                        </button>
                                    </div>
                                    <div className="text-end d-flex align-items-center justify-content-end">
                                        <div className="dropdown">
                                            <button
                                                className="btn text-dark fs-5 text-decoration-none rounded-pill btn-nav-login bg-light dropdown-toggle"
                                                id="dropdownMenuLink"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                Iniciar sesión {/* <IoLogInOutline className="navbar__button--icon text-decoration-none" /> */}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <li>
                                                    <Link className="dropdown-item link-green" to="/user/login">
                                                        Usuario
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item link-green" to="/foundation/login">
                                                        Fundación
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item link-green" to="/clinic/login">
                                                        Clínica
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item link-green" to="/doctor/login">
                                                        Médico
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="d-flex justify-content-end">
                                    <div className="text-end">
                                        {
                                            localStorage.getItem("petvaUser") === "normal" &&
                                            <Link
                                                to="/user"
                                                className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 me-1 fs-5"
                                                style={{ width: "60px" }}
                                            >
                                                <AiOutlineHome className="navbar__button--icon text-decoration-none " />
                                            </Link>
                                        }{
                                            localStorage.getItem("petvaUser") === "foundation" &&
                                            <Link
                                                to="/foundation"
                                                className="navbar__button text-decoration-none badge rounded-pill bg-dark p-3 me-1 fs-5"
                                                style={{ width: "60px" }}
                                            >
                                                <AiOutlineHome className="navbar__button--icon text-decoration-none" />
                                            </Link>
                                        }{
                                            localStorage.getItem("petvaUser") === "clinic" &&
                                            <Link
                                                to="/clinic"
                                                className="navbar__button text-decoration-none badge rounded-circle bg-dark px-3 py-3 me-1 fs-5"
                                                style={{ width: "60px" }}
                                            >
                                                <AiOutlineHome className="navbar__button--icon text-decoration-none" />
                                            </Link>
                                        }{
                                            localStorage.getItem("petvaUser") === "doctor" &&
                                            <Link
                                                to="/doctor"
                                                className="navbar__button text-decoration-none badge rounded-circle bg-dark px-3 py-3 me-1 fs-5"
                                                style={{ width: "60px" }}
                                            >
                                                <AiOutlineHome className="navbar__button--icon text-decoration-none" />
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
                                                    src={store.foundationDetail.picture}
                                                    sx={{ width: 60, height: 60 }}

                                                />
                                            }
                                            {
                                                store.userType === "normal" &&
                                                !!store.userDetail &&
                                                <Avatar
                                                    alt={store.userDetail.name}
                                                    src={store.userDetail.picture}
                                                    sx={{ width: 60, height: 60 }}

                                                />
                                            }
                                            {
                                                store.userType === "clinic" &&
                                                !!store.clinicDetail &&
                                                <Avatar
                                                    alt={store.clinicDetail.name}
                                                    src={store.clinicDetail.picture}
                                                    sx={{ width: 60, height: 60 }}

                                                />
                                            }
                                            {
                                                store.userType === "doctor" &&
                                                !!store.doctorDetail &&
                                                <Avatar
                                                    alt={store.doctorDetail.name}
                                                    src={store.doctorDetail.picture}
                                                    sx={{ width: 60, height: 60 }}
                                                />
                                            }
                                        </span>
                                        <ul className="dropdown-menu dropdown-menu-left dropdown-avatar" aria-labelledby="dropdownMenuButton1">

                                            <div className="container px-1">
                                                <div className="d-flex justify-content-center me-5 pe-5 ms-2 pt-1">
                                                    {
                                                        store.userType === "foundation" &&
                                                        !!store.foundationDetail &&
                                                        <>
                                                            <Avatar
                                                                alt={store.foundationDetail.name}
                                                                src={store.foundationDetail.picture}
                                                                sx={{ width: 45, height: 45 }}

                                                            />
                                                            <h5 className="my-auto ms-2">{store.foundationDetail.name}</h5>
                                                        </>
                                                    }{
                                                        store.userType === "normal" &&
                                                        !!store.userDetail &&
                                                        <>
                                                            <Avatar
                                                                alt={store.userDetail.name}
                                                                src={store.userDetail.picture}
                                                                sx={{ width: 45, height: 45 }}

                                                            />
                                                            <h5 className="my-auto ms-2">{store.userDetail.name}</h5>
                                                        </>
                                                    }{
                                                        store.userType === "clinic" &&
                                                        !!store.clinicDetail &&
                                                        <>
                                                            <Avatar
                                                                alt={store.clinicDetail.name}
                                                                src={store.clinicDetail.picture}
                                                                sx={{ width: 45, height: 45 }}
                                                            />
                                                            <h5 className="my-auto ms-2">{store.clinicDetail.name}</h5>
                                                        </>
                                                    }{
                                                        store.userType === "doctor" &&
                                                        !!store.doctorDetail &&
                                                        <>
                                                            <Avatar
                                                                alt={store.doctorDetail.name}
                                                                src={store.doctorDetail.picture}
                                                                sx={{ width: 45, height: 45 }}
                                                            />
                                                            <h5 className="my-auto ms-2">{store.doctorDetail.name} </h5>
                                                        </>
                                                    }
                                                </div>
                                                <div className="text-center d-grid">
                                                    {//user detalle navbar
                                                        store.userType === "normal" &&
                                                        !!store.userDetail &&
                                                        <>
                                                            <hr />
                                                            <Link to="/user/profile" className="justify-content-start d-flex ms-2 text-decoration-none text-dark">
                                                                Perfil
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2">
                                                                Ajustes
                                                            </span>
                                                            <Link
                                                                to="/user/pets"
                                                                className="justify-content-start d-flex ms-2 text-decoration-none text-dark"
                                                            >
                                                                Mis Mascotas
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2">
                                                                Ayuda
                                                            </span>
                                                            <hr className="my-1" />
                                                            <div className="row">
                                                                <Link
                                                                    to="/"
                                                                    onClick={actions.logOut}
                                                                    className="justify-content-start d-flex ms-2 text-decoration-none text-dark"
                                                                >
                                                                    Cerrar Sesión
                                                                </Link>
                                                            </div>
                                                        </>
                                                    }
                                                    {
                                                        //fundacion detalles navbar
                                                        store.userType === "foundation" &&
                                                        !!store.foundationDetail &&
                                                        <>
                                                            <hr />
                                                            <Link to="/foundation/profile" className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark">
                                                                Perfil
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ajustes
                                                            </span>
                                                            <Link
                                                                to="/foundation/pets/adoption"
                                                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                            >
                                                                Mascotas en adopción
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ayuda
                                                            </span>
                                                            <hr className="my-1" />
                                                            <div className="row">
                                                                <Link
                                                                    to="/"
                                                                    onClick={actions.logOut}
                                                                    className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                                >
                                                                    Cerrar Sesión
                                                                </Link>
                                                            </div>
                                                        </>
                                                    }{
                                                        store.userType === "clinic" &&
                                                        !!store.clinicDetail &&
                                                        <>
                                                            <hr />
                                                            <Link to="/clinic/profile" className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark">
                                                                Perfil
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ajustes
                                                            </span>
                                                            <Link
                                                                to="/clinic/doctor"
                                                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                            >
                                                                Mis Medicos
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ayuda
                                                            </span>
                                                            <hr className="my-1" />
                                                            <div className="row">
                                                                <Link
                                                                    to="/"
                                                                    onClick={actions.logOut}
                                                                    className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                                >
                                                                    Cerrar Sesión
                                                                </Link>
                                                            </div>
                                                        </>
                                                    }{
                                                        store.userType === "doctor" &&
                                                        !!store.doctorDetail &&
                                                        <>
                                                            <hr />
                                                            <Link to="/doctor/profile" className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark">
                                                                Perfil
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ajustes
                                                            </span>
                                                            <Link
                                                                to="/doctor/calendar"
                                                                className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                            >
                                                                Calendario
                                                            </Link>
                                                            <span className="justify-content-start d-flex ms-2 mb-1">
                                                                Ayuda
                                                            </span>
                                                            <hr className="my-1" />
                                                            <div className="row">
                                                                <Link
                                                                    to="/"
                                                                    onClick={actions.logOut}
                                                                    className="justify-content-start d-flex ms-2 mb-1 text-decoration-none text-dark"
                                                                >
                                                                    Cerrar Sesión
                                                                </Link>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar
