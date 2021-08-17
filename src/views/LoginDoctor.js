import { useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

const LoginDoctor = () => {
    const { actions } = useContext(Context);
    const inputEmail = useRef();
    const inputPassword = useRef();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await actions.loginDoctor(inputEmail.current.value, inputPassword.current.value, history);
            if (res.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Revisa tus datos!",
                    text: "El email o la contraseña no son correctos",
                    showConfirmButton: false,
                    timer: 1800
                })
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container container-login">
            <div className="row login-menu">
                <div className="col-md-12 col-sm-12 mx-auto my-4 d-flex flex-column justify-content-around align-items-center">
                    <main className="form-sigin bg-login p-4 mt-3 d-flex flex-column justify-content-around align-items-center login">
                        <form className="px-3 login d-flex flex-column justify-content-around align-items-center" onSubmit={(e) => handleSubmit(e)}>
                            <h1 className="h2 mb-4">Iniciar como Doctor</h1>
                            <div className="form-floating login-input my-3 w-80">
                                <input type="email" ref={inputEmail} className="form-control" id="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating login-input my-4">
                                <input type="password" ref={inputPassword} className="form-control" placeholder="********" id="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-login mt-3 px-5" type="submit">Iniciar Sesión</button>
                            <Link to="/user/forget" className="btn btn-link mt-3 px-5">Olvidaste tu contraseña?</Link>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
export default LoginDoctor;