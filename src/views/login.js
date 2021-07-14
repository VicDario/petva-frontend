const Login = () => {

    const validateForm = (e) => {
        let password = document.getElementById('password');
        let password_regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");
        if (password.value.trim() === '') {
            console.error("password empty");
            return false;
        } else if (password.value.length < 8) {
            console.error("password too short");
            return false;
        } else if (!password_regex.test(password.value)) {
            console.error("password may contain at least one mayus letter, one minus letter, one number and one special character.")
            return false;
        } else {
            console.log(password.value);
            return true;
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto my-3 text-center">
                    <main className="form-sigin bg-white rounded-3 p-4">
                        <form className="px-3" onSubmit={(e) => !validateForm(e) ? e.preventDefault() : ""}>
                            <h1 className="h2 mb-4">Inicio de Sesión</h1>
                            <div className="form-floating my-3 w-80">
                                <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="form-floating mt-3 mb-2">
                                <input type="password" className="form-control" placeholder="********" id="password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="checkbox mb-2">
                                <label>
                                    <input type="checkbox" className="me-1" value="remember-me" />
                                    Recuerdame
                                </label>
                            </div>
                            <button className="w-50 btn btn-primary" type="submit">Iniciar Sesión</button>
                            <div className="mt-1">
                                <span className="text-muted">¿Has olvidado tu contraseña?</span>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}
export default Login;