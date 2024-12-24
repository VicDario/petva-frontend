import { User } from "./user.interface";

export interface AppState {
  token?: string;
  user?: User;
}
