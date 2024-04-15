import { sortTypes } from "../model/sortTypes"
import { Button } from "shared/ui"
import { IoIosArrowDown } from "react-icons/io";
import { SelectSortBy } from "./selectSorBy";
import { useToggle } from "shared/hooks/useToggle";

export const SortByButton = () => {
    const {state, handler} = useToggle();
    
    return (
        <div className="relative flex flex-col">
            <div className="flex items-center">
                {sortTypes[0].img}
                <span>Likes</span>
            </div>
            <Button
                handler={handler}
                componentImg={<IoIosArrowDown size={12} />}
                text={`SortBy`}
                contentStyles="text-xs font-normal border-t-2 hover:border-gray-400" />
            
                <div className={`${state ? 'scale-100' : 'scale-0'} absolute top-full left-1/2 -translate-x-1/2 z-50 overflow-hidden duration-200 `}>
                    <SelectSortBy />
                </div>
        </div>
    )
} 