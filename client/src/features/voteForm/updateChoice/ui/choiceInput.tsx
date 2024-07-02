import {
  type HTMLAttributes,
  type KeyboardEvent,
  useRef,
  useState,
  ChangeEvent,
} from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  text: string;
}

export const ChoiceInput = ({ text, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInput] = useState(text);

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onKeyDownInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      value={inputText}
      onChange={onChangeInputHandler}
      onKeyDown={onKeyDownInputHandler}
      placeholder={text}
      {...props}
    />
  );
};
