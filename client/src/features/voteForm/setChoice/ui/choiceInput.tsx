import {
  type HTMLAttributes,
  type KeyboardEvent,
  useRef,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

interface Props extends HTMLAttributes<HTMLInputElement> {
  text: string;
}

export const ChoiceInput = ({ text, ...props }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInput] = useState(text);

  useEffect(() => {
    // text prop이 변경될 때 inputText 상태를 업데이트
    setInput(text);
  }, [text]);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const changeChoiceByEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      value={inputText}
      onChange={inputHandler}
      onKeyDown={changeChoiceByEnterKey}
      placeholder="항목"
      {...props}
    />
  );
};
