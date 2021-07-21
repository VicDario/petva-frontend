import { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import { MdPets } from "react-icons/md"
import { FaCat, FaDog, FaUser } from "react-icons/fa";

const UserProfileDetail = () => {
    const { actions, store } = useContext(Context);
    const [save, setSave] = useState("off");

    useEffect(() => {
        actions.getUserDetail();
        actions.getMascotasUser();
        
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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Mis Datos</h1>
                    </div>
                    <div>
                        {
                            !!store.userDetail && !!store.pets&&
                            <div className="card mb-3" /* style={{ maxWidth: 540 }} */>
                                <div className="row g-0">

                                    <div className="col-12 col-md-4 bg-dark text-center">
                                        <div className="mb-2">
                                            <img src={!!store.userDetail.picture ? store.userDetail.picture : "/images/default.jpg"} className="imgRedondaA img-fluid" alt="Imagen Perfil" />

                                        </div>
                                        <div className="my-2">
                                            <span className="text-white me-3">{store.userDetail.name}</span>
                                            <span className="text-secondary align-top"><MdPets /></span><span className="text-secondary align-middle">{!!store.pets.length > 0 ? store.pets.length : "0"}</span>
                                        </div>
                                        <div>


                                            <button onClick={register} className="badge rounded-pill bg-secondary mb-1 w70 fs-6">Editar Perfil</button>




                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8 bg-dark">

                                        <div>
                                            <div className="row">
                                                <div className="col-8 ms-3 text-white">
                                                    <h3><span><FaUser />  </span>{store.userDetail.name} {store.userDetail.lastname}</h3>
                                                </div>
                                                <div className="col-8 mx-auto">
                                                    <div className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                        <h4>Mascotas ({!!store.pets.length > 0 ? store.pets.length : "0"})</h4>
                                                        <div>
                                                            {
                                                                !!store.pets.length >0 ?
                                                                    store.pets.map((pet,index)=>{
                                                                        return(
                                                                            <span key={index} className="card-title fs-3 ">{pet.specie === 'cat' ? <FaCat className="align-top ms-1" /> : <FaDog className="align-top ms-1" />}</span>
                                                                        )
                                                                    })
                                                                    :
                                                                    <p>No tienes mascotas inscritas</p>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8 mx-auto">
                                                    <div className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                        <h4 >Teléfono </h4>
                                                        <div>
                                                            <p>{!!store.userDetail.phone ? store.userDetail.phone : "No tienes teléfono registrado"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-8 mx-auto">
                                                    <div className="m-2  p-1 rounded text-center bg-secondary text-white">
                                                        <h4>Email </h4>
                                                        <div>
                                                            <p>{!!store.userDetail.email ? store.userDetail.email : "No tienes email registrado"}</p>
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
                                                    <label className="form-label" htmlFor="">Nombre</label>
                                                <input className="form-control text-white bg-dark" type="text" placeholder="Nombre" />
                                                </div>
                                                <div className="">
                                                    <label className="form-label" htmlFor="">Apellido</label>
                                                <input className="form-control text-white bg-dark" type="text" placeholder="Apellido" />
                                                </div>
                                                <div className="">
                                                    <label className="form-label" htmlFor="">Teléfono</label>
                                                <input className="form-control text-white bg-dark" type="text" placeholder="Teléfono" />
                                                </div>
                                                <div className="">
                                                    <label className="form-label" htmlFor="">Email</label>
                                                    <input className="form-control text-white bg-dark" type="text" placeholder="Email" />
                                                </div>
                                                <div className="d-flex justify-content-around my-3">
                                                    <button className="btn btn-success" >Guardar Cambios</button>
                                                    <button className="btn btn-dark" onClick={register} >Cancelar</button>
                                                </div>
                                            </div>
                                    
                                    }
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserProfileDetail;
