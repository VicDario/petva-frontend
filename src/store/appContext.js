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
            /* state.actions.getUserDetail();
            state.actions.getFoundationDetail(); */
            state.actions.getPetsInAdoption();
            state.actions.getLostPets();
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
