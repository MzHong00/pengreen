import { useMemo, useState } from "react";

import Choice from "./choice";
import Option from "./option";
import List from "../common/list";

export default function VoteMid({ vote, setVote }) {

    const barType = useMemo(() => ["항목", "추가 설정"], []);
    const [bar, setBar] = useState(barType[0]);

    const barHandler = (e) => {
        setBar(e.target.innerText);
    }
    console.log(vote);
    return (
        <div className="h-112 flex flex-col border-solid border-2 rounded-2xl overflow-hidden">
            <div className="w-full h-[10%] px-1 flex items-end bg-black/5 gap-1">
                {
                    barType.map((value, idx) =>
                        <List key={idx}
                            handler={barHandler}
                            name={value}
                            listStyles={`w-36 !h-5/6 rounded-t-lg hover:bg-white ${bar === value && "bg-white"}`} />)
                }
            </div>

            <div className="h-[90%] p-3 flex flex-col flex-wrap bg-white rounded-b-2xl gap-3">
                {bar === barType[0] && vote.choice.map((idx) => <Choice key={idx.id} id={idx.id} contentValue={idx.content} vote={vote} setVote={setVote} type="create" />)}
                {bar === barType[1] && <Option {...{ vote, setVote }} />}
            </div>
        </div>
    )
}