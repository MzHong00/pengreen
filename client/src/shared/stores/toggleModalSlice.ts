import { StateCreator } from "zustand";

export interface ToggleState {
  isModalOpen: boolean | undefined;
  setModalOpen: () => void;
}

export const toggleModalSlice: StateCreator<
  ToggleState,
  [],
  [],
  ToggleState
> = (set) => ({
  isModalOpen: false,
  setModalOpen: () =>
    set((state) => ({ isModalOpen: state.isModalOpen ? false : true })),
});
