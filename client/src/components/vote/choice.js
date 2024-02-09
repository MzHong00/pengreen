import { useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { ItemContext } from "../common/PvoteCreator";

export default function Choice({ id, contentValue }) {
    const { items, setItems } = useContext(ItemContext);
    const [content, setContent] = useState(contentValue);

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const changeItems = (e) => {
        const obj = {
            id: id,
            content: e.target.value
        }

        //내가 선택한 항목을 찾고
        const index = items.choice.findIndex(item => item.id === id);
        //해당 항목에 변경한 텍스트를 적용 
        items.choice.splice(index, 1, obj);
        //항목이 비어있을 경우 해당 항목이 삭제된 배열을 반환
        const updatedItems = items.choice.filter(item => item.content !== "")
        setItems((prev) => ({
            ...prev,
            choice: updatedItems
        }));
    }

    //items의 상태를 바꾸는 함수
    const updateItems = (e) => {
        if (e.key === 'Enter') {
            changeItems(e);
        }
    }

    return (
        <div>
            <div className={`flex`}>
                <div className={`flex w-full h-full items-center rounded-3xl text-sm text-gray-800 gap-3`}>
                    <FaCheck color="#0099FF" />
                    <input
                        value={content}
                        name={content}
                        onChange={contentHandler}
                        onKeyDown={updateItems}
                        onBlur={changeItems}
                        placeholder="항목"
                        className="w-full bg-inherit outline-none focus:text-blue-500" />
                </div>
            </div>
        </div>
    )
}