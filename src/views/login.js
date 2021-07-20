import { useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
const Login = () => {
    const { actions } = useContext(Context);
    const inputEmail = useRef();
    const inputPassword = useRef();
    const history = useHistory();

    const validateEmail = (e) => {
        e.preventDefault();
        if (inputEmail.current.value.trim() === '')
        {
            console.error("Email empty");
            return false;
        } else
        {
            return true;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        let res = await actions.loginUser(inputEmail.current.value, inputPassword.current.value, history);
        console.log(res);
        console.log("mira arriba");
        if (res.status===401){
        Swal.fire({
            icon: "error",
            title: "Revisa tus datos!",
            text: "El correo no coincide con la contraseña.",
            showConfirmButton: false,
            timer: 1800
        })
        }
        }catch(error){
            console.error(error);
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto my-3 text-center">
                    <main className="form-sigin bg-white rounded-3 p-4">
                        <form className="px-3" onSubmit={handleSubmit}>
                            <h1 className="h2 mb-4">Inicio de Sesión</h1>
                            <div className="form-floating my-3 w-80">
                                <input type="email" ref={inputEmail} onChange={(e) => validateEmail(e)} className="form-control" id="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating mt-3 mb-2">
                                <input type="password" ref={inputPassword} className="form-control" placeholder="********" id="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="checkbox mb-2">
                                <label>
                                    <input type="checkbox" className="me-1" value="remember-me" />
                                    Recuerdame
                                </label>
                            </div>
                            <button className="w-50 btn btn-primary" type="submit">Iniciar Sesión</button>
                            <div className="mt-1">
                                <span className="text-muted">¿Has olvidado tu contraseña?</span>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Login;