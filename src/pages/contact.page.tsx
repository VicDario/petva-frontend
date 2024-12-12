const Contact = ()=> {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto my-3 text-center">
                    <main className="form-contact bg-contact p-4 mt-3">
                        <form className="px-3">
                            <h1 className="h2 mb-4 p-2 btn-login rounded-pill">Formulario de contacto</h1>
                            <div className="form-floating contact-input-group my-3 w-80">
                                <input className="form-control contact-input" type="text" placeholder="Tu nombre" id="contact_name"/>
                                <label htmlFor="contact_name">Nombre</label>
                            </div>
                            <div className="form-floating contact-input-group my-4">
                                <input className="form-control contact-input" type="text" placeholder="Tu correo" id="contact_email"/>
                                <label htmlFor="contact_email">Email</label>
                            </div>
                            <div className="form-floating contact-input-group my-3 w-80">
                                <textarea className="form-control contact-input contact-textarea" type="text" placeholder="Tu nombre" id="contact_comment"/>
                                <label htmlFor="contact_comment">Comentario</label>
                            </div>
                            <button className="btn btn-login mt-3 px-5" type="submit">Enviar</button>

                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
export default Contact;