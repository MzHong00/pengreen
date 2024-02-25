import { useState } from "react"

import Button from "./button";

export default function Pchoice({ choice, max_choice, type }) {
    const [count, setCount] = useState(0);

    const limit_check = (e) => {
        const isChecked = e.target.checked;

        if (isChecked && count < max_choice) {
            setCount(prev => prev + 1);
        } else if (!isChecked) {
            setCount(prev => prev - 1);
        } else {
            e.preventDefault(); // 선택 제한 조건을 충족하지 않으면 체크박스 변경을 취소합니다.
        }
    };

    const event_prevent = (e) => {
        e.preventDefault();
    }

    const submitHandler = (e) => {
        event_prevent(e);

        let selectedChoice = [];
        const choiceList = Array.from(e.target.form.children[1].children);

        choiceList.map((ele)=> {
            if (ele.children[0].checked) {
                selectedChoice.push(ele.children[1].innerText);
            }
        })
    }

    return (
        <div>
            {
                type === 'submit' ?
                    <form>
                        <div className="flex h-4 gap-2 mb-2">
                            <input 
                                type="submit"
                                value='제출'
                                onClick={submitHandler}
                                className="px-2 bg-blue-300 shadow hover:shadow-inner text-xs text-white font-light rounded-3xl cursor-pointer"/>
                            <Button
                                name={`최대: ${max_choice}`}
                                btnStyles='px-2 bg-blue-300 shadow hover:shadow-inner cursor-default'
                                contentStyles='text-xs text-white font-light'
                                handler={event_prevent} />
                        </div>
                        <div className="h-40 flex flex-col overflow-y-auto overflow-x-hidden gap-3">
                            {
                                choice.map((value, idx) =>
                                    <div key={idx} className="w-fit flex items-center gap-2">
                                        <input type="checkbox" id={value.id} onClick={limit_check} className="w-4 h-4" />
                                        <label htmlFor={value.id} className="text-sm font-normal truncate">{value.content}</label>
                                    </div>)
                            }
                        </div>
                    </form>
                    :
                    <div className="h-40 flex flex-col overflow-y-auto overflow-x-hidden gap-3">
                        {
                            choice.map((value, idx) =>
                                <div key={idx} className="w-fit flex items-center gap-2">
                                    <span>{value.count}</span>
                                    <span className="text-sm font-normal truncate">{value.content}</span>
                                </div>)
                        }
                    </div>
            }
        </div>
    )
}