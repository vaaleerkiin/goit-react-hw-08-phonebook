"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const UnauthenticatedHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "invalid-version") signOut();
  }, [session]);

  return <>{children}</>;
};
