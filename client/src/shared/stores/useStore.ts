import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type ToggleSlice, createModalOpenSlice } from "./createModalOpenSlice";

// ...a 는 create의 set get 모두 전달
export const useStore = create<ToggleSlice>()(
  devtools((...a) => ({
    ...createModalOpenSlice(...a),
  }))
);
