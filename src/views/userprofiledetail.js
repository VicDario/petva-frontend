const Userprofiledetail = ()=>{

    const misdatos = ()=>{
        console.log("Estos son mis datos");
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Mis Datos</h1>
                    </div>
                    <div>
                        <button onClick={misdatos}>
                            ver mis datos
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userprofiledetail;