import { ApiError } from "@/app/shared/types/api";
import axios from "axios";

export const AxiosErrorExtract = (error: unknown): ApiError | null => {
  if (!axios.isAxiosError(error)) {
    return null;
  }

  const response = error.response;
  if (!response || !response.data) {
    return null;
  }
  const status = response.status ?? 500;
  const apiError = response.data as ApiError;
  const translatedMessage = ParsedErrorMessage(status, apiError);
  return {
    ...apiError,
    error: {
      ...apiError.error,
      message: translatedMessage,
      status,
    },
  };
};

export const FieldErrorExtract = (apiError: ApiError): string => {
  const errorMap: Record<string, string> = {
    INVALID_CREDENTIALS: "Invalid User Data",
    STOCK_CANT_BE_NEGATIVE: "Quantity can't set lower than 0",
    REACH_MEMBER_LIMIT: "You Have Reached Member Limit",
  };

  const fieldError = apiError.error ? apiError.error.field : null;
  if (
    !fieldError ||
    typeof fieldError !== "object" ||
    Object.keys(fieldError).length <= 0
  ) {
    return "Internal Server Error";
  }
  const concateMsg = Object.keys(fieldError).reduce(
    (acc: string, key: string) => {
      const keyError = fieldError[key];
      const translatedMessage = errorMap[keyError] ?? "Internal Server Error";
      const concat = `${translatedMessage} `;
      return acc + concat;
    },
    "",
  );
  return concateMsg;
};

export const ParsedErrorMessage = (
  status: number,
  apiError: ApiError,
): string => {
  switch (status) {
    case 401:
      return "User Credentials Invalid";
    case 403:
      return FieldErrorExtract(apiError) ?? "Denied by Web Server";
    case 409:
      return FieldErrorExtract(apiError) ?? "";
    default:
      return FieldErrorExtract(apiError) ?? "Network Connection Failed";
  }
};
