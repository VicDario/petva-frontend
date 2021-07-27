import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from "../store/appContext";
import LoadingSpinner from '../Components/LoadingSpinner';

const DoctorAttending = (props) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getInfoPetForDoctor(params.pet_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
        {
            !!store.infoPet ?
                String(store.infoPet.Pet.id) === params.pet_id ?
                    <div className="container">
                        <div className="row">
                            <div className="border border-secondary rounded">
                                <div className="d-flex flex-row">
                                    <img 
                                        src={!!store.infoPet.Pet.picture ? store.infoPet.Pet.picture : '/images/default.jpg'} 
                                        className="rounded image-pet" 
                                        alt={`Foto de ${store.infoPet.Pet.name}`} 
                                    />
                                    <div className="">
                                        <h3>Nombre: {store.infoPet.Pet.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :   
                    <LoadingSpinner />
            :
                <LoadingSpinner />
        }
        </>
    );

}
export default  DoctorAttending;