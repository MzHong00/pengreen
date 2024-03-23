interface Props {
    handler: (event: React.MouseEvent<HTMLElement>) => void;
    componentImg?: () => React.ReactNode;
    urlImg?: string;
    name?: string ;
    contentStyles?: string;
    btnStyles?: string;
}

const Button = ({
    handler,
    componentImg,
    urlImg,
    name,
    contentStyles = '',
    btnStyles = '',
}: Props) =>
        <button
            className={`rounded-lg ${btnStyles}`}
            onClick={handler}>
            <div className={`flex justify-center items-center ${contentStyles}`}>
                {urlImg && <img src={urlImg} alt="사용자" className={`w-8 h-8 rounded-full`} />}
                {componentImg && <span>{componentImg()}</span>}
                {name && <span>{name}</span>}
            </div>
        </button>

export default Button;