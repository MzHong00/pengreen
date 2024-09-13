import { ChoiceDto } from "entities/vote/choice";
import { StateCreator } from "zustand";

export interface ChoiceSlice {
  choiceList: ChoiceDto["content"][];
  setChoiceList: (newChoiceList: ChoiceDto["content"][]) => void;
}

export const createChoiceSlice: StateCreator<
  ChoiceSlice,
  [],
  [],
  ChoiceSlice
> = (set) => ({
  choiceList: [],
  setChoiceList: (newChoiceList) => set(() => ({ choiceList: newChoiceList })),
});
