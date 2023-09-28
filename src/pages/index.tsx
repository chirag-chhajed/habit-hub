import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/router";
import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";

const dbInstance = collection(db, "user");

const LandingPage = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  useEffect(() => {
    console.log(user, "store");
  }, [user]);
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);

      // console.log(res.user);
      const q = query(dbInstance, where("user_id", "==", res.user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await addDoc(dbInstance, {
          displayName: res.user.displayName!,
          email: res.user.email!,
          photoURL: res.user.photoURL!,
          user_id: res.user.uid!,
        })
          .then((res) => console.log(res, "User added to document"))
          .catch((err) => console.log(err));
      } else {
        console.log("User already exists");
      }
      setUser({
        displayName: res.user.displayName!,
        email: res.user.email!,
        photoURL: res.user.photoURL!,
        user_id: res.user.uid!,
      });
      console.log(user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col place-content-center items-center justify-center gap-4 bg-slate-400">
      <h1 className="text-4xl font-bold text-slate-800">
        Hello this is the landing page
      </h1>
      <Button
        onClick={() => void googleLogin()}
        // className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          className="mr-2 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
        </svg>
        Log in with Google
      </Button>
    </div>
  );
};

export default LandingPage;
