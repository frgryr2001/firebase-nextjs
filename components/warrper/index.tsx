"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Loading from "../loading";

import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function Warrper({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
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
