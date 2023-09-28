import { Button } from "@/components/ui/button";
import { auth, db } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import { signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "@/components/HabitForm";

const DashBoard = () => {
  const router = useRouter();

  return (
    <>
      <header className="bg-primary text-primary-foreground flex justify-between items-center px-4 py-3">
        <h1 className="text-3xl font-bold">Habit Hub</h1>
        <Button
          variant={"destructive"}
          onClick={() => {
            void signOut(auth)
              .then(() => router.push("/"))
              .catch((err) => console.error(err));
          }}
        >
          Sign Out
        </Button>
      </header>
      <main className="h-screen">
        <div className="grid place-content-center bg-secondary text-secondary-foreground h-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Habit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Habit Addition</DialogTitle>
                <DialogDescription>Description</DialogDescription>
              </DialogHeader>
              <ProfileForm />
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </>
  );
};

export default DashBoard;
