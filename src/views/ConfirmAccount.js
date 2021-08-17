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
            Swal.fire({
                title: "Cuenta Confirmada",
                type: "success",
                timer: 2000,
            })
        } else {
            //console.log(response);
            Swal.fire({
                title: "Error al confirmar la cuenta",
                type: "error",
                timer: 2000,
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