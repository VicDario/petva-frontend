import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import {  MdPets, MdTrackChanges } from "react-icons/md"
import { FaCat, FaDog, FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { IoLocationSharp } from "react-icons/io5";

const FoundationProfileDetail = () => {
    const { actions, store } = useContext(Context);
    const history = useHistory();
    const [save, setSave] = useState("off");
    const [updates, setUpdates] = useState({
        email: null,
        name: null,
        address: null,
        phone: null,
        password: null,

    });

    useEffect(() => {
        actions.getFoundationDetail();
        actions.getPetsFoundation();
        actions.getPetsFoundationWithOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const register = () => {
        if (save === "off")
        {

            setSave("on")
        } else
        {
            setSave("off")

        }
    }
    const update = () => {
        if (updates.name !== "" && updates.name !== null &&
            updates.lastname !== "" && updates.lastname !== null &&
            updates.email !== "" && updates.email !== null
        )
        {

            actions.foundationPutInfo(updates.name, updates.address, updates.phone, updates.email,
                validarVacio(store.auxPicture), validarVacio(updates.password))

            Swal.fire({
                icon: "success",
                title: "Usuario Actualizado",
                showConfirmButton: false,
                timer: 1500
            });
            register();
        }
    }
    const handleLoad = (e) => {
        let file = e.target.files[0]; // load the picture (just one file)
        actions.convertImgToBase64(file); //Save picture in base64 format at store in auxPicture
    }

    const validarVacio = (dato) => {
        if (dato === "")
        {
            dato = null
        }
        return dato
    }



    return (<>
        {
            !!localStorage.getItem("petvaToken") ? (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Mis Datos</h1>
                        </div>
                        <div>
                            {
                                !!store.foundationDetail && !!store.pets &&
                                <div className="card mb-3" >
                                    <div className="row g-0">
                                        <div className="col-12 col-md-4 bg-dark text-center">
                                            <div className="mb-2">
                                                <img
                                                    src={!!store.foundationDetail.picture ? store.foundationDetail.picture
                                                        : "/images/default.jpg"}
                                                    className="imgRedondaA img-fluid"
                                                    alt="Imagen Perfil" />

                                            </div>
                                            <div className="my-2">
                                                <div
                                                    className="fs-5 text-secondary me-3">
                                                    <span
                                                        className="me-1 align-top">
                                                        <IoLocationSharp />
                                                    </span>{store.foundationDetail.address}
                                                </div>
                                                <span
                                                    className="fs-3 text-secondary align-top"><MdPets /></span><span
                                                        className="text-secondary align-middle">{!!store.pets.length > 0 ?
                                                            store.pets.length
                                                            : "0"}
                                                </span>
                                                <span
                                                    className="fs-3 text-secondary align-top ms-2"><MdTrackChanges /></span><span
                                                        className="text-secondary align-middle">{!!store.petsWithOwner.length >0 ?
                                                        store.petsWithOwner.length
                                                            : "0"}
                                                </span>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={register}
                                                    className="badge rounded-pill bg-secondary mb-1 w70 fs-6">
                                                    Editar Perfil
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-8 bg-dark">

                                            <div>
                                                <div className="row">
                                                    <div className="col-8 ms-3 text-white">
                                                        <h3>
                                                            <span className="me-2">
                                                                <FaUser />
                                                            </span>
                                                            <span className="me-2">
                                                                {store.foundationDetail.name}
                                                            </span>
                                                            <span>
                                                                {store.foundationDetail.lastname}
                                                            </span>
                                                        </h3>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4>
                                                                Mascotas en Adopción
                                                            </h4>
                                                            <div>
                                                                {
                                                                    !!store.pets.length > 0 ?
                                                                        store.pets.map((pet, index) => {
                                                                            return (
                                                                                <span
                                                                                    key={index}
                                                                                    className="card-title fs-3 ">{pet.specie === 'cat' ? <FaCat
                                                                                        className="align-top ms-1" /> : <FaDog
                                                                                        className="align-top ms-1" />}
                                                                                </span>
                                                                            )
                                                                        })
                                                                        :
                                                                        <p>No tienes mascotas inscritas</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4>
                                                                Mascotas en seguimiento
                                                            </h4>
                                                            <div>
                                                                {
                                                                    !!store.petsWithOwner.length > 0 ?
                                                                        store.petsWithOwner.map((pet, index) => {
                                                                            return (
                                                                                <span
                                                                                    key={index}
                                                                                    className="card-title fs-3 ">{pet.specie === 'cat' ? <FaCat
                                                                                        className="align-top ms-1" /> : <FaDog
                                                                                        className="align-top ms-1" />}
                                                                                </span>
                                                                            )
                                                                        })
                                                                        :
                                                                        <p>No tienes mascotas inscritas</p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4 >Teléfono </h4>
                                                            <div>
                                                                <p>
                                                                    {!!store.foundationDetail.phone ?
                                                                        store.foundationDetail.phone : "No tienes teléfono registrado"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="col-8 mx-auto">
                                                        <div
                                                            className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                            <h4>
                                                                Email
                                                            </h4>
                                                            <div>
                                                                <p>{!!store.foundationDetail.email ?
                                                                    store.foundationDetail.email :
                                                                    "No tienes email registrado"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            save === "on" &&
                                            <div className="col-md-7 col-12 bg-secondary text-white p-3 mx-auto">
                                                <div>
                                                    <label
                                                        className="form-label"
                                                        htmlFor="">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        className="form-control text-white bg-dark"
                                                        type="text" placeholder="Nombre"
                                                        onChange={(e) => { setUpdates({ ...updates, name: e.target.value }) }}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label className="form-label" htmlFor="">
                                                        Dirección
                                                    </label>
                                                    <input
                                                        className="form-control text-white bg-dark"
                                                        type="text"
                                                        placeholder="Direccion"
                                                        onChange={(e) => { setUpdates({ ...updates, address: e.target.value }) }}
                                                    />
                                                </div>
                                                <div
                                                    className="">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="">Teléfono</label>
                                                    <input
                                                        className="form-control text-white bg-dark"
                                                        type="text" placeholder="Teléfono"
                                                        onChange={(e) => { setUpdates({ ...updates, phone: e.target.value }) }}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="">Email</label>
                                                    <input className="form-control text-white bg-dark"
                                                        type="email"
                                                        placeholder="Email"
                                                        onChange={(e) => { setUpdates({ ...updates, email: e.target.value }) }}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="">Contraseña</label>
                                                    <input className="form-control text-white bg-dark"
                                                        type="text"
                                                        placeholder="Contraseña"
                                                        onChange={(e) => { setUpdates({ ...updates, password: e.target.value }) }}
                                                    />
                                                </div>
                                                <div className="">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="">Foto de Perfil</label>
                                                    <input className="form-control text-white bg-dark"
                                                        type="file"
                                                        placeholder="Foto perfil"
                                                        onChange={e => handleLoad(e)} accept="image/png, .jpg, .jpeg"
                                                    />
                                                </div>
                                                <div
                                                    className="d-flex justify-content-around my-3">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={update} >
                                                        Guardar Cambios
                                                    </button>
                                                    <button
                                                        className="btn btn-dark"
                                                        onClick={register} >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            ) : (
                history.push('/foundation/login')
            )
        }
    </>
    );
}

export default FoundationProfileDetail;