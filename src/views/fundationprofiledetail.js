import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";

const Fundationprofiledetail = () => {
    const { actions, store } = useContext(Context);

    useEffect(() => {
        //deberia estar el get mascotas fundation
        actions.getFundationDetail();
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
                            !!store.fundationDetail &&

                            <div className="card mb-3" style={{ maxWidth: 540 }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={store.fundationDetail.picture} className="img-fluid rounded-start" alt="Imagen Fundación" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{store.fundationDetail.name}</h5>
                                            <p className="card-text">
                                                {store.fundationDetail.email}
                                            </p>
                                            <p className="card-text">
                                                {store.fundationDetail.phone}
                                            </p>
                                            <p className="card-text">
                                                {store.fundationDetail.address}
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
export default Fundationprofiledetail;