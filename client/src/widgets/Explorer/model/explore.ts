import { useRef, useState } from "react"
import { VoteDto } from "widgets/vote";


export const useSplitVotes = (data: VoteDto[]) => {
    const SliceUnit = 4;
    const [pointer, setPointer] = useState(0);

    const ref = useRef<any>();

    const leftArrowHandler = () => {
        ref.current.style.transition = '0.2s';
        ref.current.style.transform = 'translate(50rem, 0)';

        setTimeout(() => {
            ref.current.style.transitionDuration = '';
            ref.current.style.transform = '';

            setPointer(prev => prev - SliceUnit);
        }, 400);
    }

    const rightArrowHandler = () => {
        ref.current.style.transitionDuration = '0.2s';
        ref.current.style.transform = 'translate(-50rem, 0)';

        setTimeout(() => {
            ref.current.style.transitionDuration = '';
            ref.current.style.transform = '';

            setPointer(prev => prev + SliceUnit);
        }, 400);
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