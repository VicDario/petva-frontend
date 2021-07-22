const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            userType: null,
            pets: null,
            user: null,
            auxPicture: null,
            userDetail: null,
            foundationDetail: null,
            clinicDetail: null,
            baseUrl: 'https://petva-backend-dev.herokuapp.com/', //https://petva-backend-dev.herokuapp.com/
            foundationPet: null,
            historyUserPet: null,
            userPet: null,
            petsWithOwner: null,
            petsInAdoption: null,
            historyFoundationPet: null,
            lostPets: null
        },
        actions: {
            registerClinica: async (email, name, address, phone, password) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        address: address,
                        phone: phone,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/clinic/register`, opt);
                if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                return data;
            },
            registerUser: async (email, name, lastname, password) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        lastname: lastname,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/user/register`, opt);
                if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                return data;
            },
            loginUser: async (email, password, history) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/user/login`, opt);
                console.log(response.status);
                if (response.status === 401) {
                    return response;
                }
                //if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                /* if (data.access_token) sessionStorage.setItem("token", data.access_token) */
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "normal")
                    setStore({ userType: "normal" });
                    setStore({ token: data.access_token });
                    history.push("/user");
                }

            },
            loginFoundation: async (email, password, history) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/foundation/login`, opt);
                //if (response.status !== 200) throw new Error(response.status, "error");
                if (response.status === 401) {
                    return response;
                }
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "foundation")
                    setStore({ userType: "foundation" });
                    setStore({ token: data.access_token });
                    history.push("/foundation");
                }
            },
            loginClinic: async (email, password, history) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/clinic/login`, opt);
                //if (response.status !== 200) throw new Error(response.status, "error");
                if (response.status === 401) {
                    return response;
                }
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "clinic")
                    setStore({ userType: "clinic" });
                    setStore({ token: data.access_token });
                    history.push("/clinic");
                }
            },
            getMascotasUser: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ pets: data })

                } catch (error) {
                    console.error("There has been an error in get pets")
                }

            },
            getPetsFoundation: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/in_adoption`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error")
                    }
                    const data = await response.json();
                    setStore({ pets: data })

                } catch (error) {
                    console.error("There has been an error in get pets" + error)
                }
            },
            registerPet: async (name, chip_code, birth_date, specie, breed, picture) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        code_chip: chip_code,
                        birth_date: birth_date,
                        specie: specie,
                        breed: breed,
                        picture: picture
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${store.token}`
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/add`, opt);
                    if (!response.ok) {
                        throw new Error(`Status: ${response.status}`);
                    }
                    //const data = await response.json();
                    actions.getMascotasUser();
                } catch (error) {
                    console.error(`Register pet error ${error}`)
                }
            },
            registerPetFundation: async (name, chip_code, birth_date, specie, breed, picture) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        code_chip: chip_code,
                        birth_date: birth_date,
                        specie: specie,
                        breed: breed,
                        picture: picture
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in registerPet")
                    }
                    const data = await response.json();
                    console.log(data);
                    actions.getPetsFoundation();
                    actions.getPetsInAdoption();

                } catch (error) {
                    console.error("the has been some error in register pet")
                }
            },
            registerFoundation: async (email, name, address, phone, password) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        address: address,
                        phone: phone,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                const response = await fetch(`${store.baseUrl}api/foundation/register`, opt);
                if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                return data;
            },
            logOut: () => {
                const store = getStore()
                setStore({ ...store, token: null, userType: null, userDetail: null, pets: null })
                localStorage.removeItem("petvaToken");
                localStorage.removeItem("petvaUser");
            },
            convertImgToBase64: (file) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    setStore({ auxPicture: reader.result })
                };
            },
            getUserDetail: async () => {
                const store = getStore()
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/user/info", opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    if (data) setStore({ userDetail: data })
                } catch (error) {
                    console.error("Error in get detail user")
                }
            },
            getFoundationDetail: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/info`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    setStore({ foundationDetail: data })
                } catch (error) {
                    console.error("Error in get detail user")
                }
            },
            getClinicDetail: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/clinic/info`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in get clinic detail")
                    }
                    const data = await response.json();
                    setStore({ clinicDetail: data })
                } catch (error) {
                    console.error(error);
                }
            },
            resetAuxPicture: () => {
                setStore({ auxPicture: null })
            },
            getSinglePetFromFoundation: async (pet_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }

                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/${pet_id}`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in pet of foundation")
                    }
                    const data = await response.json();
                    setStore({ foundationPet: data })
                } catch (error) {
                    console.error("Error in get info pet")
                }
            },
            transferPetFromFundation: async (user_email, pet_id, history) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email_user: user_email,
                        id_pet: pet_id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/transfer`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in transfer a pet")
                    }

                    history.push("/foundation/pets")
                } catch (error) {
                    console.error("the has been some error in transfer")
                }
            },
            getHistoryUserPet: async (pet_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in get history of pet")
                    }
                    const data = await response.json();
                    setStore({ historyUserPet: data })
                } catch (error) {
                    console.error("Error in get info pet")
                }
            },
            getSinglePetFromUser: async (pet_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in pet of user")
                    }
                    const data = await response.json();
                    setStore({ userPet: data })
                } catch (error) {
                    console.error("Error in get info pet")
                }
            },
            addVaccinetoPetUser: async (date, lot, name, laboratory, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        lot: lot,
                        name: name,
                        laboratory: laboratory
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/vaccine/add`, opt)
                    if (response.status !== 200) {
                        console.error("there is some error in post vaccine pet")
                    }

                    actions.getHistoryUserPet(pet_id);
                } catch (error) {
                    console.error("the has been some error in post vaccine")
                }
            },
            addVaccinetoPetFoundation: async (date, lot, name, laboratory, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        lot: lot,
                        name: name,
                        laboratory: laboratory
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/${pet_id}/history/vaccine/add`, opt)
                    if (response.status !== 200) {
                        console.error("there is some error in post vaccine pet")
                    }

                    actions.getHistoryPetFoundation(pet_id);
                } catch (error) {
                    console.error("the has been some error in post vaccine")
                }
            },
            addDiagnostictoPetUser: async (date, diagnostic, doctor_name, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        diagnostic: diagnostic,
                        doctor_name: doctor_name

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/diagnostic/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post diagnostic pet")
                    }

                    actions.getHistoryUserPet(pet_id);
                } catch (error) {
                    console.error("the has been some error in post diagnostic")
                }
            },
            addDiagnostictoPetFoundation: async (date, diagnostic, doctor_name, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        diagnostic: diagnostic,
                        doctor_name: doctor_name

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/${pet_id}/history/diagnostic/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post diagnostic pet")
                    }

                    actions.getHistoryPetFoundation(pet_id);
                } catch (error) {
                    console.error("the has been some error in post diagnostic")
                }
            },
            addSurgerytoPetUser: async (date, description, doctor_name, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        description: description,
                        doctor_name: doctor_name

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/surgery/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post surgery pet")
                    }

                    actions.getHistoryUserPet(pet_id);


                } catch (error) {
                    console.error("the has been some error in post surgery")
                }
            },
            addSurgerytoPetFoundation: async (date, description, doctor_name, pet_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: date,
                        description: description,
                        doctor_name: doctor_name

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/${pet_id}/history/surgery/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post surgery pet")
                    }

                    actions.getHistoryPetFoundation(pet_id);
                } catch (error) {
                    console.error("the has been some error in post surgery")
                }
            },
            getPetsFoundationWithOwner: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/owned`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in pets with owned")
                    }
                    const data = await response.json();
                    setStore({ petsWithOwner: data })
                } catch (error) {
                    console.error("There has been an error in get pets WO")
                }
            },
            getPetsInAdoption: async () => {
                try {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/pets/in_adoption/1")
                    if (response.status !== 200) {
                        console.log("Error in get pets in adoption")
                    }
                    const data = await response.json();
                    
                    setStore({ petsInAdoption: data })
                } catch (error) {
                    console.log("Error " + error)
                }
            },
            getHistoryPetFoundation: async (pet_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/${pet_id}/history`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in het history PF")
                    }
                    const data = await response.json();
                    setStore({ historyFoundationPet: data })

                } catch (error) {
                    console.error("There has been an error in get history")
                }
            },
            userReportPetLost: async (pet_id, last_location) => {
                const actions = getActions();
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        last_location: last_location

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/report/lost`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in report lost pet")
                    }
                    /* const data = await response.json(); */
                    //aqií cargar lista de mascotas perdidas
                    actions.getMascotasUser();
                    actions.getHistoryUserPet(pet_id);
                    actions.getLostPets();
                } catch (error) {
                    console.error("There has been an error in report lost")
                }
            },
            getLostPets: async () => {
                try {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/pets/lost/1")
                    if (response.status !== 200) {
                        console.log("Error in get pets in adoption")
                    }
                    const data = await response.json();
                    
                    setStore({ lostPets: data })
                } catch (error) {
                    console.log("Error " + error)
                }
            },
            userReportPetFounded: async (pet_id) => {
                const actions = getActions();
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/report/founded`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in report founded pet")
                    }
                    const data = await response.json();
                    console.log(data);
                    //aqií cargar lista de mascotas perdidas
                    actions.getMascotasUser();
                    actions.getHistoryUserPet(pet_id);
                    actions.getLostPets();


                } catch (error) {
                    console.error("There has been an error in report founded")
                }
            },
            getEdad: (dateString) => {
                let hoy = new Date()
                let fechaNacimiento = new Date(dateString)
                let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
                let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
                if (
                    diferenciaMeses < 0 ||
                    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())

                ) {
                    edad--
                    diferenciaMeses = 12 + diferenciaMeses;
                }

                return "Años: " + edad + "  Meses: " + diferenciaMeses
            },
            registerDoctor: async (email,name,lastname,specialty,password) =>{
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        lastname: lastname,
                        specialty: specialty,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                //console.log(opt.body);
                //console.log(store.token);
                const response = await fetch(`${store.baseUrl}api/clinic/doctor/register`, opt)
                if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                return data;
            },
        }
    };
}
export default getState;