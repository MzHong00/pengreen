import { useRef, type ReactNode, type MouseEvent } from "react";
import { IoMdClose } from "react-icons/io";

/*
    arg:
    children: dialog에 표시될 내용물
    return:
    [
        JsxElement: dialog 내용물 
        usage) 아무 곳에 <div>{JsxElement}</div>
        openHandler: dialog를 열기 위한 핸들러 함수 
        usage) button 등의 객체 onClick함수에 장착
    ]
*/

export const useDialog = (
  children: ReactNode,
  tailwindColor?: string
): [ReactNode, () => void] => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openHandler = () => dialogRef.current?.showModal();
  const closeHandler = (e: MouseEvent<HTMLElement>) =>
    e.target === e.currentTarget && dialogRef.current?.close();

  const JsxElement = (
    <dialog
      ref={dialogRef}
      onClick={closeHandler}
      className={`rounded-2xl ${tailwindColor}`}
    >
      <div className="p-4">
        <div className="flex flex-row-reverse">
          <IoMdClose onClick={closeHandler as any} className="cursor-pointer" />
        </div>
        {children}
      </div>
    </dialog>
  );

  return [JsxElement, openHandler];
};
