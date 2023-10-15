"use client";
import { AccountForm } from "@/components/account-form";
import Container from "@/components/container";
import { getUserProfileDocument } from "@/config/firebase";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [userDocument, setUserDocument] = useState<any>();

  useEffect(() => {
    if (user) {
      const getUserDocument = async () => {
        await getUserProfileDocument(user.uid).then((userDocument) => {
          setUserDocument({
            ...userDocument,
            uid: user.uid,
          });
        });
      };
      getUserDocument();
    }
  }, [user]);
  return (
    <Container className="mt-10">
      <div className="mx-auto w-1/2">
        {userDocument && <AccountForm updateData={userDocument} />}
      </div>
    </Container>
  );
}
