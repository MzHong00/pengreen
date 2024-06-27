import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type CreateFormDataSlice, createFormDataSlice } from "entities/voteCreateForm";

// ...a 는 create의 set get 모두 전달
export const useGlobalStore = create<CreateFormDataSlice>()(
  devtools(
    (...args) => ({
      ...createFormDataSlice(...args),
    }),
    { name: "global-store" }
  )
);