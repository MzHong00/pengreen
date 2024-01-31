import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";

export default function Dialog({ contentsComponent, setModalOpen, dialogStyles, outsideStyles }) {
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
        <div>
            <div className={`p-5 m-3 shadow-lg rounded-3xl overflow-hidden gap-10 z-50 ${dialogStyles}`}>
                <Button
                    componentImg={closeIcon}
                    handler={clickCloseBtn}
                    containerStyles={'absolute right-5'} />
                {contentsComponent()}
            </div>
            <div onClick={clickModalOutside} ref={modalOutside} className={`fixed left-0 top-0 w-full h-full ${outsideStyles}`} />
        </div>
    )
}