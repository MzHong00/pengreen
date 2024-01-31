
export default function LoginButton({ handler, logo, name, btnClass = '', containerClass = '' }) {

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
