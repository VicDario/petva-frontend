import { Link } from "react-router-dom"

const Presentation = () => {
    return (
        <div className="container-fluid">
            <div className="row section-one">
                <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className="landing-square p-3">
                        <h1 className="text-center fw-bold">Hola, Bienvenido a PetVA</h1>
                        <p className="text-center">Estamos comprometidos en ayudarte a conseguir los mejores servicios para tus mascotas.</p>
                        <Link to="/register" className="link-landing">Ingresa Aquí</Link>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-start">
                    <img className="dog-landing-img" src="/images/dog_home.png" alt="Un perro" />
                </div>
            </div>
            <div className="row section-two p-3">
                <div className="col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                    <h3 className="text-center">Si no tienes una mascota aprovecha y dale un vistazo a nuestros anuncios de adopción.</h3>
                    <Link to="/adoption" className="link-landing-two">¡Adopta!</Link>
                </div>
            </div>
            <div className="row section-three">
                <div className="col-md-7 col-sm-12 d-flex justify-content-start">
                    <img className="cat-landing-img" src="/images/vet_with_cat.png" alt="Un gato" />
                </div>
                <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center">
                    <div className="landing-square p-3">
                        <h2 className="text-center fw-bold">¿Eres dueño de una clínica?</h2>
                        <p className="text-center">Ofrece tus servicios aquí.</p>
                        <Link to="/register" className="link-landing">Ingresa Aquí</Link>
                    </div>
                </div>
            </div>
            <div className="row section-four p-3">
                <div className="col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                    <h3 className="text-center">¿Buscas un veterinario para tu mascota?</h3>
                    <Link to="/user/login" className="link-landing-two">Agenda una cita</Link>
                </div>
            </div>
            <div className="row section-five">
                <div className="col-md-12 col-sm-12 d-flex justify-content-center align-items-center flex-column">
                    <div className="col-md-12 col-sm-12 d-flex justify-content-start">
                        <img className="foundation-landing-img" src="/images/friendly.png" alt="Amistad" />
                    </div>
                    <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center relative">
                        <div className="landing-square p-3">
                            <h2 className="text-center fw-bold">¿Tienes una fundación?</h2>
                            <p className="text-center">
                                ¿Qué esperas para registrala? aquí en PetVA te ofrecemos un servicio de seguimiento para todas las mascotas que des en adopción.
                            </p>
                            <Link to="/register" className="link-landing">Ingresa Aquí</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Presentation;