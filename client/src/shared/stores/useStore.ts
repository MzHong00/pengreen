import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type VoteFormSlice, createFormDataSlice } from "entities/voteForm";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create<VoteFormSlice>()(
  devtools(
    (...args) => ({
      ...createFormDataSlice(...args),
    }),
    { name: "global-store" }
  )
);