

export default function LoginButton({ loginHandler, logo, platform }) {

    return (
        <button
            className="flex justify-center"
            onClick={loginHandler}
        >
            <span>{logo()}</span>
            <span>{platform}계정으로 로그인하기</span>
        </button>
    )
}