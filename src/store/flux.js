const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
           token : "sdfsdfsdfsdf"

        },
        actions: {
           registerClinica : (email,name,address,phone,password)=>{
            const opt ={
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    name: name,
                    address: address,
                    phone:phone,
                    password: password
                }),
                headers:{
                    "Content-Type": "application/json"
                }
            }
                fetch("https://petva-backend-dev.herokuapp.com/api/clinic/register",opt)
               .then(resp =>resp.json())
               .then(data =>{
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

           loginClinica : (email,password)=>{
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
           }
        }



    };
};

export default getState;
