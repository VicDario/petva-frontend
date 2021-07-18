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
            baseUrl: 'https://petva-backend-dev.herokuapp.com/', //https://petva-backend-dev.herokuapp.com/
            foundationPet: null,
            historyUserPet : null,
            userPet : null,
            petsWithOwner: null,
            petsInAdoption : null
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
                try {
                    const response = await fetch(`${store.baseUrl}api/clinic/register`, opt);
                    if (response.status !== 201) throw new Error(response.status, "error");
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error("Error from loading message from backend", error);
                }
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
                try {
                    const response = await fetch(`${store.baseUrl}api/user/login`, opt);
                    //if (response.status !== 201) throw new Error(response.status, "error");
                    const data = await response.json();
                    console.log(data.access_token);
                    /* if (data.access_token) sessionStorage.setItem("token", data.access_token) */
                    if (data.access_token) {
                        localStorage.setItem("petvaToken", data.access_token);
                         localStorage.setItem("petvaUser", "normal") 
                        setStore({ userType: "normal" });
                        setStore({ token: data.access_token });
                        history.push("/user");
                    }
                } catch (error) {
                    console.error("Error from loading message from backend", error);
                }
            },
            loginFundation: async (email, password) => {
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
                try {
                    const response = await fetch(`${store.baseUrl}api/foundation/login`, opt);
                    //if (response.status !== 200) throw new Error(response.status, "error");
                    const data = await response.json();
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("petvaToken", data.access_token);
                        localStorage.setItem("petvaUser", "foundation")

                        setStore({ userType: "foundation" });
                        setStore({ token: data.access_token });
                        console.log("Iniciada sesion de fundacion");
                        /* history.push("/user") */
                    }
                } catch (error) {
                    console.error("Error from loading message from backend", error);
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
                        console.log("There has been some error")
                    }
                    const data = await response.json();
                    console.log(data)
                    setStore({ pets: data })

                } catch (error) {
                    console.log("There has been an error in get pets")
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
                        console.log("There has been some error")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ pets: data })

                } catch (error) {
                    console.log("There has been an error in get pets")
                }
            },
            registerPet: async (name, chip_code, birth_date, specie, breed, picture) => {
                const store = getStore();
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
                    console.log(response.status + " " + response.ok);
                } catch (error) {
                    console.log(`Register pet error ${error}`)
                }
            },
            registerPetFundation: async (name, chip_code, birth_date, specie, breed, picture) => {
                const store = getStore();
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
                        console.log("there is some error in registerPet")
                    }
                    const data = await response.json();
                    console.log(data)
                } catch (error) {
                    console.log("the has been some error in register pet")
                }
            },
            syncTokenFromSessionStore: () => {
                const store = getStore();
                store.token = localStorage.getItem("petvaToken")
                store.userType = localStorage.getItem("petvaUser")
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
                localStorage.setItem("petvaToken", null)
                localStorage.setItem("petvaUser", null)


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
                        console.log("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    console.log(data);
                    if (data) setStore({ userDetail: data })
                } catch (error) {
                    console.log("Error in get detail user")
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
                        console.log("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ foundationDetail: data })
                } catch (error) {
                    console.log("Error in get detail user")
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
                        console.log("There is a some error in pet of foundation")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ foundationPet: data })
                } catch (error) {
                    console.log("Error in get info pet")
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
                        console.log("there is some error in transfer a pet")
                    }
                    const data = await response.json();
                    console.log(data)
                    history.push("/foundation/pets")
                } catch (error) {
                    console.log("the has been some error in transfer")
                }
            },
            getHistoryUserPet : async (pet_id)=>{
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history`, opt)
                    if (response.status !== 200)
                    {
                        console.log("There is a some error in get history of pet")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ historyUserPet: data })
                } catch (error)
                {
                    console.log("Error in get info pet")
                }
            },
            getSinglePetFromUser: async (pet_id) => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}`, opt)
                    if (response.status !== 200)
                    {
                        console.log("There is a some error in pet of user")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ userPet: data })
                } catch (error)
                {
                    console.log("Error in get info pet")
                }
            },
            addVaccinetoPetUser : async (date,lot,name,laboratory,pet_id)=>{
                const store = getStore();
                const actions = getActions();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        date:date,
                        lot:lot,
                        name:name,
                        laboratory:laboratory
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/vaccine/add`, opt)
                    if (response.status !== 200)
                    {
                        console.log("there is some error in post vaccine pet")
                    }
                    const data = await response.json();
                    console.log(data)
                    actions.getHistoryUserPet(pet_id);

                   
                } catch (error)
                {
                    console.log("the has been some error in post vaccine")
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
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/diagnostic/add`, opt)
                    if (response.status !== 201)
                    {
                        console.log("there is some error in post diagnostic pet")
                    }
                    const data = await response.json();
                    console.log(data)
                    actions.getHistoryUserPet(pet_id);


                } catch (error)
                {
                    console.log("the has been some error in post diagnostic")
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
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/${pet_id}/history/surgery/add`, opt)
                    if (response.status !== 201)
                    {
                        console.log("there is some error in post surgery pet")
                    }
                    const data = await response.json();
                    console.log(data)
                    actions.getHistoryUserPet(pet_id);


                } catch (error)
                {
                    console.log("the has been some error in post surgery")
                }
            },
            getPetsFoundationWithOwner : async ()=>{
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/foundation/pets/owned`, opt)
                    if (response.status !== 200)
                    {
                        console.log("There has been some error in pets with owned")
                    }
                    const data = await response.json();
                    console.log(data);
                    setStore({ petsWithOwner: data })

                } catch (error)
                {
                    console.log("There has been an error in get pets WO")
                }
            },
            getPetsInAdoption :async ()=>{
                try{
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/pets/in_adoption")
                    if (response.status !== 200){
                        console.log("Error in get pets in adoption")
                    }
                    const data = await response.json();
                    console.log(data)
                    setStore({petsInAdoption:data})
                }catch (error){
                    console.log("Error "+ error )
                }
            }

        }
    };
}
export default getState;