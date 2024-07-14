import {
  type KeyboardEvent,
  type ChangeEvent,
  useState,
} from "react";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import { Button } from "shared/ui/Button";

import styles from "./setChoice.module.css";

interface Props {
  choiceList: string[];
  setChoiceList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AddChoice = ({ choiceList, setChoiceList }: Props) => {
  const [addText, setAddText] = useState<string>("");

  const createChoiceHandler = () => {
    if(!addText) return
    if(choiceList.includes(addText)) console.log("중복처리");

    setChoiceList((prev) => [...new Set([...prev, addText])]);
    setAddText("");
  };
  const onChangeAddText = (event: ChangeEvent<HTMLInputElement>) => {
    setAddText(event.target.value);
  };

  const onEnterKeyDownCreate = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createChoiceHandler();
    }
  };

  return (
    <div className={styles.choiceContainer}>
      <Button onClick={createChoiceHandler}>
        <FaPlus className="cursor-pointer" color="#0099FF" size="18" />
      </Button>
      <input
        placeholder="항목"
        value={addText}
        className={styles.choiceInput}
        onChange={onChangeAddText}
        onKeyDown={onEnterKeyDownCreate}
      />
    </div>
  );
};
