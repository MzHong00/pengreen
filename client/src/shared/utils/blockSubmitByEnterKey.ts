import { KeyboardEvent } from "react";

export function blockSubmitByEnterKey(e: KeyboardEvent<HTMLInputElement>) {
  if (e.key === "Enter") e.preventDefault();
}
