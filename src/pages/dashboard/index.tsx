import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";

const DashBoard = () => {
  const router = useRouter();
  return (
    <div className="grid place-content-center h-screen gap-8">
      <p className="text-4xl font-bold text-primary">Dashboard</p>
      <Button
        onClick={() => {
          void signOut(auth);
          router.push("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default DashBoard;
