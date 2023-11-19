"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthErrorHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.error === "invalid-version") signOut();
  }, [router, session]);

  return <>{children}</>;
};
