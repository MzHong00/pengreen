

export function Button({ handler, componentImg, urlImg, name, btnClass = '', containerClass = '' }) {

    return (
        <div className={`flex ${containerClass}`}>
            <button
                className={`flex justify-center items-center rounded-3xl gap-1 hover:bg-zinc-200${btnClass}`}
                onClick={handler}>
                {urlImg &&
                    <img src={urlImg} alt="사용자" className={`w-8 h-8 rounded-full`} />
                }
                {componentImg && <span>{componentImg()}</span>}
                {name && <span>{name}</span>}
            </button>
        </div>
    )
}

export function ListButton({ handler, componentImg, urlImg, name, btnClass = '', containerClass = '' }) {

    return (
        <button className={`hover:bg-zinc-200 ${containerClass}`} onClick={handler}>
            <div className={`flex items-center rounded-3xl gap-3 ${btnClass}`}>

                {urlImg &&
                    <img src={urlImg} alt="사용자" className={`w-8 h-8 rounded-full`} />
                }
                {componentImg && <span>{componentImg()}</span>}
                {name && <span>{name}</span>}
            </div>
        </button>
    )
}

export function LogoButton({ handler, logo, btnClass = '', nameClass = '' }) {

    return (
        <div>
            <button
                className={`flex justify-center items-center rounded-3xl ${btnClass}`}
                onClick={handler}>

                {
                    logo !== undefined && <span>{logo()}</span>
                }
                <span className={`font-bold text-2xl text-cyan-300 ${nameClass}`}>pengreen</span>
            </button>
        </div>
    )
}

export function LoginButton({ handler, logo, name, btnClass = '', containerClass = '' }) {

    return (
        <div className={`flex justify-center w-full ${containerClass}`}>
            <button
                className={`flex justify-center items-center p-2 gap-4 rounded-3xl ${btnClass}`}
                onClick={handler}>

                {logo !== undefined && <span>{logo()}</span>}
                {name !== undefined && <span>{name}계정으로 로그인</span>}
            </button>
        </div>
    )
}
