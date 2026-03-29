"use client";
import { createContext, type Dispatch, type SetStateAction } from "react";
import { IUser } from "../shared/types/user";

export interface IAppContext {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  loadingDesc: string;
  setLoadingDesc: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<IAppContext>({
  isLoading: false,
  setIsLoading: () => undefined,
  currentUser: null,
  setCurrentUser: () => undefined,
  loadingDesc: "",
  setLoadingDesc: () => undefined,
});
