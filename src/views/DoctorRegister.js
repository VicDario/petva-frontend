import { useContext, useState } from "react";
import { Context } from "../store/appContext";

const DoctorRegister = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto my-2 text-center">
                        <main className="form-sigin bg-white rounded-3 p-4">
                            <form className="px-3" onSubmit={""}>
                                <h1 className="h2 mb-4">Registro de médico</h1>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e)=>setEmail(e.target.value)}type="email" className="form-control" id="email" placeholder="name@example.com" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e)=>setName(e.target.value)}type="text" className="form-control" id="name" placeholder="yournamehere" />
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e)=>setLastname(e.target.value)} type="text" className="form-control" id="lastname" placeholder="yourlastnamehere" />
                                    <label htmlFor="lastname">Apellidos</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e)=>setSpecialty(e.target.value)} type="text" className="form-control" id="specialty" placeholder="yourspecialtyhere" />
                                    <label htmlFor="specialty">Especialidad</label>
                                </div>
                                <div className="form-floating mt-3 mb-2">
                                    <input onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" placeholder="********" id="password" />
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="form-floating mt-3 mb-2">
                                    <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="********" id="password" />
                                    <label htmlFor="password">Confirmar contraseña</label>
                                </div>
                                <button className="w-50 mt-2 btn btn-success" type="submit">Registrar Doctor</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DoctorRegister;