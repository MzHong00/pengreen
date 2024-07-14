import { type MouseEvent, type KeyboardEvent } from "react";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";

import { Button } from "shared/ui/Button";

import styles from "./setChoice.module.css";

interface Props {
  choiceList: string[];
  setChoiceList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SetChoice = ({ choiceList, setChoiceList }: Props) => {
  const removeChoiceHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const selectedIndex = parseInt(`${event.currentTarget.dataset.index}`);
    const newData = [...choiceList];
    newData.splice(selectedIndex, 1);

    setChoiceList(newData);
  };

  const onEnterKeyDownUpdate = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const selectedIndex = parseInt(`${event.currentTarget.dataset.index}`);
      const newData = [...choiceList];
      const inputText = event.currentTarget.value;
      newData.splice(selectedIndex, 1, inputText);

      if (
        choiceList.includes(inputText) &&
        choiceList[selectedIndex] !== inputText
      )
        console.log("중복처리");

      setChoiceList([...new Set(newData)]);
      event.currentTarget?.blur();
    }
  };

  return (
    <>
      {choiceList.map((choice, idx) => (
        <div className={styles.choiceContainer} key={choice}>
          <Button data-index={idx} onClick={removeChoiceHandler}>
            <IoMdClose color="red" size={18} />
          </Button>
          <input
            name="choice"
            defaultValue={choice}
            data-index={idx}
            className={styles.choiceInput}
            onKeyDown={onEnterKeyDownUpdate}
          />
        </div>
      ))}
    </>
  );
};
