import {
  type ChangeEvent,
  type HTMLAttributes,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

interface Props extends HTMLAttributes<HTMLDivElement> {
  setText: Dispatch<SetStateAction<string>>;
}

export const SearchBar = ({ setText, ...props }: Props) => {
  const onChangeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div {...props}>
      <FaSearch size={17} />
      <input onChange={onChangeTextHandler} placeholder="검색" />
    </div>
  );
};
