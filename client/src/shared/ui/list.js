export default function List({
    handler,
    componentImg,
    urlImg,
    name,
    contentStyles = '',
    listStyles = '',
}) {
    
    return (
        <div
            className={`w-full h-full px-1 flex items-center cursor-pointer ${listStyles}`}
            onClick={handler}>
            <div className={`flex items-center text-sm text-gray-800 gap-3 ${contentStyles}`}>
                {urlImg &&
                    <img src={urlImg} alt="Icon" className={`w-8 h-8 rounded-full`} />
                }
                {componentImg && <span>{componentImg()}</span>}
                {name && <span>{name}</span>}
            </div>
        </div>
    )
}