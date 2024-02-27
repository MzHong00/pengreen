

export default function ProfilesButton({ handler, componentImg, urlImg, name, btnClass = '', containerClass = '' }) {

    return (
        <div className={`flex justify-center rounded-3xl hover:bg-zinc-200 hover:outline outline-zinc-200 ${containerClass}`}>
            <button
                className={`flex justify-center items-center rounded-3xl gap-2 ${btnClass}`}
                onClick={handler}>
                    {urlImg && 
                        <img src={urlImg} alt="" className={`w-8 h-8 rounded-full`}/>
                    }
                    {componentImg && <span>{componentImg()}</span>}
                    {name && <span>{name}</span>}
            </button>
        </div>
    )
}