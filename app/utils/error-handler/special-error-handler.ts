import { ApiError } from "@/app/shared/types/api";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

let isAuthRedirecting = false;

export function handleRedirectError(error: ApiError, router: any) {
  if (isAuthRedirecting) return;

  isAuthRedirecting = true;
  const errorCode = error.error.status;
  if (errorCode === 401) {
    redirect("/en/auth/login");
  } else if (errorCode === 402) {
    redirect("/en/subscription/error");
  }
}

export function resetAuthDebouce() {
  isAuthRedirecting = false;
}
