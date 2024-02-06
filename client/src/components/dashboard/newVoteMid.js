import NewVoteItem from "./newVoteItem";
import List from "../common/list";
import { useMemo, useState } from "react";

export default function NewVoteMid({ items, setItems }) {
    const barType = useMemo(() => ["항목", "추가 설정"], []);
    const [bar, setBar] = useState(barType[0]);

    const barHandler = (e) => {
        setBar(e.target.innerText);
    }
    console.log(items);
    return (
        <div className="h-112 flex flex-col border-solid border-2 rounded-2xl overflow-hidden">
            <div className="w-full h-[10%] px-1 flex items-end bg-black/5 gap-1">
                {barType.map((value, idx) => <List key={idx} handler={barHandler} name={value} listStyles={`w-36 !h-5/6 rounded-t-lg hover:bg-white ${bar === value && "bg-white"}`} />)}
            </div>

            <div className="h-[90%] p-3 flex flex-col flex-wrap bg-white rounded-b-2xl gap-3">
                {
                    bar === barType[0] && items.map((idx) => <NewVoteItem key={idx.id} id={idx.id} contentValue={idx.content} items={items} setItems={setItems} />)
                    
                }
            </div>
        </div>
    )
}