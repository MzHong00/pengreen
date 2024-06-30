import { StateCreator } from "zustand";

import { formatToLocalISO8601 } from "shared/utils/formatToLocalISO8601";
import { VoteForm } from "./types";

export interface VoteFormSlice {
  formData: VoteForm;
  setFormData: (props: Partial<VoteForm>) => void;
  addFormChoice: (props: string) => void;
}

export const createFormDataSlice: StateCreator<
  VoteFormSlice,
  [],
  [],
  VoteFormSlice
> = (set) => ({
  formData: {
    title: "",
    choice: [],
    max_choice: 1,
    start_time: formatToLocalISO8601(new Date()),
    like: [],
    participant: [],
    category: [],
    description: "",
  },
  setFormData: (props) =>
    set((state) => ({
      formData: { ...state.formData, ...props },
    })),
  addFormChoice: (props) =>
    set((state) => ({
      formData: {
        ...state.formData,
        choice: [...state.formData.choice, props],
      },
    })),
});
