"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormAuth from "./form-auth";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { AiOutlineGoogle } from "react-icons/ai";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function CardWithForm({
  type,
}: {
  type: "sign-in" | "sign-up";
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const isSignIn = pathname === "/signin";
  const title = isSignIn ? "Login" : "Sign Up";

  const { signInWithGooglePopup } = useAuthStore();

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>
          {pathname === "/signin"
            ? "Sign in to your account to continue."
            : "Sign up for a new account."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <FormAuth type={type} />
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">Or login with</span>
          </div>
        </div>
        <Button
          className="mt-4 w-full"
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            signInWithGooglePopup()
              .then(() => {
                setIsLoading(false);
                router.push("/");
              })
              .catch((err) => {
                setIsLoading(false);
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          {isLoading && (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
          {!isLoading && (
            <>
              <AiOutlineGoogle className="mr-2 h-4 w-4" /> Login with Google
            </>
          )}
        </Button>
      </CardContent>

      <CardFooter>
        <div className="flex items-center text-sm">
          {isSignIn ? (
            <>
              <span className="text-gray-400">Do not have an account?</span>
              <Button asChild variant="link">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          ) : (
            <>
              <span className="text-gray-400">Already have an account?</span>
              <Button asChild variant="link">
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
