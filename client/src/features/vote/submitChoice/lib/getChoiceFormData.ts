import { type MouseEvent } from "react";

export const getChoiceFormData = (event: MouseEvent<HTMLInputElement>) => {
  event.preventDefault();

  let selectedChoice: Array<string> = [];

  const pickInputList = Array.from(event.currentTarget.form!.children[1].children);
  pickInputList.forEach((e: any) => {
    if (e.children[0].checked) {
      const pickText = e.children[1].innerText;
      selectedChoice.push(pickText);
    }
  });

  return selectedChoice;
};
