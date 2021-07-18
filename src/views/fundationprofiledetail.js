import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";

const Foundationprofiledetail = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        //deberia estar el get mascotas foundation
        actions.getFoundationDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Mis Datos</h1>
                    </div>
                    <div>

                        {
                            !!store.foundationDetail &&

                            <div className="card mb-3" style={{ maxWidth: 540 }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={store.foundationDetail.picture} className="img-fluid rounded-start" alt="Imagen Fundación" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{store.foundationDetail.name}</h5>
                                            <p className="card-text">
                                                {store.foundationDetail.email}
                                            </p>
                                            <p className="card-text">
                                                {store.foundationDetail.phone}
                                            </p>
                                            <p className="card-text">
                                                {store.foundationDetail.address}
                                            </p>
                                            <p className="card-text">
                                                <small className="text-muted">Numero de Mascotas actuales: </small>
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
export default Foundationprofiledetail;