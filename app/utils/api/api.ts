import { environment } from "@/app/environment/environment.client";
import { supabase } from "@/app/lib/supabase/client";
import axios from "axios";

export const api = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true, // Set to false if you don't want to use site cookies
});

// Interceptor for inject supabase token
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});
