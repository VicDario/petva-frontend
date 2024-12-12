import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  const links = [
    {
      path: "/contact",
      text: "Contáctanos",
    },
    {
      path: "/adoption",
      text: "Adopción",
    },
    {
      path: "/",
      text: "Clínicas",
    },
    {
      path: "/",
      text: "Fundaciones",
    },
    {
      path: "/lost",
      text: "Mascotas Perdidas",
    },
  ];
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-sm-7 col-xs-12 d-flex align-items-end justify-content-center">
            <Link className="text-decoration-none ps-2" to="/">
              <img
                className="logo"
                src="/images/logo_cat_small.png"
                alt="Un gatito"
              />
            </Link>
            <h2 className="logo-text ps-1">PetVA</h2>
            <div className={`mx-1 mb-2 ${styles['footer-separator']}`}></div>
            <div className="d-grid mb-2">
              <span className={`${styles["footer-slogan"]} fw-light`}>
                Hecho con mucho amor
              </span>
              <span className={`${styles["footer-slogan"]} fw-light`}>
                para tus mascotas.
              </span>
            </div>
          </div>
          <div className="col-lg-7 col-sm-12 col-xs-6 d-flex align-items-center justify-content-around wrap-xs">
            {links.map((link) => (
              <Link
              key={link.text}
                className={`text-decoration-none mx-3 text-muted ${styles["footer-link"]}`}
                to={link.path}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
