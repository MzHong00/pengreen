import { useEffect, useState } from "react"

export default function Datetime({ vote, setVote }) {

    const [deadline, setDeadline] = useState(vote.deadline);
    useEffect(() => {
        setVote(prev => ({
            ...prev,
            deadline: new Date(deadline).toISOString()
        }))
    }, [deadline, setVote])

    const dateHandler = (e) => {
        setDeadline(e.target.value)
    }

    return (
        <div className="flex flex-col w-1/2">
            <label htmlFor="deadline" className="text-base font-semibold">기간</label>
            <div>
                <input type="datetime-local" id="deadline" value={deadline} className="text-sm hover:cursor-pointer" onChange={dateHandler} />
            </div>
        </div>
    )
}