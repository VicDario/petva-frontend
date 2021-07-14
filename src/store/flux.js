const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: ""

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

            loginUser: (email, password,history) => {
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
                        if(data.access_token) sessionStorage.setItem("token", data.access_token)
                        if(data.access_token) setStore({token: data.access_token})
                        if(data.access_token) history.push("/user")
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            loginClinica: (email, password) => {
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
                fetch("https://petva-backend-dev.herokuapp.com/api/clinic/login", opt)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Error from loading message from backend", error))
            },
            getMascotasUser: async () => {
                const store = getStore();
                const opt = {
                    headers: {
                        "Authorization": "Bearer " + store.token
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
                    console.log({ data })
                } catch (error)
                {
                    console.log("There has been an error in get pets")
                }

            }
        }
    }




};

export default getState;
