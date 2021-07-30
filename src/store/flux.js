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
            baseUrl: 'https://petva-backend.herokuapp.com/', //https://petva-backend-dev.herokuapp.com/
            foundationPet: null,
            historyUserPet: null,
            userPet: null,
            petsWithOwner: null,
            petsInAdoption: null,
            historyFoundationPet: null,
            lostPets: null,
            hoursReserved: null,
            clinicsList: null,
            doctorsList: null,
            clinicDoctor: null,
            doctorReservations: null,
            doctorDetail: null,
            userReservations: null,
            doctorReservationsReserved: null,
            doctorHours: null,
            infoPet: null,
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
            registerUser: async (email, name, lastname, phone, password) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        lastname: lastname,
                        phone: phone,
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
                ////console.log(response.status);
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
                return response;
            },
            loginFoundation: async (email, password, history) => {
                const store = getStore();
                const actions = getActions();
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
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "foundation")
                    setStore({ userType: "foundation" });
                    setStore({ token: data.access_token });
                    actions.getFoundationDetail();
                    history.push("/foundation");
                }
                return response;
            },
            loginClinic: async (email, password, history) => {
                const store = getStore();
                const actions = getActions();
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
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "clinic")
                    setStore({ userType: "clinic" });
                    setStore({ token: data.access_token });
                    actions.getClinicDetail();
                    history.push("/clinic");
                }
                return response;
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
                    /* //console.log(data); */
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
                    //console.log(data);
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
                    const response = await fetch(`${store.baseUrl}/api/user/info`, opt)
                    if (response.status !== 200) {
                        console.error("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    //console.log(data)
                    setStore({ userDetail: data })
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
                        console.error("There is a some error in get foundation detail")
                    }
                    const data = await response.json();
                    setStore({ foundationDetail: data })
                } catch (error) {
                    console.error("Error in get detail foundation")
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

                    history.push("/foundation/pets/tracking")
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
            getPetsInAdoption: async (numberPage) => {
                try {
                    const store=getStore();
                    const response = await fetch(`${store.baseUrl}/api/pets/in_adoption/${numberPage}`)
                    if (response.status !== 200) {
                        //console.log("Error in get pets in adoption")
                    }
                    const data = await response.json();

                    setStore({ petsInAdoption: data })
                } catch (error) {
                    //console.log("Error " + error)
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
                    actions.getLostPets();
                    actions.getHistoryUserPet(pet_id);
                    actions.getSinglePetFromUser(pet_id);
                } catch (error) {
                    console.error("There has been an error in report lost")
                }
            },
            getLostPets: async (pageNumber) => {
                try {
                    const store=getStore();
                    const response = await fetch(`${store.baseUrl}/api/pets/lost/${pageNumber}`)
                    if (response.status !== 200) {
                        //console.log("Error in get pets in adoption")
                    }
                    const data = await response.json();

                    setStore({ lostPets: data })
                } catch (error) {
                    //console.log("Error " + error)
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
                    //console.log(data);
                    //aqií cargar lista de mascotas perdidas
                    actions.getMascotasUser();
                    actions.getHistoryUserPet(pet_id);
                    actions.getLostPets();
                    actions.getSinglePetFromUser(pet_id);
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
            updateUserDetail: async (email, name, lastname, phone, picture, password) => {
                const store = getStore()
                const actions = getActions();
                const opt = {
                    method: "PUT",
                    body: JSON.stringify({
                        email: email,
                        name: name,
                        lastname: lastname,
                        phone: phone,
                        picture: picture,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}/api/user/info`, opt)
                    if (response.status !== 202) {
                        console.error("There is a some error in update user")
                    }
                    const data = await response.json();
                    if (data) setStore({ userDetail: data })
                    actions.getUserDetail();
                } catch (error) {
                    console.error("Error in update" + error)
                }
            },
            getClinicsList: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/clinics/list`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in get list of clinics")
                    }
                    const data = await response.json();
                    //console.log(data);
                    //aquí setear lista de clinicas
                    setStore({ clinicsList: data })
                } catch (error) {
                    console.error("There has been an error" + error)
                }
            },
            getDoctorsList: async (clinic_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/clinics/${clinic_id}/doctors`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in get list of doctors")
                    }
                    const data = await response.json();
                    //console.log(data);
                    //aquí setear lista de clinicas
                    setStore({ doctorsList: data })

                } catch (error) {
                    console.error("There has been an error" + error)
                }
            },
            getDoctorReservations: async (clinic_id, doctor_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/clinics/${clinic_id}/doctor/${doctor_id}/reservations`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in get list of reservations")
                    }
                    const data = await response.json();
                    //console.log(data);
                    setStore({ doctorReservations: data })

                } catch (error) {
                    console.error("There has been an error" + error)
                }
            }
            ,
            getClinicDoctor: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/clinic/doctor/`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in get clinic doctors")
                    }
                    const data = await response.json();
                    //console.log(data);
                    setStore({ clinicDoctor: data })
                } catch (error) {
                    console.error("There has been an error in get clinic doctors")
                }
            },
            registerDoctor: async (email, name, lastname, specialty, password) => {
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
                ////console.log(opt.body);
                ////console.log(store.token);
                const response = await fetch(`${store.baseUrl}api/clinic/doctor/register`, opt)
                if (response.status !== 201) throw new Error(response.status, "error");
                const data = await response.json();
                return data;
            },
            bookAppointment: async (pet_id, reservation_id, clinic_id, doctor_id) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        id_pet: pet_id,
                        id_reservation: reservation_id
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/clinics/${clinic_id}/doctor/${doctor_id}/reservation/add`, opt)
                    if (response.status !== 201) {
                        console.error("There has been some error in post reservation")
                    }
                    const data = await response.json();
                    //console.log(data);
                    setStore({ clinicDoctor: data })
                    actions.getDoctorReservations(clinic_id, doctor_id)
                } catch (error) {
                    console.error("Error: " + error)
                }
            },
            getHoursReservations: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/clinic/check/reservations`, opt)
                    if (response.status !== 200) {
                        throw new Error("There has been some error in get hours reserved")
                    }
                    const data = await response.json();
                    setStore({ hoursReserved: data })
                    return data;
                } catch (error) {
                    console.error(error + "There has been an error in get hours reserved")
                }
            },
            deleteDoctor: async (doctor_id) => {
                const actions = getActions();
                const store = getStore();
                const opt = {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                const response = await fetch(`${store.baseUrl}api/clinic/doctor/${doctor_id}`, opt)
                //console.log(response);
                //if (response.status !== 200) throw new Error(response.status, "error");
                const data = await response.json();
                //console.log(data);

                if (data) {
                    actions.getClinicDoctor();
                }
                return data;
            },
            updateReservation: async (reservation_id, status) => {
                const store = getStore();
                const opt = {
                    method: "PUT",
                    body: JSON.stringify({
                        status,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                const response = await fetch(`${store.baseUrl}api/clinic/reservations/${reservation_id}/change`, opt)
                const data = await response.json();
                //console.log(data);
                return response;
            },
            loginDoctor: async (email, password, history) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                const response = await fetch(`${store.baseUrl}api/doctor/login`, opt);
                const data = await response.json();
                if (data.access_token) {
                    localStorage.setItem("petvaToken", data.access_token);
                    localStorage.setItem("petvaUser", "doctor")
                    setStore({ userType: "doctor" });
                    setStore({ token: data.access_token });
                    actions.getDoctorDetail();
                    history.push("/doctor");
                }
                return response;
            },
            userGetReservations: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/reservations`, opt)
                    if (response.status !== 200) {
                        throw new Error("There has been some error in get hours reserved")
                    }
                    const data = await response.json();
                    setStore({ userReservations: data })
                    return data;
                } catch (error) {
                    console.error(error + "There has been an error in get hours reserved")
                }
            },
            userCancelReservation: async (id_reservation) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/user/reservations/${id_reservation}/cancel`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in delete reservation")
                    }
                    const data = await response.json();
                    //console.log(data);
                    actions.userGetReservations();

                } catch (error) {
                    console.error("Error: " + error)
                }
            },
            getDoctorDetail: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/doctor/info`, opt)
                    if (response.status !== 200) {
                        console.error("There has been some error in get doctor detail")
                    }
                    const data = await response.json();
                    setStore({ doctorDetail: data })
                } catch (error) {
                    console.error(error);
                }
            },
            userPutPet : async(name,code_chip,breed,picture,pet_id)=>{
                const store = getStore()
                const actions = getActions();
                const opt = {
                    method: "PUT",
                    body: JSON.stringify({
                        name: name,
                        code_chip: code_chip,
                        breed: breed,
                        picture: picture
                        
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    //fundacion//console.log(opt);
                    ////console.log("arriba lo que se manda")
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}`, opt)
                    if (response.status !== 202)
                    {
                        console.error("There is a some error in update pet")
                    }
                    const data = await response.json();
                    //console.log(data);
                    actions.getSinglePetFromUser(pet_id);
                    // eslint//console.log(response);
                    ////console.log("arriba esta el response");
                    return response
                    
                } catch (error)
                {
                    console.error("Error in update" + error)
                }
            },
            userDeletePet: async (pet_id,history) => {
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}`, opt)
                    if (response.status !== 203)
                    {
                        console.error("There has been some error in delete pet")
                    }
                    const data = await response.json();
                    //console.log(data);
                    actions.getMascotasUser();
                    history.push("/user/pets")
                    

                } catch (error)
                {
                    console.error("Error: " + error)
                }
            },
            foundationPutInfo: async (name, address, phone, email, picture, password) => {
                const store = getStore()
                const actions = getActions();
                const opt = {
                    method: "PUT",
                    body: JSON.stringify({
                        name: name,
                        address: address,
                        phone: phone,
                        email:email,
                        picture: picture,
                        password: password

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/foundation/info`, opt)
                    if (response.status !== 202)
                    {
                        console.error("There is a some error in update pet")
                    }
                    const data = await response.json();
                    //console.log(data);
                    actions.getFoundationDetail();


                } catch (error)
                {
                    console.error("Error in update" + error)
                }
            },
            formatDateB : (date) => {

                let event = new Date(date)
                event = event.toLocaleDateString()
                return event
            },
            formatTime : (date)=>{
                let event = new Date(date)
                const opt ={timeZone : "UTC"}
                event = event.toLocaleTimeString('es-CL',opt,{ hour:"2-digit", minute : "2-digit" })
                return event
            },
            doctorAddReservation: async (hour_start, hour_end) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        hour_start: hour_start,
                        hour_end: hour_end
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                const response = await fetch(`${store.baseUrl}api/doctor/reservations/add`, opt);
                return response;
            },
            doctorGetReservationsReserved : async()=>{
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/doctor/reservations/reserved`, opt)
                    if (response.status !== 200)
                    {
                        console.error("There has been some error in get doctor reservations")
                    }
                    const data = await response.json();
                    //console.log(data);
                    setStore({ doctorReservationsReserved: data })
                } catch (error)
                {
                    console.error(error);
                }
            },
            doctorGetReservations : async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/doctor/reservations`, opt)
                    if (response.status !== 200)
                    {
                        console.error("There has been some error in get doctor reservations")
                    }
                    const data = await response.json();
                    setStore({ doctorHours: data })
                    return data
                } catch (error)
                {
                    console.error(error);
                }
            },
            doctorUpdateReservation: async (id_reservation, status) => {
                const store = getStore();
                const opt = {
                    method: "PUT",
                    body: JSON.stringify({
                        status,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                const response = await fetch(`${store.baseUrl}api/doctor/reservations/${id_reservation}/change`, opt);
                return response;
            },
            getInfoPetForDoctor : async(pet_id)=>{
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/doctor/attending/${pet_id}`, opt)
                    if (!response.ok)
                    {
                        console.error("There has been some error in get doctor reservations")
                    }
                    const data = await response.json();
                    setStore({ infoPet: data })
                } catch (error)
                {
                    console.error(error);
                }
            },
            addVaccineToPet: async (pet_id, vaccine) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: vaccine.date,
                        lot: vaccine.lot,
                        name: vaccine.name,
                        laboratory: vaccine.laboratory
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/doctor/attending/${pet_id}/history/vaccine/add`, opt)
                    if (!response.ok) {
                        console.error("There is some error in post vaccine pet")
                    }
                    return response
                } catch (error) {
                    console.error("The has been some error in post vaccine")
                }
            },
            addDiagnosticToPet: async (pet_id, diagnostic) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: diagnostic.date,
                        diagnostic: diagnostic.description,
                        doctor_name: diagnostic.doctor
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/doctor/attending/${pet_id}/history/diagnostic/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post diagnostic pet")
                    }
                    return response;
                } catch (error) {
                    console.error("the has been some error in post diagnostic")
                }
            },
            addSurgeryToPet: async (pet_id, surgery) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date: surgery.date,
                        description: surgery.description,
                        doctor_name: surgery.doctor

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try {
                    const response = await fetch(`${store.baseUrl}api/doctor/attending/${pet_id}/history/surgery/add`, opt)
                    if (response.status !== 201) {
                        console.error("there is some error in post surgery pet")
                    }
                    return response;

                } catch (error) {
                    console.error("the has been some error in post surgery")
                }
            },
            checkToken: async(token) => {
                const store = getStore();
                const opt = {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
                
                const response = await fetch(`${store.baseUrl}api/check/`, opt)
                return response;
            }
        },
    }
};

export default getState;