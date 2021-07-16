const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            userType: null,
            pets: null,
            user: null,
            auxPicture: null,
            baseUrl: 'https://petva-backend-dev.herokuapp.com/', //https://petva-backend-dev.herokuapp.com/
        },
        actions: {
            registerClinica: (email, name, address, phone, password) => {
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
                fetch(`${store.baseUrl}api/clinic/register`, opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },

            registerUser: (email, name, lastname, password) => {
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
                fetch(`${store.baseUrl}/api/user/register`, opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },

            loginUser: (email, password, history) => {
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
                fetch(`${store.baseUrl}api/user/login`, opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.access_token);
                        /* if (data.access_token) sessionStorage.setItem("token", data.access_token) */
                        if (data.access_token){
                            localStorage.setItem("petvaToken", data.access_token)
                            localStorage.setItem("petvaUser", "normal")
                            setStore({ token: data.access_token })
                            history.push("/user")
                        }
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            loginFundation: (email, password) => {
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
                fetch(`${store.baseUrl}api/fundation/login`, opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.access_token) localStorage.setItem("petvaToken", data.access_token)
                        if (data.access_token) localStorage.setItem("petvaUser", "foundation")

                        if (data.access_token) setStore({ token: data.access_token })
                        if (data.access_token) console.log("Iniciada sesion de fundacion")
                        /* if (data.access_token) history.push("/user") */
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            getMascotasUser: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": `Bearer ${store.token}`
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets`, opt)
                    if (response.status !== 200)
                    {
                        console.log("There has been some error")
                    }
                    const data = await response.json();
                    console.log(data)
                    setStore({ pets: data })

                } catch (error)
                {
                    console.log("There has been an error in get pets")
                }

            },
            registerPet: async (name, chip_code, birth_date, specie, breed, picture) => {
                const store = getStore();
                const opt = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        chip_code: chip_code,
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
                try
                {
                    const response = await fetch(`${store.baseUrl}api/user/pets/add`, opt);
                    if (!response.ok)
                    {
                        throw new Error(`Status: ${response.status}`);
                    }
                    //const data = await response.json();
                    console.log(response.status + " " + response.ok);
                } catch (error)
                {
                    console.log(`Register pet error ${error}`)
                }
            },
            registerPetFundation: async (name, birth_date, specie) => {
                const store = getStore();
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        birth_date: birth_date,
                        specie: specie
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch(`${store.baseUrl}api/fundation/pets/add`, opt)
                    if (response.status !== 201)
                    {
                        console.log("there is some error in registerPet")
                    }
                    const data = await response.json();
                    console.log(data)
                } catch (error)
                {
                    console.log("the has been some error in register pet")
                }
            },
            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                if (token && token !== undefined) setStore({ token: token });
            },
            registerFundation: (email, name, address, phone, password) => {
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
                fetch(`${store.baseUrl}api/fundation/register`, opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            logOut: () => {
                const store = getStore()
                setStore({ ...store, token: null })
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
            getUserDetail: () => {

            },
            resetAuxPicture: () => {
                setStore({ auxPicture: null })
            }
        }
    };
}
export default getState;