"use client";
import Link from "next/link";
import Container from "../container";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import SheetHamburger from "../sheet-hamburger";
import SearchInput from "../search-input";
import { useMediaQuery } from "react-responsive";

import DiaLog from "../dialog";
import ToggleDarkMode from "../toggle-dark-mode";

export default function Navigation() {
  const { user, logout, setUser } = useAuthStore();
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      router.push("/signin");
    });
  };

  return (
    <>
      {user && (
        <header className="border-white-a08 fixed left-0 top-0 z-20   w-full border-b backdrop-blur-[12px]">
          <Container className=" flex h-[48px] items-center justify-between px-4 md:px-2 lg:px-0">
            <nav className=" hidden sm:block">
              <ul className="flex h-full items-center justify-start">
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
            </nav>
            <SheetHamburger className="sm:hidden" />
            {isMobile && <DiaLog elementTrigger={<SearchInput />} />}

            <div>
              <Button variant={"destructive"} size="sm" onClick={handleLogout}>
                Sign out
              </Button>
            </div>
          </Container>
        </header>
      )}
    </>
  );
}
