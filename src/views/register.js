import { useState } from "react"
import{FaEye} from "react-icons/fa"


const Register = () => {

    const [user, setUser] = useState("");

    const [isRevealPwd, setIsRevealPwd] = useState(false);

    return (

        <>
            <div className="container">
                <div>
                    <h1 className="display-1">
                        PetVA
                    </h1>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5">
                        <h3 className="display-4">Bienvenido a PetVA</h3>
                        <p className="fs-4">Para continuar tu proceso de registro selecciona que tipo de usuario eres:</p>
                        <div >

                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e)=>setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optNormal" value="normal" />
                                <label className="form-check-label" htmlFor="optNormal">Usuario Común</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optClinica" value="clinica" />
                                <label className="form-check-label" htmlFor="optClinica">Clínica Veterinaria</label>
                            </div>
                            <div className="form-check form-check-inline d-block fs-3">
                                <input  onChange={(e) => setUser(e.target.value)} className="form-check-input" type="radio" name="tipoUsuario" id="optFundacion" value="fundacion" />
                                <label className="form-check-label" htmlFor="optFundacion">Fundación</label>
                            </div>
                        </div>
                        <div className="fs-3">
                            <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" checked />
                            <label htmlFor="option1" className="btn btn-primary btn-lg">Usuario Normal</label>
                        </div>
                        <div className="fs-3">
                            <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" checked />
                            <label htmlFor="option2" className="btn btn-primary btn-lg">Clínica Veterinaria</label>
                        </div>
                        <div className="fs-3">
                            <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" checked />
                            <label htmlFor="option3" className="btn btn-primary btn-lg">Fundación</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 text-center">
                        <h2>Registro como {user}</h2>
                        <div className="border border-secondary p-1 rounded">
                            <div className="text-start">
                                <span className="input-group-text d-block text-start" htmlFor="name">Nombre </span>
                                <input className="form-control " type="text" id="name" />
                            </div>
                            <div className="text-start">
                                <span className="input-group-text d-block text-start" htmlFor="email">Email </span>
                                <input className="form-control " type="text" id="email" />
                            </div>
                            <div className="text-start">
                                <label className="input-group-text d-block text-start" htmlFor="password">Contraseña <FaEye title={isRevealPwd ? "Hide password":"Show password"} onClick={()=>setIsRevealPwd(prevState =>!prevState)}/></label>
                                <input className="form-control " type={isRevealPwd ? "text": "password"} id="id_password" placeholder="Ingrese Contraseña"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register