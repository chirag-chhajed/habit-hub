import { create } from "zustand";

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  user_id: string;
}

const initalState: User = {
  displayName: "",
  email: "",
  photoURL: "",
  user_id: "",
};

type UserStore = {
  user: User;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: initalState,
  setUser: (user: User) => set({ user }),
}));
