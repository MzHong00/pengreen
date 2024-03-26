import { useState } from "react";

interface Props {
    choice: Array<string>;
    maxChoice: number;
}

export const SelectChoice = ({
    choice, maxChoice
}: Props) => {
    const [count, setCount] = useState(0);
    const limit_check = (e: any) => {
        const isChecked = e.target.checked;

        if (isChecked && count < maxChoice) {
            setCount(prev => prev + 1);
        } else if (!isChecked) {
            setCount(prev => prev - 1);
        } else {
            e.preventDefault(); // 선택 제한 조건을 충족하지 않으면 체크박스 변경을 취소합니다.
        }
    };

    return (
        <div className="h-40 flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
            {
                choice.map((value: any, idx) =>
                    <div key={idx} className="w-fit flex items-center gap-2">
                        <input type="checkbox" id={value.id} onClick={limit_check} className="w-4 h-4" />
                        <label htmlFor={value.id} className={`text-sm font-normal truncate`}>{value}</label>
                    </div>)
            }
        </div>
    )
}