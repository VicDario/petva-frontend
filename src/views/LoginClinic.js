import { useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const LoginClinic = () =>{
const  {actions}= useContext(Context);
const inputEmail = useRef();
const inputPassword = useRef();
const history = useHistory();


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let res = await actions.loginClinic(inputEmail.current.value, inputPassword.current.value, history);
        if(res.status===401){
            Swal.fire({
                icon: "error",
                title: "Revisa tus datos!",
                text: "El email o la contraseña no son correctos",
                showConfirmButton: false,
                timer: 1800
            })
        }
    }catch(error) {
        console.error(error);
    }
}
return (
    <div className="container">
        <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto my-3 text-center">
                    <main className="form-sigin bg-login p-4 mt-3">
                        <form className="px-3" onSubmit={(e) => handleSubmit(e)}>
                            <h1 className="h2 mb-4">Iniciar como Clinica</h1>
                            <div className="form-floating login-input my-3 w-80">
                                <input type="email" ref={inputEmail} className="form-control" id="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating login-input my-4 ">
                                <input type="password" ref={inputPassword} className="form-control" placeholder="********" id="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            {/*<div className="checkbox mb-2">
                                <label>
                                    <input type="checkbox" className="me-1" value="remember-me" />
                                    Recuerdame
                                </label>
                            </div>*/}
                            <button className="btn btn-login mt-3 px-5" type="submit">Iniciar Sesión</button>
                            {/*<div className="mt-1">
                                <span className="text-muted">¿Has olvidado tu contraseña?</span>
                            </div>*/}
                        </form>
                    </main>
                </div>
            </div>
    </div>
);
}
export default LoginClinic;
