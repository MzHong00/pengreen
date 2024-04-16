import { useState, useEffect, useMemo } from "react";

import { useUserFetch } from "features/authentication/login";

import AddChoice from "features/voteForm/addToChoice/addChoice";
import PublicButton from "features/voteForm/generateVote/ui/votePostButton/publicButton";
import Choice from "features/voteForm/setChoice/choice";
import RangeBox from "features/voteForm/limitPickCount/rangeBox";
import Datetime from "features/voteForm/setDeadline/datetime";

export default function VoteForm() {
    const { data: user } = useUserFetch();

    const [vote, setVote] = useState([]);
    useEffect(() => {
        const voteInit = () => {
            if (!user?._id)
                return;

            setVote({
                owner: user,
                title: "",
                choice: [],
                max_choice: 1,
                start_time: new Date().toISOString(),
                deadline: new Date().toISOString(),
                like: [],
                participant: []
            })
        }

        voteInit();
    }, [user])
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

    const barType = useMemo(() => ["항목", "추가 설정"], []);
    const [bar, setBar] = useState(barType[0]);

    const barHandler = (e) => {
        setBar(e.target.innerText);
    }

    return (
        <form className="w-144 h-full flex flex-col font-medium">
            <div className="h-full flex flex-col justify-between gap-5">
                <div className="flex items-center">
                    <img src={user?.picture} alt="" className={`w-8 h-8 mr-3 rounded-full`} />
                    <input type="text" placeholder="제목" value={title} onChange={titleHandler} className="w-10/12 font-semibold bg-inherit outline-none" />
                </div>
                <div className="h-112 flex flex-col border-solid border-2 rounded-2xl overflow-hidden">
                    <div className="w-full h-[10%] px-1 flex items-end bg-black/5 gap-1">
                        {
                            barType.map((value, idx) => (
                                <div
                                    key={idx}
                                    className={`w-full h-full px-1 flex items-center cursor-pointer rounded-t-lg hover:bg-white ${bar === value && "bg-white"}`}
                                    onClick={barHandler}>
                                    <div className={`flex items-center text-sm text-gray-800 gap-3`}>
                                        <span>{value}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="h-[90%] p-3 flex flex-col flex-wrap bg-white rounded-b-2xl gap-3">
                        {bar === barType[0] &&
                            vote.choice?.map((value, idx) => <Choice key={idx} id={idx} contentValue={value} vote={vote} setVote={setVote} />)}
                        {bar === barType[1] &&
                            <div className="flex flex-col gap-5">
                                <RangeBox {...{ vote, setVote }} />
                                <Datetime {...{ vote, setVote }} />
                            </div>}
                    </div>
                </div>
                <div className={`flex`}>
                    <div className={`flex items-center w-full h-full`}>
                        <AddChoice setVote={setVote} />
                        <PublicButton vote={vote} />
                    </div>
                </div>
            </div>
        </form>
    )
}