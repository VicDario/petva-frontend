import { Link } from "react-router-dom"

const Custom404 = () => {
    return (
        <div className="row error-404 pb-5 pt-2">
            <div className="col-md-12 mx-auto ">
                <div className="col-md-12 d-flex justify-content-center">
                    <section className="error-container">
                        <img className="img-404" src="/images/Error404.png" alt="404" />
                    </section>
                </div>
                <div className="col-md-12 d-flex justify-content-center">
                    <span className="span-home  px-5 py-2">
                        ERROR 404
                    </span>
                </div>
                <div className="col-md-12 d-flex justify-content-center link-container">
                    <Link to="/" className="btn btn-home fs-2 my-3 px-5 fw-bold d-flex align-items-center justify-content-center">
                        Volver al inicio
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Custom404;