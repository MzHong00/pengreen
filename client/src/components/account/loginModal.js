
export default function LoginModal({loginHanler, platform}) {

    return (
        <div>
            <form>
                <input type="text" id="email" placeholder="아이디"/>
                <input type="text" id="pwd" placeholder="비밀번호"/>
            </form>
            <button onClick={loginHanler}>{`${platform}`}</button>
        </div>
    )
}