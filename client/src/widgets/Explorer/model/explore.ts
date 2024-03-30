import { useRef, useState } from "react"
import { VoteDto } from "widgets/vote";


export const useSplitVotes = (data: VoteDto[]) => {
    const SliceUnit = 4;
    const [pointer, setPointer] = useState(0);

    const ref = useRef<any>();

    const leftArrowHandler = () => {
        console.log("left Arrow");
        //ref.current.scrollLeft += 400 * 2;
        setPointer(prev => prev - SliceUnit);
    }

    const rightArrowHandler = () => {
        console.dir(ref.current);
        //ref.current.scrollLeft -= 400 * 2;
        setPointer(prev => prev + SliceUnit);
    }

    return ({
        ref: ref,
        splitedVote: {
            prevVote: data?.slice(pointer - SliceUnit, pointer),
            curVote: data?.slice(pointer, pointer + SliceUnit),
            nextVote: data?.slice(pointer + SliceUnit, pointer + SliceUnit * 2)
        },
        rightArrowHandler: rightArrowHandler,
        leftArrowHandler: leftArrowHandler
    })
}