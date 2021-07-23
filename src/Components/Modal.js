const Modal = (props) => {

    if (props.status === 'reserved') {
        return (
            <div className="modal fade" id="modalReserved" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Reservada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Confirmar Asistencia</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    if(props.status === 'canceled') {
        return (
            <div className="modal fade" id="modalCanceled" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Cancelada</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Disponible</button>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    if(props.status === 'available') {
        return (
            <div className="modal fade" id="modalAvailable" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Hora Disponible</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.title}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Perdida</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;