import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Userpets = () => {
    const { actions, store } = useContext(Context);
    /* const history = useHistory() */
    /* const obtenermascotas = ()=>{
        actions.getMascotasUser()
    } */

    let token = localStorage.getItem("token")

    useEffect(() => {
        actions.getMascotasUser()
    }, [])

    return (
        <>
            {
                token &&

                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 text-center">
                            <div>
                                <h2 className="display-1">Mis Mascotas</h2>
                            </div>
                            <div className="row">
                                {
                                    !!store.pets && store.pets.length > 0 &&
                                    store.pets.map((pet, index) => {
                                        return (
                                            <>
                                                <div className="col-12 col-md-4">

                                                    <div className="card" style={{ width: "18rem" }}>
                                                        <img src="..." className="card-img-top" alt="imagen mascota" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{pet.name}</h5>
                                                            <p className="card-text">
                                                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis quisquam quod unde illo quis obcaecati facere beatae fugiat ab accusantium?
                                                            </p>
                                                        </div>
                                                        <ul className="list-group list-group-flush">
                                                            <li className="list-group-item">{pet.birth_date}</li>
                                                            <li className="list-group-item">{pet.specie}</li>
                                                            <li className="list-group-item">{pet.state}</li>
                                                        </ul>
                                                        <div className="card-body">
                                                            <button>Transferir</button>

                                                        </div>
                                                    </div>
                                                </div>

                                            </>
                                        )
                                    })
                                }
                            </div>

                            <div className="my-5">
                                <Link to="/addpetuser" className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                    Agregar Mascota
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>}
            {
                !token &&
                /* history.push("/login") */
                <h1>Seras direccionado a login</h1>
            }
        </>
    )
}

export default Userpets;