import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const ResetPassword = () => {
    const password = useRef(null);
    const params = useParams();
    const { actions } = useContext(Context);
    const handleReset = (e) => {
        e.preventDefault();
        const newPassword = password.current.value;
        console.log(params.token, newPassword);
        actions.resetPassword(params.token, newPassword);
    };
    return (
        <div className="row">
            <div className="col-md-5 mx-auto  ">
                <h2>Restablecer contraseña</h2>
                <div className="form-floating">
                    <input type="password" ref={password} className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Ingresa tu nueva contraseña</label>
                </div>
                <button className="btn btn-primary mx-auto" onClick={(e) => handleReset(e)}>Restablecer Contraseña</button>
            </div>
        </div>
    );
};
export default ResetPassword;