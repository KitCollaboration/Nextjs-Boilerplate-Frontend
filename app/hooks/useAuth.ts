import { AxiosResponse } from "axios";
import { ISingleResponse } from "../shared/types/generic";
import { environment } from "../environment/environment.client";
import { api } from "../utils/api/api";

export const useAuth = () => {
  const getMe = async (): Promise<AxiosResponse<ISingleResponse<any>>> => {
    return api.post(`${environment.apiUrl}/auth/me`, {});
  };
  return { getMe };
};
