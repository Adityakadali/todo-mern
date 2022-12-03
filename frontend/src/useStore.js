import create from "zustand";

const useUserStore = create((set) => ({
  username: null,
  setuser: (username) => set((state) => ({ username: username })),
  logout: () => set((state) => ({ username: null })),
}));

export default useUserStore;
