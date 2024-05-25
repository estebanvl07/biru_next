import { CircularProgress } from "@nextui-org/progress";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading
      if (session) router.push("/account"); // Redirect to home if authenticated
    }, [session, status, router]);

    if (status === "loading" || session) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <Spinner size="lg" color="primary" />
          <span className="mt-2 text-lg">Cargando...</span>
        </div>
      ); // Show loading while checking session
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
