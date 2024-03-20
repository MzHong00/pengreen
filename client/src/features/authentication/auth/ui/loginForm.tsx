import { oauthType } from "../model/oauthType";
import Button from "shared/ui/button";

export function LoginForm() {
    const oauth = oauthType();

    return (
        <div className="w-96 h-128 p-10 flex flex-col justify-between items-center bg-white gap-10">
            <h1>
                <span className="text-4xl">환영합니다</span>
            </h1>
            <div className="grid gap-2">
                {oauth.map((oauth) =>
                    <Button
                        key={oauth.name}
                        name={oauth.name + "계정으로 로그인"}
                        componentImg={oauth.componentImg}
                        handler={oauth.handler}
                        btnStyles={`w-72 px-7 hover:opacity-75 ${oauth.tailwind}`}
                        contentStyles="h-10 flex items-center gap-3" />)}
            </div>
            <p className="text-sm">로그인하여 다양한 서비스들을 누려보세요!</p>
        </div>
    )
}