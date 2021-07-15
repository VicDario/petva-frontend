const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {


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
            loginUser: async (email,password) => {
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
                    const response = await (await fetch("https://petva-backend-dev.herokuapp.com/api/user/login",opt));
                    //if (response.status!==200) throw new Error("Error login user");
                    const data = await response.json();
                    
                    localStorage.setItem("access_token", data.access_token);
                } catch (error) {
                    console.log("Error from loading message from backend", error);
                }
                
                
            },
            loginClinica: () => {
                const opt = {
                    method: "POST",
                    body: JSON.stringify({
                        email: "d.jacobpulgar@gmail.com",
                        password: "qwerty123"
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
            }
        }



    };
};

export default getState;
