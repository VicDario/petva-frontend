const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
           

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
           loginClinica : ()=>{
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
