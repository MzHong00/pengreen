import { useState, useContext } from "react";

import { FaPlus } from "react-icons/fa6";
import { ItemContext } from "../common/PvoteCreator";


export default function AddChoice({ sizeClass }) {
    const [value, setValue] = useState("");
    const { setItems } = useContext(ItemContext);

    const changeHandler = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const addItem = () => {
        //빈칸이면 choice를 추가하지 않음
        if (value === "" || value === undefined)
            return

        const obj = {
            id: Math.random(),
            content: value
        }

        setItems((prev) => ({
            ...prev,
            choice: [...prev.choice, obj]
        }));
        setValue("");
    }

    const createItem = (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    return (
        <div className={`flex ${sizeClass} items-center text-sm gap-3 focus:text-blue-400`}>
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