"use client";

import Loading from "../loading";

import { usePathname } from "next/navigation";
import classNames from "classnames";
import React from "react";
import { useAuthContext } from "@/context/auth-context";

export default function Warrper({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  const pathname = usePathname();

  const isSignInOrSignUp = pathname === "/signin" || pathname === "/signup";

  return (
    <div
      className={classNames("", isSignInOrSignUp ? "h-screen" : "pt-[48px]")}
    >
      {user || isSignInOrSignUp ? (
        children
      ) : (
        <>
          <div className="flex h-screen items-center justify-center">
            <Loading />
          </div>
        </>
      )}
    </div>
  );
}
