import { createContext, useEffect, useState } from "react";
import getState from "./flux";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updateStore) =>
                    setState({
                        store: Object.assign(state.store, updateStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        useEffect(() => {
<<<<<<< HEAD
            state.actions.getMascotasUser()
=======
            state.store.token = localStorage.getItem("petvaToken")
            state.store.userType = localStorage.getItem("petvaUser")
>>>>>>> 99431939b2f9c145a22832bc3681d8cf52b02d1c
        }, [])

        return (
            <Context.Provider value={state}>
                <PassedComponent />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
