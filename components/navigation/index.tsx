"use client";
import Link from "next/link";
import Container from "../container";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { user, logout, setUser } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      router.push("/signin");
    });
  };

  console.log("user", user);

  return (
    <>
      {user && (
        <header className="border-white-a08 fixed left-0 top-0 z-20   w-full border-b backdrop-blur-[12px]">
          <Container className="h-[48px]">
            <nav className="flex h-full items-center justify-between">
              <ul className="flex items-center justify-start">
                <li className="">
                  <Button asChild variant={"link"}>
                    <Link href="/">Home</Link>
                  </Button>
                </li>
                <li className="">
                  <Button asChild variant={"link"}>
                    <Link href="product">Product</Link>
                  </Button>
                </li>
                <li className="">
                  <Button asChild variant={"link"}>
                    <Link href="profile">Profile</Link>
                  </Button>
                </li>
              </ul>
              <div>
                <Button
                  variant={"destructive"}
                  size="sm"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </div>
            </nav>
          </Container>
        </header>
      )}
    </>
  );
}
