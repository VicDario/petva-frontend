import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Context } from "../store/appContext";

const DoctorRegister = () => {
    const { actions } = useContext(Context);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = (password) => {
        let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire("Error!", "La contraseña debe contener al menos un número, una letra mayuscula y una letra minuscula y una longitud de minimo 8 caracteres", "error");
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' || name.trim() === '' || lastname.trim() === '' || specialty.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe rellenar todos los campos.'
            });
        } else {
            if (!validatePassword(password)) return
            if (!validateEmail(email)) return
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Las contraseñas no coinciden.'
                });
            } else {
                actions.registerDoctor(email, name, lastname, specialty, password)
                    .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Registrado!',
                            text: 'Medico registrado con éxito.'
                        });
                        history.push('/clinic');
                    })
                    .catch((error) => Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: "Ya existe un medico registrado con ese email"
                    }))
            }
        }
    }
    return (
        <>
            <div className="container">
                <div className="row my-4">
                    <div className="col-12 text-center">
                        <div className="row">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <h2 className="display-1 text-start mb-0">Registro de médico</h2>
                                <hr className="hr-add-doctor mt-0 mb-4" />
                            </div>
                        </div>
                        <div className="col-lg-10 col-md-12 col-sm-12 mx-auto">
                            <form onSubmit={(e) => handleSubmit(e)} className="form-add-doctor p-5">
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="name@example.com" />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="name" placeholder="yournamehere" />
                                    <label htmlFor="name">Nombre</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e) => setLastname(e.target.value)} type="text" className="form-control" id="lastname" placeholder="yourlastnamehere" />
                                    <label htmlFor="lastname">Apellidos</label>
                                </div>
                                <div className="form-floating my-3 w-80">
                                    <input onChange={(e) => setSpecialty(e.target.value)} type="text" className="form-control" id="specialty" placeholder="yourspecialtyhere" />
                                    <label htmlFor="specialty">Especialidad</label>
                                </div>
                                <div className="form-floating mt-3 mb-2">
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="********" id="password" />
                                    <label htmlFor="password">Contraseña</label>
                                </div>
                                <div className="form-floating mt-3 mb-2">
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="********" id="password_confirm" />
                                    <label htmlFor="password">Confirmar contraseña</label>
                                </div>
                                <button className="btn btn-add-doctor badge rounded-pill p-3 m-1 fs-4" type="submit">Registrar Doctor</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DoctorRegister;