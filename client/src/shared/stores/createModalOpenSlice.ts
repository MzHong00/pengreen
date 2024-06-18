import { StateCreator } from "zustand";

export interface ToggleSlice {
  isModalOpen: boolean | undefined;
  setModalOpen: () => void;
}

export const createModalOpenSlice: StateCreator<
  ToggleSlice,
  [],
  [],
  ToggleSlice
> = (set) => ({
  isModalOpen: false,
  setModalOpen: () =>
    set((state) => ({ isModalOpen: state.isModalOpen ? false : true })),
});
