import { useRef, type MouseEvent, type DialogHTMLAttributes } from "react";
import { IoMdClose } from "react-icons/io";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  setIsOpen: (args: boolean) => void;
}

export const Dialog = ({ setIsOpen, children, className, ...props }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeHandler = (e: MouseEvent<SVGElement | HTMLDialogElement>) =>{
    e.target === e.currentTarget && dialogRef.current?.close();
    setIsOpen(false);
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={closeHandler}
      className={`rounded-2xl ${className}`}
      {...props}
    >
      <div className="p-4">
        <div className="flex flex-row-reverse">
          <IoMdClose onClick={closeHandler} className="cursor-pointer" />
        </div>
        {children}
      </div>
    </dialog>
  );
};
