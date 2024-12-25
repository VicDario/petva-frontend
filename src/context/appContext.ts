import { AppContext} from "@interfaces/appState";
import { createContext } from "react";

export const Context = createContext<AppContext>({} as AppContext);
