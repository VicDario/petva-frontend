import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Context } from "@context/appContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const { state } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null); //aca se guarda el tipo de usuario
  const navigate = useNavigate();

  const handleSubmit = (event: FormData) => {};

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-./]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire(
        "Error!",
        "La contraseña debe contener al menos:<br/>Un número.<br/> Una letra mayuscula<br/> Una letra minuscula<br/>Un carácter especial<br/>Una longitud de minimo 8 caracteres",
        "error"
      );
      return false;
    }
    return true;
  };

  const validateEmail = (email: string) => {
    const emailRegex =
      /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!emailRegex.test(email)) {
      Swal.fire("Error!", "El email no es valido!", "error");
      return false;
    }
    return true;
  };

  const changeVisibilityPassword = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-12 col-md-5">
          <h3 className="display-4">Bienvenido a PetVA</h3>
          <p className="fs-4">
            Para continuar tu proceso de registro selecciona que tipo de usuario
            eres:
          </p>
          <div>
            <div className="form-check form-check-inline d-block fs-3">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                id="optionUser"
                value="user"
              />
              <label className="form-check-label" htmlFor="optNormal">
                Usuario
              </label>
            </div>
            <div className="form-check form-check-inline d-block fs-3">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                id="optionClinic"
                value="clinic"
              />
              <label className="form-check-label" htmlFor="optClinica">
                Clínica Veterinaria
              </label>
            </div>
            <div className="form-check form-check-inline d-block fs-3">
              <input
                className="form-check-input"
                type="radio"
                name="userType"
                id="optionFoundation"
                value="foundation"
              />
              <label className="form-check-label" htmlFor="optFundacion">
                Fundación
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7 text-center">
          <h2 className="display-5">Registro</h2>
          <form action={handleSubmit}>
            <div className="text-start">
              <label
                className="input-group-text d-block text-start fs-4"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="form-control fs-5"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="text-start">
              <label
                className="input-group-text d-block text-start fs-4"
                htmlFor="password"
              >
                Contraseña
                {showPassword ? (
                  <FaEyeSlash
                    className="ms-2"
                    title="Show password"
                    onClick={changeVisibilityPassword}
                  />
                ) : (
                  <FaEye
                    className="ms-2"
                    title="Hide password"
                    onClick={changeVisibilityPassword}
                  />
                )}
              </label>
              <input
                className="form-control fs-5"
                type={showPassword ? "text" : "password"}
                id="id_password"
                placeholder="Ingrese Contraseña"
                required
                title="Contraseña"
              />
            </div>
            <div className="text-start">
              <label
                className="input-group-text d-block text-start fs-4"
                htmlFor="password"
              >
                Confirmar Contraseña
                {showPassword ? (
                  <FaEyeSlash
                    className="ms-2"
                    title="Show password"
                    onClick={changeVisibilityPassword}
                  />
                ) : (
                  <FaEye
                    className="ms-2"
                    title="Hide password"
                    onClick={changeVisibilityPassword}
                  />
                )}
              </label>
              <input
                className="form-control fs-5"
                type={showPassword ? "text" : "password"}
                id="id_passwordC"
                placeholder="Confirme Contraseña"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success mt-3 p-2 fs-4">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
