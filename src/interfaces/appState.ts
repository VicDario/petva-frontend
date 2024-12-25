import { User } from "./user.interface";

export interface AppState {
  token?: string;
  user?: User;
}

export interface AppContext {
  state: AppState;
  setUser: (payload: User) => void;
  setToken: (payload: string) => void;
}
