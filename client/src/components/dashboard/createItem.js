import { useState } from "react";

import { FaPlus } from "react-icons/fa6";


export default function CreateItem({ setItems, sizeClass }) {
    const [value, setValue] = useState("");

    const changeHandler = (e) => {
        setValue(e.target.value);
    }

    const changeItems = (e) => {
        if (e.target.value === "" || e.target.value === undefined)
            return

        const obj = {
            id: Math.random(),
            content: e.target.value
        }

        setItems((prev) => [...prev, obj]);
        setValue("");
    }

    const createItem = (e) => {
        if (e.key === 'Enter') {
            changeItems(e);
        }
    }

    return (
        <div className={`flex ${sizeClass} items-center text-sm gap-3 focus:text-blue-400`}>
            <FaPlus color="#0099FF" onClick={changeItems} />
            <input
                value={value}
                onChange={changeHandler}
                onKeyDown={createItem}
                placeholder="새 항목"
                className="w-full bg-inherit outline-none focus:text-blue-500" />
        </div>
    )
}