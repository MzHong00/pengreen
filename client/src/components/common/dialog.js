import { useRef } from "react";

export default function Dialog({ contentsComponent, setModalOpen, dialogStyle }) {
    const modalOutside = useRef();

    const clickModalOutside = (e) => {
        //모달창 영역 밖을 클릭하면 모달창을 닫는 핸들러
        e.target === modalOutside.current && (setModalOpen(false))
    }

    return (
        <div>
            <div className={`${dialogStyle} p-5 m-3 shadow-lg rounded-3xl overflow-hidden gap-10 z-50`}>
                {contentsComponent()}
            </div>
            <div onClick={clickModalOutside} ref={modalOutside} className="absolute left-0 top-0 w-full h-full" />
        </div>
    )
}