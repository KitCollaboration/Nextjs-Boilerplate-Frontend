import { ApiError } from "@/app/shared/types/generic";
import { redirect } from "next/navigation";

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
