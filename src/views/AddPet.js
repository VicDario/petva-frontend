import { useContext, useState } from "react"
import { Context } from "../store/appContext"
import Swal from "sweetalert2";

const AddPet = ({ history }) => {
    const { actions, store } = useContext(Context);
    const [pet, setPet] = useState({
        name: "",
        chip_code: null,
        breed: null,
        birth_date: "",
        specie: ""
    });

    const formatDate = (date) => {
        let newdate = date.split("-")
        newdate = newdate.reverse()
        newdate = newdate.join("/")
        console.log(newdate)

        return newdate
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(store.userType==="normal"){
            actions.registerPet(pet.name, pet.chip_code, formatDate(pet.birth_date), pet.specie, pet.breed, store.auxPicture);
            Swal.fire({
                icon: "success",
                title: "Mascota agregada.",
                showConfirmButton: false,
                timer: 1500
            })
            history.push("/user/pets");
        }
        if(store.userType==="foundation"){
            console.log("Agrega la mascota como fundación")
            actions.registerPetFundation(pet.name, pet.chip_code, formatDate(pet.birth_date), pet.specie, pet.breed, store.auxPicture)
            Swal.fire({
                icon: "success",
                title: "Mascota agregada.",
                showConfirmButton: false,
                timer: 1500
            })
            history.push("/foundation/pets");
        }
        actions.resetAuxPicture(); // reset aux picture to null
    }

    const handleLoad = (e) =>{
        let file = e.target.files[0]; // load the picture (just one file)
        actions.convertImgToBase64(file); //Save picture in base64 format at store in auxPicture
    }

    return (
        <div className="container">
            <div className="row my-4 border border-dark">
                <div className="col-12 text-center">
                    <div className="mb-3">
                        <h1>Agregar Mascota como {store.userType}</h1>
                    </div>
                </div>
                <div className="col-12 col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="petname">Nombre</label>
                            <div className="col-sm-9">
                                <input onChange={(e) => { setPet({ ...pet, name: e.target.value }) }} type="text" className="form-control fs-4" id="petname" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="chip_code">Codigo Chip</label>
                            <div className="col-sm-9">
                                <input type="text" onChange={(e) => { setPet({ ...pet, chip_code: e.target.value }) }} className="form-control fs-4" id="chip_code" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="">Especie</label>
                            <div className="col-sm-9">
                                <select defaultValue="" className="form-select" onChange={(e) => { setPet({ ...pet, specie: e.target.value }) }}>
                                    <option value="">Seleccione una Especie</option>
                                    <option value="dog">Perro</option>
                                    <option value="cat">Gato</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="breed">Raza</label>
                            <div className="col-sm-9">
                                <input type="text" onChange={(e) => { setPet({ ...pet, breed: e.target.value })}} className="form-control fs-4" id="breed" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="picture">Imagen</label>
                            <div className="col-sm-9">
                                <input type="file" onChange={e => handleLoad(e)} accept="image/png, .jpg, .jpeg" className="form-control fs-5" id="picture" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="birth">Fecha Nacimiento</label>
                            <div className="col-sm-9">
                                <input onChange={(e) => { setPet({ ...pet, birth_date: e.target.value }) }} type="date" className="form-control fs-4" id="birth" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success btn-lg mb-3 ">
                                Agregar Mascota
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddPet