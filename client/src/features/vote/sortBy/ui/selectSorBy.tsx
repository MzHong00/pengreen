import { type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "shared/ui"
import { sortTypes } from "../model/sortTypes"

export const SelectSortBy = () => {
    let [searchParams, setSearchParams] = useSearchParams();

    const sortSelection = (event: MouseEvent<HTMLElement>) => {
        setSearchParams({ sort: event.currentTarget.innerText })
    }

    return (
        <div className="w-52 flex flex-col bg-white rounded font-thin text-xs border border-slate-300">
            <span className="p-2 px-2 font-semibold">Select order</span>
            {sortTypes.map((type, idx) => (
                <Button
                    key={idx}
                    handler={sortSelection}
                    btnStyles="border-t rounded-none"
                    contentStyles="p-2 px-4 !justify-start hover:bg-gray-100"
                    text={type.text} />
            ))}
        </div>
    )
}