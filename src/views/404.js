import { Link } from "react-router-dom"

const Custom404 = () => {
    return (
        <div className="row error-404 py-5">
            <div className="col-md-6 mx-auto">
                <section class="error-container">
                    <span>4</span>
                    <span><span class="screen-reader-text">0</span></span>
                    <span>4</span>
                </section>
                <div class="link-container">
                    <Link to="/" className="btn btn-primary fs-2 w-30 my-3 fw-bold d-flex align-items-center justify-content-center">
                        Volver al inicio
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Custom404;