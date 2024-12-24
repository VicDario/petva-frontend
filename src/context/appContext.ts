import { AppState } from "@interfaces/appState";
import { createContext } from "react";

export const Context = createContext<AppState>({});
