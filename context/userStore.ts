import { create } from "zustand";
import { Models } from "react-native-appwrite";

type TUserStore = {
  user: Models.Document | null;
  isLogged: boolean;
  setUser: (user: Models.Document | null) => void;
  setIsLogged: (value: boolean) => void;
};

const useUserStore = create<TUserStore>((set) => ({
  user: null,
  isLogged: false,

  setUser: (user) => set({ user }),

  setIsLogged: (value) => set({ isLogged: value }),
}));

export default useUserStore;
