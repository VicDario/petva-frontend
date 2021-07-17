import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const TransferPetFromFoundation = () => {
    const { actions, store } = useContext(Context);
    const [mailUser, setMailUser] = useState();
    const { pet_id } = useParams()
    console.log(pet_id);
    const history = useHistory();

    useEffect(() => {
        actions.getSinglePetFromFundation(pet_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const makeTransfer = () => {
        actions.transferPetFromFundation(mailUser, pet_id, history);
    }
    return (
        <>
            <div className="container">
                <div className="text-center">

                    <h1>Tranferir Mascota({pet_id}) a Usuario </h1>
                </div>

                <div className="row my-4">
                    <div className="col-12 col-md-5">
                        {
                            !!store.foundationPet &&
                            <div className="card mb-3">
                                <img src={!!store.foundationPet.picture ? store.foundationPett.picture : "/images/default.jpg"} className="card-img-top" alt={store.foundationPet.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{store.foundationPet.name}</h5>
                                    <p className="card-text">{store.foundationPet.specie === 'cat' ? "Gato" : "Perro"}</p>
                                    <p className="card-text">{!!store.foundationPet.birth_date ? store.foundationPet.birth_date : "No registra fecha de nacimiento"}</p>
                                    <p className="card-text">{!!store.foundationPet.chip_code ? store.foundationPet.chip_code : "No registra codigo de chip"}</p>

                                </div>


                            </div>
                        }
                    </div>
                    <div className="col-12 col-md-5">
                        <div>
                            <h2>Ingrese Email de Usuario a Tranferir</h2>
                        </div>
                        <div>
                            <input className="form-control mt-3" id="mail-user" onChange={(e) => { setMailUser(e.target.value) }} type="text"
                                placeholder="Ingrese email de usuario a transferir mascota" />
                        </div>
                        <div className="text-center my-5">
                            <button onClick={makeTransfer} className="btn btn-success btn-lg">TRANSFERIR</button>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default TransferPetFromFoundation;