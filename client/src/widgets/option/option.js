import RangeBox from "../../features/option/limitPickCount/rangeBox";
import Datetime from "../../features/option/setDeadline/datetime";

export default function Option({ vote, setVote }) {

    return (
        <div className="flex flex-col gap-5">
            <RangeBox {...{vote, setVote}} />
            <Datetime {...{vote, setVote}} />
        </div>
    )
}