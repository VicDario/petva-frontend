import { createRef, useContext, useState } from "react"
import { FaEye } from "react-icons/fa"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


const Register = () => {
    const {actions} = useContext(Context);
    const [user, setUser] = useState("");//aca se guarda el tipo de usuario
    const [name, setName] = useState(""); //
    const [lastname, setLastname] = useState(""); //
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");
    let nameForm = createRef();
    const [datos, setDatos] = useState({
        password : "",
        passwordC : ""
    })

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isRevealPwdC, setIsRevealPwdC] = useState(false);

    const validarRegistro = (e)=>{
        e.preventDefault()
        if(user === "" ){
            alert("Debe seleccionar tipo de Usuario")
            e.preventDefault()
        }
        if (user === "NORMAL")
        {
            if (user === "" || name === "" || email === "" || datos.password === "")
            {
                alert("Debe rellenar todos los campos")
                e.preventDefault()
            } else
            {
                if (datos.password === datos.passwordC)
                {

                    actions.registerUser(email, name, lastname, datos.password)
                    setUser("REGISTRADO")
                } else
                {
                    alert("Revise contraseñas")
                }
            }
        }
        if(user ==="CLINICA"){
            if (user === "" || name === "" || email === "" || datos.password ==="")
            {
                alert("Debe rellenar todos los campos")
                e.preventDefault()
            }else{
                if(datos.password === datos.passwordC){

                    actions.registerClinica(email,name,address,phone,datos.password)
                    setUser("REGISTRADO")
                }else{
                    alert("Revise contraseñas")
                }
            }
        }
        if (user === "FUNDACION")
        {
            if (user === "" || name === "" || email === "" || datos.password === "")
            {
                alert("Debe rellenar todos los campos")
                e.preventDefault()
            } else
            {
                if (datos.password === datos.passwordC)
                {

                    actions.registerClinica(email, name, address, phone, datos.password)
                    setUser("REGISTRADO")
                } else
                {
                    alert("Revise contraseñas")
                }
            }
        }
        /* if(name === ""){
            nameForm.classList.add("is-invalid")
            nameForm.classList.remove("is-valid")

        }else{
            nameForm.classList.remove("is-invalid")
            nameForm.classList.add("is-valid")
        } */
        // actions.registerClinica()
    }
    const loginClinic = ()=>{
        actions.loginClinica();
    }

    return (

        <>
            <div className="container">
                <div className="text-center my-3">
                    <h1 className="display-1">
                        PetVA
                    </h1>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-md-5">
                        <h3 className="display-4">Bienvenido a PetVA</h3>
                        <p className="fs-4">Para continuar tu proceso de registro selecciona que tipo de usuario eres:</p>
                        <div >

                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optNormal" value="NORMAL" />
                                <label className="form-check-label" htmlFor="optNormal">Usuario Común</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optClinica" value="CLINICA" />
                                <label className="form-check-label" htmlFor="optClinica">Clínica Veterinaria</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optFundacion" value="FUNDACION" />
                                <label className="form-check-label" htmlFor="optFundacion">Fundación</label>
                            </div>
                            {/* Este de aca es para ir probando */}
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optRegistrado" value="REGISTRADO" />
                                <label className="form-check-label" htmlFor="optRegistrado">REGISTRADO</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 text-center">
                        <h2 className="display-5">Registro</h2>
                        { //renderizado como user normal
                        user === "NORMAL" &&

                        <form action="" className="needs-validation" >
                        <div className="border border-secondary p-1 rounded">
                            <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="tipo">Tipo de Usuario </span>
                                <input  className="form-control fs-5 text-center" type="text" id="tipo" required readOnly value={user}/>
                            </div>
                            <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="name">Nombre </span>
                                <input ref={
                                    t => nameForm = t
                                } className="form-control fs-5" type="text" id="name" required 
                                        onChange={(e) => { setName(e.target.value) }}/>
                            </div>
                            <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="lastname">Apellido </span>
                                <input onChange={(e)=>{setLastname(e.target.value)}} className="form-control fs-5" type="text" id="lastname" required/>
                            </div>
                            <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="email">Email </span>
                                <input onChange={(e)=>{setEmail(e.target.value)}} className="form-control fs-5" type="email" id="email" required/>
                            </div>
                            <div className="text-start">
                                <label className="input-group-text d-block text-start fs-4" htmlFor="password">Contraseña <FaEye title={isRevealPwd ? "Hide password" : "Show password"} onClick={() => setIsRevealPwd(prevState => !prevState)} /></label>
                                <input className="form-control fs-5" type={isRevealPwd ? "text" : "password"} id="id_password" placeholder="Ingrese Contraseña" required
                                            onChange={(e) => { setDatos({...datos,
                                            password : e.target.value}) }}/>
                            </div>
                            <div className="text-start">
                                <label className="input-group-text d-block text-start fs-4" htmlFor="password">Confirmar Contraseña <FaEye title={isRevealPwdC ? "Hide password" : "Show password"} onClick={() => setIsRevealPwdC(prevState => !prevState)} /></label>
                                <input onChange={(e)=>{setDatos({...datos, passwordC:e.target.value})}} className="form-control fs-5" type={isRevealPwdC ? "text" : "password"} id="id_password" placeholder="Confirme Contraseña" required/>
                            </div>
                            {/* <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="email">Dirección </span>
                                <input className="form-control fs-5" type="text" id="direccion" name="direccion" required/>
                            </div>
                            <div className="text-start">
                                <span className="input-group-text d-block text-start fs-4" htmlFor="email">Teléfono </span>
                                <input className="form-control fs-5" type="tel" id="telefono" name="telefono" required/>
                            </div> */}
                            <div className="text-center">
                                <button onClick={validarRegistro} type="submit" className="btn btn-success mt-3 p-2 fs-4">
                                    Registrar
                                </button>
                            </div>
                        </div>

                        </form>
                        
                        }
                        { //Renderizado si es user CLINICA
                            user === "CLINICA" &&
                            <form action="" className="needs-validation" >
                                <div className="border border-secondary p-1 rounded">
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="tipo">Tipo de Usuario </span>
                                        <input className="form-control fs-5 text-center" type="text" id="tipo" required readOnly value={user} />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="name">Nombre </span>
                                        <input ref={
                                            t => nameForm = t
                                        } className="form-control fs-5" type="text" id="name" required
                                            onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Email </span>
                                        <input onChange={(e) => { setEmail(e.target.value) }} className="form-control fs-5" type="email" id="email" required />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Dirección </span>
                                        <input onChange={(e)=>{setAddress(e.target.value)}} className="form-control fs-5" type="text" id="direccion" name="direccion" required />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Teléfono </span>
                                        <input onChange={(e)=>{setPhone(e.target.value)}} className="form-control fs-5" type="tel" id="telefono" name="telefono" required />
                                    </div>
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">Contraseña <FaEye title={isRevealPwd ? "Hide password" : "Show password"} onClick={() => setIsRevealPwd(prevState => !prevState)} /></label>
                                        <input className="form-control fs-5" type={isRevealPwd ? "text" : "password"} id="id_password" placeholder="Ingrese Contraseña" required
                                        onChange={(e)=>{setDatos({...datos, password:e.target.value})}} />
                                    </div>
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">Confirmar Contraseña <FaEye title={isRevealPwdC ? "Hide password" : "Show password"} onClick={() => setIsRevealPwdC(prevState => !prevState)} /></label>
                                        <input className="form-control fs-5" type={isRevealPwdC ? "text" : "password"} id="id_passwordC" placeholder="Confirme Contraseña" required onChange={(e) => { setDatos({...datos, passwordC:e.target.value}) }} />
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
                            user === "FUNDACION" &&
                            <form action="" className="needs-validation" >
                                <div className="border border-secondary p-1 rounded">
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="tipo">Tipo de Usuario </span>
                                        <input className="form-control fs-5 text-center" type="text" id="tipo" required readOnly value={user} />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="name">Nombre </span>
                                        <input ref={
                                            t => nameForm = t
                                        } className="form-control fs-5" type="text" id="name" required
                                            onChange={(e) => { setName(e.target.value) }} />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="lastname">Apellido </span>
                                        <input className="form-control fs-5" type="text" id="lastname" required />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Email </span>
                                        <input onChange={(e) => { setEmail(e.target.value) }} className="form-control fs-5" type="email" id="email" required />
                                    </div>
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">Contraseña <FaEye title={isRevealPwd ? "Hide password" : "Show password"} onClick={() => setIsRevealPwd(prevState => !prevState)} /></label>
                                        <input className="form-control fs-5" type={isRevealPwd ? "text" : "password"} id="id_password" placeholder="Ingrese Contraseña" required />
                                    </div>
                                    <div className="text-start">
                                        <label className="input-group-text d-block text-start fs-4" htmlFor="password">Confirmar Contraseña <FaEye title={isRevealPwdC ? "Hide password" : "Show password"} onClick={() => setIsRevealPwdC(prevState => !prevState)} /></label>
                                        <input className="form-control fs-5" type={isRevealPwdC ? "text" : "password"} id="id_password" placeholder="Confirme Contraseña" required />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Dirección </span>
                                        <input onChange={(e) => { setAddress(e.target.value) }} className="form-control fs-5" type="text" id="direccion" name="direccion" required />
                                    </div>
                                    <div className="text-start">
                                        <span className="input-group-text d-block text-start fs-4" htmlFor="email">Teléfono </span>
                                        <input className="form-control fs-5" type="tel" id="telefono" name="telefono" required />
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
                            user === "REGISTRADO" &&
                            <div>
                                <h1>Usuario Registrado</h1>
                                <p>Ve a iniciar sesión</p>
                                <Link className="btn btn-dark" to="/login">
                                    Iniciar Sesisón
                                </Link>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <button onClick={loginClinic}>

                        precionar para probar login
                    </button>
                </div>
            </div>

        </>
    )
}

export default Register