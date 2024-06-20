import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { type ToggleState, toggleModalSlice } from "./toggleModalSlice";

// ...a 는 create의 set get 모두 전달
export const useStore = create<ToggleState>()(
  devtools(
    (...a) => ({
      ...toggleModalSlice(...a),
    }),
    { name: "global-store" }
  )
);
