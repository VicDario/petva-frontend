import { useContext, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const Register = () => {
    const { actions } = useContext(Context);
    const [user, setUser] = useState(null);//aca se guarda el tipo de usuario
    const [isRegister, setIsRegister] = useState(false);
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const validarRegistro = (e) => {
        e.preventDefault()
        if (!user) {
            Swal.fire("Error!", "Debe seleccionar tipo de Usuario!", "error");
            //alert("Debe seleccionar tipo de Usuario")
        }
        if (user === "Usuario") {
            if (name === "" || lastname === "" || email === "" || phone==="" || password === "") {
                Swal.fire("Error!", "Debe rellenar todos los campos!", "error");
                console.log(`${name} ${lastname} ${email} ${password}`)
                //alert("Debe rellenar todos los campos")
            } else {
                if (!validatePassword(password)) return
                if (!validateEmail(email)) return
                if (password === confirmPassword) {
                    actions.registerUser(email, name, lastname,phone, password)
                        .then(response => {
                            Swal.fire({
                                title: "Cuenta creada",
                                text: "Te has registrado! Debes verificar tu cuenta. Revisa tu correo",
                                type: "success",
                                timer: 2000,
                            });
                            setIsRegister(true);
                        })
                        .catch(error => Swal.fire("Error!", "Ya existe un usuario registrado con ese email", "error"))
                } else {
                    Swal.fire("Error!", "Contraseña no coincide!", "error");
                }
            }
        }
        if (user === "Clinica" || user === "Fundación") {
            if (name === "" || email === "" || password === "" || address === "" || phone === "") {
                Swal.fire("Error!", "Debe rellenar todos los campos!", "error");
                //alert("Debe rellenar todos los campos")
            } else {
                if (!validatePassword(password)) return
                if (!validateEmail(email)) return
                if (password === confirmPassword) {
                    if (user === "Clinica") {
                        actions.registerClinica(email, name, address, phone, password)
                            .then(response => {
                                Swal.fire("Bienvenido!", "Te has registrado! Debes verificar tu cuenta. Revisa tu correo electrónico.", "success");
                                setIsRegister(true);
                            })
                            .catch(err => Swal.fire("Error!", "Ya existe una clinica registrada con ese email", "error"))
                    } else {
                        actions.registerFoundation(email, name, address, phone, password)
                            .then(response => {
                                Swal.fire("Bienvenido!", "Te has registrado! Debes verificar tu cuenta. Revisa tu correo electrónico.", "success");
                                setIsRegister(true);
                            })
                            .catch(error => Swal.fire("Error!", "Ya existe una fundacion registrada con ese email", "error"))
                    }
                } else {
                    Swal.fire("Error!", "Contraseña no coincide!", "error");
                    //alert("Contraseña no coincide")
                }
            }
        }
    }

    const validatePassword = (password) => {
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-./]).{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire("Error!", "La contraseña debe contener al menos:<br/>Un número.<br/> Una letra mayuscula<br/> Una letra minuscula<br/>Un carácter especial<br/>Una longitud de minimo 8 caracteres", "error");
            //alert("La contraseña debe contener al menos un número, una letra mayuscula y una letra minuscula y una longitud de minimo 8 caracteres")
            return false;
        }
        return true;
    }

    const validateEmail = (email) => {
        let emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
        if (!emailRegex.test(email)) {
            Swal.fire("Error!", "El email no es valido!", "error");
            //alert("El email no es valido")
            return false;
        }
        return true;
    }

    const changeVisibilityPassword = () => setIsRevealPwd(prevState => !prevState)

    return (
        <>
            <div className="container">
                <div className="row my-3">
                    <div className="col-12 col-md-5">
                        <h3 className="display-4">Bienvenido a PetVA</h3>
                        <p className="fs-4">Para continuar tu proceso de registro selecciona que tipo de usuario eres:</p>
                        <div >
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optNormal" value="Usuario" />
                                <label className="form-check-label" htmlFor="optNormal">Usuario</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optClinica" value="Clinica" />
                                <label className="form-check-label" htmlFor="optClinica">Clínica Veterinaria</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optFundacion" value="Fundación" />
                                <label className="form-check-label" htmlFor="optFundacion">Fundación</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 text-center">
                        <h2 className="display-5">Registro</h2>
                        {!!user && !isRegister &&
                            <form action="" className="needs-validation" >
                                <div className="border border-secondary p-1 rounded">
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="tipo">Tipo de Usuario</span>
                                        <input className="form-control fs-5 text-center" type="text" id="tipo" required readOnly value={user} />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="name">Nombre </span>
                                        <input className="form-control fs-5" type="text" id="name" onChange={e => setName(e.target.value)} required />
                                    </div>
                                    {
                                        user === 'Usuario' &&
                                        <div className="text-start">
                                            <span className="input-group-text d-block text-start fs-4" htmlFor="lastname">Apellido </span>
                                            <input className="form-control fs-5" type="text" id="lastname" onChange={e => setLastname(e.target.value)} required />
                                        </div>
                                    }
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Email </span>
                                        <input className="form-control fs-5" type="email" id="email" onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    {
                                        user === 'Fundación' &&
                                        <>
                                            <div className="text-start">
                                                <span className="input-group-text d-block text-start fs-4" htmlFor="email">Dirección </span>
                                                <input className="form-control fs-5" type="text" id="direccion" name="direccion" onChange={e => setAddress(e.target.value)} required />
                                            </div>
                                            <div className="text-start">
                                                <span className="input-group-text d-block text-start fs-4" htmlFor="phone">Número de Telefono </span>
                                                <input className="form-control fs-5" type="tel" id="phone" onChange={e => setPhone(e.target.value)} required />
                                            </div>
                                        </>
                                    }{
                                        user === 'Clinica' &&
                                        <>
                                            <div className="text-start">
                                                <span
                                                    className="input-group-text d-block text-start fs-4"
                                                    htmlFor="email"
                                                >
                                                    Dirección
                                                </span>
                                                <input
                                                    className="form-control fs-5"
                                                    type="text"
                                                    id="direccion"
                                                    name="direccion"
                                                    onChange={e => setAddress(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="text-start">
                                                <span
                                                    className="input-group-text d-block text-start fs-4"
                                                    htmlFor="phone"
                                                >
                                                    Número de Telefono
                                                </span>
                                                <input
                                                    className="form-control fs-5"
                                                    type="tel"
                                                    id="phone"
                                                    onChange={e => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    }
                                    {
                                        user === 'Usuario' &&                                   
                                        <div className="text-start">
                                            <span className="input-group-text d-block text-start fs-4" htmlFor="lastname">Telefono </span>
                                            <input className="form-control fs-5" type="text" id="lastname" onChange={e => setPhone(e.target.value)} required />
                                        </div>
                                        }
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">
                                            Contraseña
                                            {
                                                isRevealPwd ?
                                                    <FaEyeSlash className="ms-2" title="Show password"
                                                        onClick={changeVisibilityPassword}
                                                    />
                                                    :
                                                    <FaEye className="ms-2" title="Hide password"
                                                        onClick={changeVisibilityPassword}
                                                    />
                                            }
                                        </label>
                                        <input
                                            className="form-control fs-5"
                                            type={isRevealPwd ? "text" : "password"}
                                            id="id_password"
                                            placeholder="Ingrese Contraseña"
                                            required
                                            title="Contraseña"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">
                                            Confirmar Contraseña
                                            {
                                                isRevealPwd ?
                                                    <FaEyeSlash className="ms-2" title="Show password"
                                                        onClick={changeVisibilityPassword}
                                                    />
                                                    :
                                                    <FaEye className="ms-2" title="Hide password"
                                                        onClick={changeVisibilityPassword}
                                                    />
                                            }
                                        </label>
                                        <input
                                            className="form-control fs-5"
                                            type={isRevealPwd ? "text" : "password"}
                                            id="id_passwordC"
                                            placeholder="Confirme Contraseña"
                                            required
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button onClick={validarRegistro} type="submit" className="btn btn-success mt-3 p-2 fs-4">
                                            Registrar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        }
                        {
                            isRegister &&
                            <div>
                                {
                                    user === 'Usuario' ?
                                        history.push("/user/login") : ""
                                }
                                {
                                    user === 'Fundación' ?
                                        history.push("/foundation/login") : ""
                                }{
                                    user === 'Clinica' ?
                                        history.push("/clinic/login") : ""
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
