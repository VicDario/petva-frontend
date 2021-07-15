import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";

const Userprofiledetail = ()=>{
    const {actions,store} = useContext(Context);
    
    useEffect(() => {
        actions.getMascotasUser()
        actions.getUserDetail();
    }, [])
    const lengthPets = store.pets.length
    

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Mis Datos</h1>
                    </div>
                    <div>

                        {
                            !!store.userDetail && !!store.pets &&

                        <div className="card mb-3" style={{ maxWidth: 540 }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                        <img src={store.userDetail.picture} className="img-fluid rounded-start" alt="Imagen Perfil" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                            <h5 className="card-title">{store.userDetail.name} {store.userDetail.lastname}</h5>
                                        <p className="card-text">
                                                {store.userDetail.email}
                                        </p>
                                            <p className="card-text">
                                                {store.userDetail.phone}
                                            </p>
                                        <p className="card-text">
                                            <small className="text-muted">Numero de Mascotas actuales: {lengthPets}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default Userprofiledetail;