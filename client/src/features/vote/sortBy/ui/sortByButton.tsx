import { sortTypes } from "../model/sortTypes"
import { Button } from "shared/ui"
import { IoIosArrowDown } from "react-icons/io";
import { useDialog } from "shared/hooks/useDialog";
import { SelectSortBy } from "./selectSorBy";

export const SortByButton = () => {
    const [SelectBox, openHandler] = useDialog(<SelectSortBy />);
    return (
        <div className="flex flex-col">
            <div className="flex items-center border-b-2">
                {sortTypes[0].img}
                <span>Likes</span>
            </div>
            <Button
                handler={openHandler}
                componentImg={<IoIosArrowDown size={12} />}
                text={`SortBy`}
                contentStyles="text-xs" />
            {SelectBox}
        </div>
    )
} 