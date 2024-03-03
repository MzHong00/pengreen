import { useState, useEffect } from "react"

export default function Pchoice({ data = [] }) {
    const [choice, setChoice] = useState(data);

    useEffect(() => {
        setChoice(data);
    }, [data]);

    return (
        <div>
            <div className="h-40 flex flex-col overflow-y-auto overflow-x-hidden gap-3">
                {
                    choice.map((value, idx) =>
                        <div key={idx} className="w-fit flex items-center gap-2">
                            <span>{value.count}</span>
                            <span className="text-sm font-normal truncate">{value.content}</span>
                        </div>)
                }
            </div>
        </div>
    )
}