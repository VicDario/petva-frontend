import { useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

const ForgetPassword = (props) => {
    const params = useParams();
    const history = useHistory();
    const { actions } = useContext(Context);
    let inputEmail = useRef(null);

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        const email = inputEmail.current.value;
        if (email.length > 0) {
            if (validateEmail(email)) {
                const resp = await actions.forgotPassword(email, params.user);
            }
        }
    };
    const validateEmail = (email) => {
        let emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        if (!emailRegex.test(email)) {
            Swal.fire("Error!", "El email no es valido!", "error");
            return false;
        }
        return true;
    }
    if (params.user !== "user" && params.user !== "clinic" && params.user !== "doctor" && params.user !== "foundation") {
        history.push("/error");
    }
    return (
        <div classNameName="container">
            <form
                className="row g-3 p-4"
                onSubmit={handleForgetPassword}
            >
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <h1>Recuperación de contraseña</h1>
                        <div className="col-sm-6 col-xs-12">
                            <label for="staticEmail2" className="visually-hidden">
                                Email
                            </label>
                            <input
                                type="text"
                                readonly
                                className="form-control-plaintext"
                                id="staticEmail2"
                                value="email@example.com"
                            />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center py-3">
                        <div className="col-sm-6 col-xs-12">
                            <label for="inputPassword2" className="visually-hidden">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword2"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-sm-6 col-xs-12">
                            <button type="submit" className="btn btn-primary mb-3">
                                Recuperar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;
