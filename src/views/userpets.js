import { Link } from "react-router-dom";

const Userpets = () => {
    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <div>
                            <h2 className="display-1">Mis Mascotas</h2>
                        </div>
                        <div>
                            <p>No tienes mascotas registradas aún....</p>
                        </div>
                        <div>
                            <Link className="text-decoration-none badge rounded-pill bg-success p-3 m-1 fs-4">
                                Agregar Mascota
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userpets;