import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-sm-7 col-xs-12 d-flex align-items-end">
                            <Link className="text-decoration-none ps-2" to="/">
                                <img className="logo" src="/images/logo_cat_small.png" alt="logo" />
                            </Link>
                            <h2 className="logo-text py-1 ps-1">
                                PetVA
                            </h2>
                            <span className="footer-separator">
                                |
                            </span>
                            <span className="d-grid pt-1 pb-3">
                                <span className="footer-slogan fw-light">
                                    Hecho con mucho amor
                                </span>
                                <span className="footer-slogan fw-light">
                                    para tus mascotas.
                                </span>
                            </span>
                    </div>
                    <div className="col-lg-7 col-sm-12 col-xs-6 d-flex align-items-center justify-content-around wrap-xs">
                            <Link className="text-decoration-none footer-link mx-3 text-muted" to="/contact">
                                Contáctanos
                            </Link>
                            <Link className="text-decoration-none footer-link mx-3 text-muted" to="/">
                                Adopción
                            </Link>
                            <Link className="text-decoration-none footer-link mx-3 text-muted" to="/">
                                Clínicas
                            </Link>
                            <Link className="text-decoration-none footer-link mx-3 text-muted" to="/">
                                Fundaciones
                            </Link>
                            <Link className="text-decoration-none footer-link mx-3 me-5 text-muted" to="/services">
                                Servicios
                            </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;