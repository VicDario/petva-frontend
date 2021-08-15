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
        if (pet.name === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe ingresar un nombre.'
            });
        } else if (pet.breed === null) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe ingresar una raza.'
            });
        } else if (pet.birth_date === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe ingresar una fecha de nacimiento.'
            });
        } else if (pet.specie === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Debe ingresar una especie.'
            });
        } else {
            if (store.userType === "normal") {
                actions.registerPet(pet.name, pet.chip_code, formatDate(pet.birth_date), pet.specie, pet.breed, store.auxPicture);
                Swal.fire({
                    icon: "success",
                    title: "Mascota agregada.",
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/user/pets");
            }
            if (store.userType === "foundation") {
                console.log("Agrega la mascota como fundación")
                actions.registerPetFundation(pet.name, pet.chip_code, formatDate(pet.birth_date), pet.specie, pet.breed, store.auxPicture)
                Swal.fire({
                    icon: "success",
                    title: "Mascota agregada.",
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/foundation/pets/adoption");
            }
            actions.resetAuxPicture(); // reset aux picture to null
        }
    }

    const handleLoad = (e) => {
        let file = e.target.files[0]; // load the picture (just one file)
        actions.convertImgToBase64(file); //Save picture in base64 format at store in auxPicture
    }

    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-12 text-center">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <h2 className="display-1 text-start mb-0">Agregar Mascota</h2>
                            <hr className="hr-add-pet mt-0 mb-4" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-10 col-md-12 col-sm-12 col-xs-12 mx-auto">
                    <form onSubmit={handleSubmit} className="form-add-pet p-5">
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label fs-4" htmlFor="petname">Nombre</label>
                            <div className="col-sm-9">
                                <input onChange={(e) => { setPet({ ...pet, name: e.target.value }) }} type="text" className="form-control fs-4" id="petname" required />
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
                                <input type="text" onChange={(e) => { setPet({ ...pet, breed: e.target.value }) }} className="form-control fs-4" id="breed" required />
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
                                <input onChange={(e) => { setPet({ ...pet, birth_date: e.target.value }) }} type="date" className="form-control fs-4" id="birth" required />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-add-pet badge rounded-pill p-3 m-1 fs-4">
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
