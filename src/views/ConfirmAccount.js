import { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";
const ConfirmAccount = () => {
    const history = useHistory();
    const params = useParams();
    const { actions } = useContext(Context);
    const handleConfirm = async () => {
        const response = await actions.confirmAccount(params.token, params.user);
        if (response.ok) {
            if (params.user === 'user') {
                Swal.fire({
                    icon: 'success',
                    title: "Cuenta Confirmada",
                    text: "Inicia sesión",
                    type: "success",
                    timer: 5000,
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: "Correo Confirmado",
                    html: "Solo te falta un paso.<br/>Revisa tu correo",
                    type: "success",
                    timer: 6000,
                })
            }
        } else {
            //console.log(response);
            Swal.fire({
                icon: 'error',
                title: "Error al confirmar la cuenta",
                type: "error",
                timer: 3000,
            })
        }
        history.push(`/${params.user}/login`)
    }
    if (params.user !== "user" && params.user !== "clinic" && params.user !== "doctor" && params.user !== "foundation") {
        history.push("/error");
    }
    useEffect(() => {
        handleConfirm();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Confirmando tu cuenta...
            <LoadingSpinner />
        </div>
    );
}
export default ConfirmAccount;