  
import { Link } from "react-router-dom"

const Presentation = () => {
    return (
        <div className="container">
            <div className="mb-3">
                <h1 className="display-1 fw-bold">PetVA</h1>
            </div>
            <div className="row d-flex align-items-center">   
                <div className="col-4 col-md-2" >
                    <img className="imgRedonda img-fluid" src="/images/adoptar mascota.jpg" alt="imagen adoptaar" />
                </div>
                <div className="col-8 col-md-6 text-center">
                    <div >
                        <Link to="/adoption">
                            <h2 className="display-3" >
                                Adoptar
                            </h2>
                        </Link>
                    </div>
                    <div>
                        <p>
                            Adoptar y darle una oportunidad a un amigo que te sabra devolver ese 
                            amor es una de mas mejores cosas que puedes hacer.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row d-flex align-items-center justify-content-end">
                <div className="col-8 col-md-6 text-center">
                    <div >
                        <h2 className="display-3" >
                            Servicios
                        </h2>
                    </div>
                    <div>
                        <p>
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                             Provident illo eaque iusto veniam nobis unde recusandae fuga voluptatumculpa impedit?
                        </p>
                    </div>
                </div>
                <div className="col-4 col-md-2" >
                    <Link to="/services">
                        <img className="imgRedonda img-fluid" src="/images/adiestramiento-de-perros-a-domicilio.jpg" alt="Servicios" />
                    </Link>
                </div>
            </div>
            <div className="row d-flex align-items-center">
                <div className="col-4 col-md-2" >
                    <img className="imgRedonda img-fluid" src="https://picsum.photos/id/237/200/300" alt="imagen adoptaar" />
                </div>
                <div className="col-8 col-md-6 text-center">
                    <div>
                        <h2 className="display-3" >
                            Buscar Dueño
                        </h2>
                    </div>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Provident illo eaque iusto veniam nobis unde recusandae fuga voluptatumculpa impedit?
                        </p>
                    </div>
                </div>
            </div>
            <div className="row d-flex align-items-center justify-content-end">
                <div className="col-8 col-md-6 text-center">
                    <div >
                        <h2 className="display-3" >
                            Mascotas Perdidas
                        </h2>
                    </div>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Provident illo eaque iusto veniam nobis unde recusandae fuga voluptatumculpa impedit?
                        </p>
                    </div>
                </div>
                <div className="col-4 col-md-2" >
                    <Link to="/lost">
                        <img className="imgRedonda img-fluid" src="https://picsum.photos/id/237/200/300" alt="imagen adoptaar" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Presentation