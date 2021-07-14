const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNjI5MTI4NywianRpIjoiMWE3NjE1ODgtMDNlNS00NjhkLWI4NTgtMmNhMzc4ZTdlZGVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImRhcmlvY29udHJlZmFzY0BnbWFpbC5jb20iLCJuYmYiOjE2MjYyOTEyODcsImV4cCI6MTYyNjI5NDg4N30.aXnVekb-VBi9e8ib4o57bzB3QUVEhqr_tBArjASnMg4"

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
           },
           getMascotasUser : async()=>{
               const store = getStore();
                const opt ={
                   headers :{
                        "Authorization": "Bearer " + store.token
                   }
               }
               try{
                   const response = await fetch("https://petva-backend-dev.herokuapp.com/api/user/pets",opt)
                   if(response.status !== 200){
                       console.log("There has been some error")
                   }
                   const data = await response.json();
                   console.log({data})
               }catch(error){
                    console.log("There has been an error in get pets")
               }
               
           }
        }



    };
};

export default getState;
