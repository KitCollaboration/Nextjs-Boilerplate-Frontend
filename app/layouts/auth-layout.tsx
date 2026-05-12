"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "../stores/application.context";
import { toast } from "react-toastify";
import { LuLoaderCircle } from "react-icons/lu";
import { AxiosErrorExtract } from "../utils/error-handler/error-extracter";
import { handleRedirectError } from "../utils/error-handler/special-error-handler";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, currentUser, loadingDesc, setCurrentUser, setIsLoading } =
    useContext(AppContext);
  const { getMe } = useAuth();
  const router = useRouter();
  const checkAuthHanlder = async () => {
    try {
      setIsLoading(true);
      const { data } = await getMe();
      const userData = data.data;
      setCurrentUser({ ...userData });
    } catch (error) {
      const errors = AxiosErrorExtract(error);
      if (errors) {
        handleRedirectError(errors, router);
      } else {
        toast.error("Server Connection Errors");
      }
      router.replace("/en/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthHanlder();
  }, []);

  if (!currentUser) {
    return <></>;
  }
  return (
    <>
      {isLoading && (
        <>
          <div className="w-full h-[100dvh] absolute top-0 left-0 flex flex-col justify-center items-center bg-black/30 z-50">
            <LuLoaderCircle className="text-[3rem] text-white animate-spin" />
            <p className="font-semibold text-white">{loadingDesc}</p>
          </div>
        </>
      )}
      {children}
    </>
  );
}
