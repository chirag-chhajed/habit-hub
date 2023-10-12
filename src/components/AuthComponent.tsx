/* eslint-disable react-hooks/exhaustive-deps */
import { type User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { publicPages, privatePages } from "@/utils/pages";
import { useUserStore } from "@/store/useUserStore";

const AuthComponent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  let currentPath = router.pathname;
  const { setUser } = useUserStore();
  // auth.currentUser
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await new Promise<User | null>((resolve, reject) => {
          onAuthStateChanged(
            auth,
            (user) => {
              resolve(user);
            },
            reject
          );
        });

        if (user) {
          console.log("logged in");
          setUser({
            displayName: user.displayName!,
            email: user.email!,
            photoURL: user.photoURL!,
            user_id: user.uid,
          });
          if (publicPages.includes(currentPath)) {
            void router.push("/dashboard");
          }
        } else {
          console.log("user is logged out");

          if (privatePages.includes(currentPath)) {
            console.log("user is logged out");

            void router.push("/");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    void fetchData();
  }, []);

  return <div>{children}</div>;
};

export default AuthComponent;
