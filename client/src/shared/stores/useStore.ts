import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ChoiceSlice, createChoiceSlice } from "entities/voteForm";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create<ChoiceSlice>()(
  devtools(
    (...args) => ({
      ...createChoiceSlice(...args),
    }),
    { name: "global-store" }
  )
);
