import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";

export default function SheetHamburger({ className }: { className?: string }) {
  const [openSheet, setOpenSheet] = useState(false);
  return (
    <>
      <Sheet
        open={openSheet}
        onOpenChange={(value) => {
          setOpenSheet(value);
        }}
      >
        <SheetTrigger className={className}>
          <span>
            <HamburgerMenuIcon />
          </span>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              <nav className="w-full">
                <ul className="flex h-full w-full flex-col">
                  <li className="block w-full">
                    <Button
                      asChild
                      variant={"ghost"}
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    >
                      <Link href="/" className="w-full">
                        Home
                      </Link>
                    </Button>
                  </li>
                  <li className="">
                    <Button
                      asChild
                      variant={"ghost"}
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    >
                      <Link href="product" className="w-full">
                        Product
                      </Link>
                    </Button>
                  </li>
                  <li className="">
                    <Button
                      asChild
                      variant={"ghost"}
                      onClick={() => {
                        setOpenSheet(false);
                      }}
                    >
                      <Link href="profile" className="w-full">
                        Profile
                      </Link>
                    </Button>
                  </li>
                </ul>
              </nav>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
