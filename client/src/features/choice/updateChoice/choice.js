import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function Choice({ id, contentValue, vote, setVote }) {
    const [content, setContent] = useState(contentValue);

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const changeVote = (e) => {
        const obj = {
            id: id,
            content: e.target.value
        }

        //내가 선택한 항목을 찾고
        const index = vote.choice.findIndex(item => item.id === id);
        //해당 항목에 변경한 텍스트를 적용 
        vote.choice.splice(index, 1, obj);
        //항목이 비어있을 경우 해당 항목이 삭제된 배열을 반환
        const updatedItems = vote.choice.filter(item => item.content !== "")
        setVote((prev) => ({
            ...prev,
            choice: updatedItems
        }));
    }

    //items의 상태를 바꾸는 함수
    const enterChangeVote = (e) => {
        if (e.key === 'Enter') {
            changeVote(e);
        }
    }

    return (
        <div>
            <div className={`flex`}>
                <div className={`flex w-full h-full items-center rounded-3xl text-sm text-gray-800 gap-3`}>
                    <FaCheck color="#0099FF" />
                    <input
                        value={content}
                        onChange={contentHandler}
                        onKeyDown={enterChangeVote}
                        onBlur={changeVote}
                        placeholder="항목"
                        className="w-full bg-inherit outline-none focus:text-blue-500" />
                </div>
            </div>
        </div>
    )
}