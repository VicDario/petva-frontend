import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

const ResetPassword = () => {
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const params = useParams();
    const { actions } = useContext(Context);
    const validate = (password, confirmPassword) => {
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-./]).{8,}$/;
        if (password.length < 8) {
            Swal.fire("Error!","La contraseña debe contener 8 carácteres como mínimo.","error")
            return false;
        }
        if (!passwordRegex.test(password)) {
            Swal.fire("Error!", "La contraseña debe contener al menos:<br/>Un número.<br/> Una letra mayuscula<br/> Una letra minuscula<br/>Un carácter especial<br/>Una longitud de minimo 8 caracteres", "error");
            //alert("La contraseña debe contener al menos un número, una letra mayuscula y una letra minuscula y una longitud de minimo 8 caracteres")
            return false;
        }
        if (password !== confirmPassword) {
            Swal.fire("Error!", "Las contraseñas no coinciden", "error");
            return false;
        }
        return true;
    }
    const handleReset = async (e) => {
        e.preventDefault();
        const newPassword = password.current.value;
        console.log(params.token, newPassword);
        if (validate(password.current.value, confirmPassword.current.value)){
            const resp = await actions.resetPassword(params.token, newPassword,params.user);
            if (resp.ok){
                Swal.fire({
                    icon: "success",
                    title: "Contraseña cambiada",
                    text: "La contraseña ha sido cambiada con éxito",
                })
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: resp.error,
                })
            }
        }
    };
    return (
        <>
            <div className="row">
                <div className="col-md-5 mx-auto  ">
                    <h2>Restablecer contraseña</h2>
                    <div className="form-floating my-2">
                        <input type="password" ref={password} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Ingresa tu nueva contraseña</label>
                    </div>
                    <div className="form-floating my-2">
                        <input type="password" ref={confirmPassword} className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                        <label htmlFor="confirmPassword">Confirma tu nueva contraseña</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5 mx-auto d-flex">
                    <button className="btn btn-reset mx-auto w-50 mt-2" onClick={(e) => handleReset(e)}>Restablecer Contraseña</button>
                </div>
            </div>
        </>
    );
};
export default ResetPassword;