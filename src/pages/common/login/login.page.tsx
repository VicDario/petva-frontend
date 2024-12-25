import { useCallback, useContext } from "react";
import { Context } from "@context/appContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { User } from "@interfaces/user.interface";

interface LoginResponse {
  access_token: string;
}

enum UserType {
  USER = "user",
  VETERINARY = "veterinary",
  CLINIC = "clinic",
  FOUNDATION = "foundation",
}

const Login = () => {
  const { setToken, setUser } = useContext(Context);
  const navigate = useNavigate();

  const showAlertIncorrectPassword = useCallback(() => {
    Swal.fire({
      icon: "error",
      title: "Revisa tus datos!",
      text: "El correo no coincide con la contraseña.",
      showConfirmButton: false,
      timer: 1800,
    });
  }, []);

  const userTypes = [
    { name: "Usuario", type: UserType.USER },
    { name: "Veterinario", type: UserType.VETERINARY },
    { name: "Clinica", type: UserType.CLINIC },
    { name: "Fundación", type: UserType.FOUNDATION },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    );
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (response.status === 401) showAlertIncorrectPassword();

      const loginData: LoginResponse = await response.json();
      setToken(loginData.access_token);

      const responseUser = await fetch(`/${form.type}`, {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      });
      const userData: User = await responseUser.json();
      setUser(userData);
      navigate(`/${form.type}/home`);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="container container-login">
      <div className="row login-menu">
        <div className="col-md-12 col-sm-12 mx-auto my-4 d-flex flex-column justify-content-around align-items-center">
          <main className="form-sigin bg-login p-4 mt-3 d-flex flex-column justify-content-around align-items-center login">
            <form
              className="px-3 login d-flex flex-column justify-content-around align-items-center"
              onSubmit={handleSubmit}
            >
              <h1 className="h2 mb-4">Inicio de Sesión</h1>
              <div className="form-floating login-input my-3 w-80">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-floating login-input my-4 ">
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                  id="password"
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <select
                className="form-select"
                aria-label="Seleccione tipo de usuario"
              >
                {userTypes.map((userType) => (
                  <option value={userType.type}>{userType.name}</option>
                ))}
              </select>
              <button className="btn btn-login mt-3 px-5" type="submit">
                Iniciar Sesión
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Login;
