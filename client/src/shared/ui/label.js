export default function Label({
    name,
    contentStyles = '',
    containerStyles = '',
}) {

    return (
        <div className={`flex justify-center items-center rounded-3xl gap-1 ${containerStyles}`}>
            <div className={`${contentStyles}`}>
                {name && <span>{name}</span>}
            </div>
        </div>
    )
}    