import { useState } from "react";

import { FaPlus } from "react-icons/fa6";

export default function AddChoice({ setVote }) {
    const [value, setValue] = useState("");

    const changeHandler = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const addItem = () => {
        //빈칸이면 choice를 추가하지 않음
        if (value === "" || value === undefined)
            return

        setVote((prev) => ({
            ...prev,
            choice: [...prev.choice, value]
        }));
        setValue("");
    }
    
    const createItem = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div className={`flex w-[90%] h-10 items-center text-sm gap-3 focus:text-blue-400`}>
            <FaPlus className="cursor-pointer" color="#0099FF" size="18" onClick={addItem} />
            <input
                value={value}
                onChange={changeHandler}
                onKeyDown={createItem}
                placeholder="새 항목"
                className="w-full bg-inherit outline-none focus:text-blue-500" />
        </div>
    )
}