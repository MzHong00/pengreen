import { useRef, type ReactNode, type MouseEvent } from 'react';
import { IoMdClose } from "react-icons/io";

export const useDialog = (
    children: () => ReactNode
): [ReactNode, () => void] => {
    const dialogRef = useRef<any>(null);

    const openHandler = () => dialogRef.current.showModal();
    const closeHandler = (e: MouseEvent<HTMLElement>) => e.target === e.currentTarget && dialogRef.current.close();

    const JsxElement = (
        <dialog ref={dialogRef} onClick={closeHandler} className="border rounded-2xl">
            <div className='p-4'>
                <div className='flex flex-row-reverse'>
                    <IoMdClose onClick={closeHandler as any} className='cursor-pointer'/>
                </div>
                {children()}
            </div>
        </dialog>
    )

    return [JsxElement, openHandler]
}