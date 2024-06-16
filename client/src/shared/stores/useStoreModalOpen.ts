import { create } from "zustand";

interface ToggleState {
  isModalOpen: boolean | undefined;
  setModalOpen: () => void;
}

export const useStoreModalOpen = create<ToggleState>()((set) => ({
  isModalOpen: false,
  setModalOpen: () =>
    set((state) => ({ isModalOpen: state.isModalOpen ? false : true })),
}));
