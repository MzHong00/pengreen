import { useState, type ChangeEvent, type KeyboardEvent } from "react";

import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { useGlobalStore } from "shared/stores/useStore";
import { Button } from "shared/ui/Button";

export const AddChoice = () => {
  const choiceData = useGlobalStore((state) => state.formData.choice);
  const addFormChoice = useGlobalStore((state) => state.addFormChoice);
  const [choice, setChoice] = useState("");

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setChoice(event.currentTarget.value);
  };

  const addItem = () => {
    //빈칸 or 중복이라면 choice를 추가하지 않음
    if (!choice || choiceData.includes(choice)) return;

    addFormChoice(choice);
    setChoice("");
  };

  const addItemByEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className={`flex h-10 items-center text-sm gap-3 focus:text-blue-400`}>
      <Button>
        <FaPlus
          className="cursor-pointer"
          color="#0099FF"
          size="18"
          onClick={addItem}
        />
      </Button>
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
