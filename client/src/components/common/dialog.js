import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "./button";

export default function Dialog({ contentsComponent, setModalOpen }) {
    const modalOutside = useRef();

    const closeIcon = () => <IoMdClose size={`30`} />
    const closeModal = () => {
         setModalOpen(false)
    }

    //모달창 영역 밖을 클릭하면 모달창을 닫음
    const clickModalOutside = (e) => {
        e.target === modalOutside.current && closeModal();
    }

    //모달창 X버튼을 클릭하면 모달창을 닫음
    const clickCloseBtn = () => {
        closeModal()
    }

    return (
        <div className="w-fit">
            <div className={`fixed top-1/2 left-1/2 shadow-lg rounded-3xl overflow-hidden gap-10 z-50 transform -translate-x-1/2 -translate-y-1/2`}>
                <Button
                    componentImg={closeIcon}
                    handler={clickCloseBtn}
                    containerStyles={'absolute right-5 top-4'} />
                {contentsComponent()}
            </div>
            <div onClick={clickModalOutside} ref={modalOutside} className={`fixed left-0 top-0 w-full h-full bg-black/40`} />
        </div>
    )
}