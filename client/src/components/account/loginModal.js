import LoginButton from "../common/loginButton";
import { FcGoogle } from "react-icons/fc";

export default function LoginModal({ loginHanler, platform }) {

    const googleLogo = () => {

        return (
            <FcGoogle size="20"/>
        )
    }

    return (
        <div className="top-0 fixed flex items-center justify-center w-full h-full bg-black/60">
            <div className="flex flex-col p-5 w-112 h-160 bg-white shadow-lg rounded-3xl overflow-hidden gap-2">
                <form>
                    <input type="text" id="email" placeholder="아이디" />
                    <input type="text" id="pwd" placeholder="비밀번호" />
                </form>
                <LoginButton loginHandler={loginHanler} logo={googleLogo} platform={platform} />
            </div>
        </div>
    )
}