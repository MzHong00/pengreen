import { Button } from "shared/ui"
import { sortTypes } from "../model/sortTypes"

export const SelectSortBy = () => {

    return (
        <div>
            {sortTypes.map((type, idx) => (
                <Button 
                    />
            ))}
        </div>
    )
}