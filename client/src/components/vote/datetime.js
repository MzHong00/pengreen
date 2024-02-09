import { useContext, useEffect, useMemo, useState } from "react"
import { ItemContext } from "../common/PvoteCreator";

export default function Datetime() {
    const getInitialDate = useMemo(() => {
        const oneDayLater = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
        return new Date(oneDayLater).toISOString().slice(0, 16);
    }, [])
    const {items, setItems} = useContext(ItemContext);

    const [deadline, setDeadline] = useState(items.deadline);
    useEffect(() => {
        setItems(prev => ({
            ...prev,
            deadline: deadline
        }))
    }, [deadline, setItems])

    const dateHandler = (e) => {
        setDeadline(e.target.value)
    }

    return (
        <div>
            <input type="datetime-local" id="deadline" value={deadline} className="text-sm" onChange={dateHandler} />
        </div>
    )
}