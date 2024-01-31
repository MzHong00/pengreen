const ListButton = ({
    handler,
    componentImg,
    urlImg,
    name,
    contentStyles = '',
    btnStyles = '',
    containerStyles = '',
}) => 
    <div className={`flex ${containerStyles}`}>
        <button 
            className={`flex items-center w-full h-full hover:bg-zinc-200 ${btnStyles}`} 
            onClick={handler}>
            <div className={`flex items-center rounded-3xl text-sm text-gray-800 gap-3 ${contentStyles}`}>
                {urlImg &&
                    <img src={urlImg} alt="사용자" className={`w-8 h-8 rounded-full`} />
                }
                {componentImg && <span>{componentImg()}</span>}
                {name && <span>{name}</span>}
            </div>
        </button>
    </div>

export default ListButton;