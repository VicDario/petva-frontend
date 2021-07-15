const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            pets: null,
            auxPicture: null,
            userDetail : null,
            fundationDetail: null
        },
        actions: {
            registerClinica: (email, name, address, phone, password) => {
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
                fetch("https://petva-backend-dev.herokuapp.com/api/clinic/register", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },

            registerUser: (email, name, lastname, password) => {
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
                fetch("https://petva-backend-dev.herokuapp.com/api/user/register", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },

            loginUser: (email, password, history) => {
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
                fetch("https://petva-backend-dev.herokuapp.com/api/user/login", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.access_token);
                        /* if (data.access_token) sessionStorage.setItem("token", data.access_token) */
                        if (data.access_token) localStorage.setItem("token", data.access_token)
                        if (data.access_token) localStorage.setItem("usertype", "normal")
                        if (data.access_token) setStore({ token: data.access_token })
                        if (data.access_token) history.push("/user")
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            loginFundation: (email, password) => {
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
                fetch("https://petva-backend-dev.herokuapp.com/api/fundation/login", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if (data.access_token) localStorage.setItem("token", data.access_token)
                        if (data.access_token) localStorage.setItem("usertype", "fundation")

                        if (data.access_token) setStore({ token: data.access_token })
                        if (data.access_token) console.log("fundacion iniciada sesion ")
                        /* if (data.access_token) history.push("/user") */
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            getMascotasUser: async () => {

                const opt = {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
                try
                {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/user/pets", opt)
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
                    method: "POST",
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
                        "Authorization": "Bearer " + store.token
                    }
                }
                try
                {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/user/pets/add", opt)
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
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/fundation/pets/add", opt)
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
                fetch("https://petva-backend-dev.herokuapp.com/api/fundation/register", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            logOut: () => {
                const store = getStore()
                setStore({ ...store, token: null })
            },
            convertImgToBase64: (file) => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    setStore({ auxPicture: reader.result })
                };
            },
            getUserDetail: async () => {
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
                try{
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/user/info",opt)
                    if(response.status !== 200){
                        console.log("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    console.log(data);
                    if(data) setStore({userDetail:data})
                }catch(error){
                    console.log("Error in get detail user")
                }
            },
            getFundationDetail: async () => {
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }
                try
                {
                    const response = await fetch("https://petva-backend-dev.herokuapp.com/api/fundation/info", opt)
                    if (response.status !== 200)
                    {
                        console.log("There is a some error in get user detail")
                    }
                    const data = await response.json();
                    console.log(data);
                    if (data) setStore({ fundationDetail: data })
                } catch (error)
                {
                    console.log("Error in get detail user")
                }
            },
            resetAuxPicture: () => {
                setStore({ auxPicture: null })
            }
        }
    };

   }
      export default getState;
