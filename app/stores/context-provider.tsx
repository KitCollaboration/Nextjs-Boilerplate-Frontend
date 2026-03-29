"use client";
import { use, useState } from "react";

import { AppContext, IAppContext } from "./application.context";
import { IUser } from "../shared/types/user";

export default function WebContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loadingDesc, setLoadingDesc] = useState<string>("");
  const state: IAppContext = {
    isLoading,
    setIsLoading,
    currentUser,
    setCurrentUser,
    loadingDesc,
    setLoadingDesc,
  };
  return (
    <>
      <AppContext.Provider value={state}>{children}</AppContext.Provider>
    </>
  );
}
