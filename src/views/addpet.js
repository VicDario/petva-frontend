import { useState } from "react"


const Addpet = () => {

    const [pet, setPet] = useState({
        name: "",
        chip_code: null,
        breed: null,
        picture: null,
        birth_date: null,
        specie: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const formatDate = (date)=>{
        
    }

    return (
        <>
            <div className="container">
                <div className="row my-4 border border-dark">
                    <div className="col-12 text-center">
                        <div className="mb-3">
                            <h1>Agregar Mascota</h1>

                        </div>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="petname">Nombre</label>
                                <div className="col-sm-9">
                                    <input onChange={(e)=>{setPet({...pet, name:e.target.value})}} type="text" className="form-control fs-4" id="petname" />
                                    {pet.name}
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="chip_code">Codigo Chip</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control fs-4" id="chip_code" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="">Especie</label>
                                <div className="col-sm-9">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Seleccione una Especie</option>
                                        <option value="dog">Perro</option>
                                        <option value="cat">Gato</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="breed">Raza</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control fs-4" id="breed" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="picture">Imagen</label>
                                <div className="col-sm-9">
                                    <input type="file" className="form-control fs-5" id="picture" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="col-sm-3 col-form-label fs-4" htmlFor="birth">Fecha Nacimiento</label>
                                <div className="col-sm-9">
                                    <input onChange={(e)=>{setPet({...pet,birth_date: e.target.value})}} type="date" className="form-control fs-4" id="birth" />
                                    {pet.birth_date}
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                            <button className="btn btn-success btn-lg mb-3 ">
                                Agregar Mascota
                            </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Addpet