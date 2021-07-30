import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { IoLocationSharp } from "react-icons/io5";
import { HiMail } from "react-icons/hi";
import { ImMobile } from "react-icons/im";

const ClinicProfileDetail = () => {
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
        actions.getClinicDetail();
        actions.getClinicDoctor();
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
    const toDoctors = ()=>{
        history.push("/clinic/doctor");
    }
    return (
        <>
            {
                !!localStorage.getItem("petvaToken") ?
                    <div className="container">
                        <div className="row my-5 align-items-center px-3">
                            {
                                !!store.clinicDetail &&
                                <>
                                    <div className="col-12 col-md-6  d-flex  justify-content-sm-center
                                      justify-content-center mx-auto mb-4">
                                        <img
                                            src={!!store.clinicDetail.picture ? store.clinicDetail.picture
                                                : "/images/default.jpg"}
                                            className="img-pet-profile img-fluid"
                                            alt="Imagen Perfil" />
                                    </div>
                                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center
                                    justify-content-sm-start
                                       mb-4">
                                        <div className="">
                                            <h1
                                                className="border-bottom border-4 border-dark"
                                            ><span className="me-2">
                                                    {store.clinicDetail.name}
                                                </span>

                                            </h1>
                                            <h5
                                                className="fs-6">
                                                <span
                                                    className="text-success me-1"
                                                ><HiMail /></span>
                                                {store.clinicDetail.email}
                                            </h5>
                                            <h5
                                                className="fs-6">
                                                <span
                                                    className="text-success me-1"
                                                ><IoLocationSharp /></span>
                                                {store.clinicDetail.address}
                                            </h5>
                                            <h5
                                                className="fs-6">
                                                <span
                                                    className="text-success me-1"
                                                ><ImMobile /></span>
                                                {store.clinicDetail.phone}
                                            </h5>

                                        </div>
                                    </div>
                                    
                                       {/*  <div className="mx-2">
                                            <button
                                                onClick={register}
                                                className="btn btn-user-pets rounded-pill fs-6">
                                                <span className="text-white"
                                                ><AiFillSetting /></span> Editar Perfil
                                            </button>

                                        </div> */}
                                        <div
                                            className="col-12 d-flex justify-content-md-center justify-content-center my-5"
                                        >
                                            <h3 className="lead fs-4 hhover border-bottom border-3"
                                                onClick={toDoctors}
                                            >
                                                 Ver Veterinarios ({!!store.clinicDoctor.length ? store.clinicDoctor.length : "0"})
                                            </h3>
                                        </div>
                                    
                                    {
                                        save === "on" &&
                                        <div className="col-12 bg-secondary text-white p-3 mx-auto">
                                            <h3>Ingresa Tus nuevos Datos</h3>
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
                                                    placeholder="Dirección"
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
                                </>
                            }
                        </div>
                    </div>
                    :
                    history.push("foundation/login")
            }
        </>
    );
}

export default ClinicProfileDetail;