import { VoteData } from "entities/vote/model/types";
import { StateCreator } from "zustand";

export interface CreateFormDataSlice {
  formData: VoteData;
  setFormData: (props: Partial<VoteData>) => void;
  addFormChoice: (props: string) => void;
}

export const createFormDataSlice: StateCreator<
  CreateFormDataSlice,
  [],
  [],
  CreateFormDataSlice
> = (set) => ({
  formData: {
    title: "",
    choice: [],
    max_choice: 1,
    start_time: new Date(),
    deadline: new Date(),
    like: [],
    participant: [],
    category: [],
    hashtag: [],
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
