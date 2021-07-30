import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router";
import { FaCat, FaDog } from "react-icons/fa";


const TransferPetFromFoundation = () => {
    const { actions, store } = useContext(Context);
    const [mailUser, setMailUser] = useState();
    const { pet_id } = useParams()
    
    const history = useHistory();

     useEffect(() => {
        actions.getSinglePetFromFoundation(pet_id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const makeTransfer = () => {
        actions.transferPetFromFundation(mailUser, pet_id, history);
    }
    const toBack = ()=>{
        history.goBack();
    }
    return (
        <div className="container">
            <div className="text-center">
                {
                    !!store.foundationPet &&
                <h1>Tranferir {store.foundationPet.name} a Usuario </h1>
                }
            </div>
            <div className="row my-4">
                <div className="col-12 col-md-5">
                    {
                        !!store.foundationPet &&
                        <div className="card mb-3">
                            <img 
                                src = 
                                {
                                    !!store.foundationPet.picture ?
                                        store.foundationPet.picture 
                                    :
                                        "/images/default.jpg"
                                } 
                                 className="card-img-top" alt={store.foundationPet.name} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {store.foundationPet.name}
                                    <span className="card-title fs-3 ">
                                        {
                                        store.foundationPet.specie === 'cat' ?
                                        <FaCat className="align-top ms-1" /> 
                                        :
                                        <FaDog className="align-top ms-1" />
                                        }
                                    </span>
                                </h5>
                                <p className="card-text">
                                    {
                                    !!store.foundationPet.birth_date ?
                                        actions.getEdad(store.foundationPet.birth_date) 
                                    : 
                                        "No registra fecha de nacimiento"
                                    }
                                </p>
                                <p className="card-text">
                                    {
                                    !!store.foundationPet.code_chip ? 
                                    "Codigo Chip: "+ store.foundationPet.code_chip 
                                    : 
                                    "No registra codigo de chip"
                                    }
                                </p>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-12 col-md-5">
                    <div>
                        <h2>Ingrese Email de Usuario a Tranferir</h2>
                    </div>
                    <div>
                        <input className="form-control mt-3" id="mail-user" 
                            onChange={(e) => { setMailUser(e.target.value) }} type="text"
                            placeholder="Ingrese email de usuario a transferir mascota"
                        />
                    </div>
                    <div className="text-center my-5">
                        <button onClick={makeTransfer} className="btn btn-success btn-lg">TRANSFERIR</button>
                    </div>
                    <div className="text-center my-5">
                        <button onClick={toBack} className="btn btn-danger btn-lg">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferPetFromFoundation;
