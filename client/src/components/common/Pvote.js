import { useState } from "react";
import { FaCheck } from "react-icons/fa";

 function Vote({ id, contentValue, items, setItems }) {
    const [content, setContent] = useState(contentValue);

    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const changeItems = (e) => {
        const obj = {
            id: id,
            content: e.target.value
        }
        const index = items.findIndex(item => item.id === id);
        items.splice(index, 1, obj);
        setItems(items);
    }

    //items의 상태를 바꾸는 함수
    const updateItems = (e) => {
        if (e.key === 'Enter') {
            changeItems(e);
        }
    }

    return (
        <div>
            <input type="checkbox" name="vote" id={id} className="hidden" />
            <label htmlFor={id}>
                <div className={`flex`}>
                    <div
                        className={`flex items-center w-full h-full`}>
                        <div className={`flex items-center rounded-3xl text-sm text-gray-800 gap-3`}>
                            <FaCheck color="#0099FF" />
                            <input
                                value={content}
                                onChange={contentHandler}
                                onKeyDown={updateItems}
                                onBlur={changeItems}
                                placeholder="항목"
                                className="w-full bg-inherit outline-none focus:text-blue-500" />
                        </div>
                    </div>
                </div>
            </label>
        </div>
    )
}