import RangeBox from "./limitPickCount/rangeBox";
import Datetime from "./setDeadline/datetime";

export default function Option({ vote, setVote }) {

    return (
        <div className="flex flex-col gap-5">
            <RangeBox {...{vote, setVote}} />
            <Datetime {...{vote, setVote}} />
        </div>
    )
}