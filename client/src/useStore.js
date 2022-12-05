import create from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  username: null,
  setuser: (username, id) =>
    set((state) => ({ username: username, userid: id })),
  logout: () => set((state) => ({ username: null, userid: null })),
}));

export default useUserStore;
