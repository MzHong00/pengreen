import { useEffect, useState } from "react";

export default function VoteTop({ vote, setVote }) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setVote(prev => ({
            ...prev,
            title: title
        }))
    }, [title, setVote]);

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div className="flex items-center">
            <img src={vote.own_picture} alt="" className={`w-8 h-8 mr-3 rounded-full`} />
            <input type="text" placeholder="제목" value={title} onChange={titleHandler} className="w-10/12 font-semibold bg-inherit outline-none" />
        </div>
    )
}