import { type ReactNode } from "react";

interface Props {
    handler?: (event: React.MouseEvent<HTMLElement>) => void;
    componentImg?: () => ReactNode;
    urlImg?: string;
    text?: string;
    contentStyles?: string;
    btnStyles?: string;
}

export const Button = ({
    handler,
    componentImg,
    urlImg,
    text,
    contentStyles = '',
    btnStyles = '',
}: Props) =>
    <button className={`rounded-lg ${btnStyles}`} onClick={handler}>
        <div className={`flex justify-center items-center ${contentStyles}`}>
            {urlImg && <img src={urlImg} alt="사용자" className={`w-8 h-8 rounded-full`} />}
            {componentImg && <span>{componentImg()}</span>}
            {text && <span>{text}</span>}
        </div>
    </button>
