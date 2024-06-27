import { useState, ChangeEvent, KeyboardEvent } from "react";

import { FaPlus } from "react-icons/fa6";
import { useGlobalStore } from "shared/stores/useStore";

export const AddChoice = () => {
  const addFormChoice = useGlobalStore((state) => state.addFormChoice);
  const [choice, setChoice] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setChoice(event.currentTarget.value);
  };

  const addItem = () => {
    //빈칸이면 choice를 추가하지 않음
    if (!choice) return;

    addFormChoice(choice);
    setChoice("");
  };

  const addItemByEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div
      className={`flex h-10 items-center text-sm gap-3 focus:text-blue-400`}
    >
      <FaPlus
        className="cursor-pointer"
        color="#0099FF"
        size="18"
        onClick={addItem}
      />
      <input
        value={choice}
        onChange={changeHandler}
        onKeyDown={addItemByEnterKey}
        placeholder="새 항목"
        className="w-full bg-inherit outline-none focus:text-blue-500"
      />
    </div>
  );
};
