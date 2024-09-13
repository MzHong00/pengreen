import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useGlobalStore } from "shared/stores/useStore";

export const useAddChoice = () => {
  const [newChoice, setNewChoice] = useState<string>("");
  const { choiceList, setChoiceList } = useGlobalStore();

  const addChoice = () => {
    if (!newChoice) return;
    if (choiceList.includes(newChoice)) console.log("중복처리");

    setChoiceList([...new Set([...choiceList, newChoice])]);
    setNewChoice("");
  };

  const onChangeNewChoice = (event: ChangeEvent<HTMLInputElement>) => {
    setNewChoice(event.target.value);
  };

  const addChoiceByEnterKeyHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addChoice();
    }
  };

  return {
    newChoice: newChoice,
    addChoice: addChoice,
    addChoiceByEnterKey: addChoiceByEnterKeyHandler,
    onChangeNewChoice: onChangeNewChoice,
  };
};

export const useSetChoiceList = () => {
  const { choiceList, setChoiceList } = useGlobalStore();

  const removeChoiceHandler = (event: MouseEvent<HTMLButtonElement>) => {
    const selectedIndex = parseInt(`${event.currentTarget.dataset.index}`);
    choiceList.splice(selectedIndex, 1);

    setChoiceList(choiceList);
  };

  const updateChoiceHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const selectedIndex = parseInt(`${event.currentTarget.dataset.index}`);
      const inputText = event.currentTarget.value;
      choiceList.splice(selectedIndex, 1, inputText);

      if (
        choiceList.includes(inputText) &&
        choiceList[selectedIndex] !== inputText
      )
        console.log("중복처리");

      setChoiceList([...new Set(choiceList)]);
      event.currentTarget?.blur();
    }
  };

  return {
    choiceList: choiceList,
    removeChoice: removeChoiceHandler,
    updateChoice: updateChoiceHandler,
  };
};

export const useSwapItemsByDrag = () => {
  const { choiceList, setChoiceList } = useGlobalStore();

  const onDragEnd = (args: DropResult) => {
    const dragIndex = args.source.index;
    const dropIndex = args.destination?.index;

    if (!dropIndex) return;

    const dragIndexValue = choiceList[dragIndex]
    choiceList.splice(dragIndex, 1)
    choiceList.splice(dropIndex, 0, dragIndexValue)

    setChoiceList(choiceList);
  };

  return {
    onDragEnd: onDragEnd,
  };
};
