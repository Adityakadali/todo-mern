import create from "zustand";

const useUserStore = create((set) => ({
  userid: null,
  username: null,
  todos: null,
  setuser: (name, id) => set((state) => ({ username: name, userid: id })),
  setTodos: (todos) => set((state) => ({ todos: todos })),
  logout: () => set((state) => ({ username: null, userid: null })),
}));

export default useUserStore;
