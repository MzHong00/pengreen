import { useEffect, useRef, useState } from "react";

export default function RangeBox({ vote, setVote }) {
    const rangeRef = useRef()
    const [thumb, setThumb] = useState(vote.max_choice);
    const [widthInterval, setWidthInterval] = useState(0);

    useEffect(() => {
        setWidthInterval(rangeRef.current.clientWidth / (vote.choice.length - 1))
    }, [vote])

    useEffect(() => {
        setVote(prev => ({
            ...prev,
            max_choice: parseInt(thumb)
        }))
    }, [thumb, setVote])

    const rangeHandler = (e) => {
        setThumb(e.target.value)
    }

    return (
        <div className="flex flex-col w-1/2">
            <label htmlFor="max" className="text-base font-semibold">선택 개수</label>
            <div className="relative">
                <input ref={rangeRef} type="range" value={thumb} id="max" min="1" max={vote.choice.length} className="w-full text-sm" onChange={rangeHandler} />
                <div className="absolute w-6 h-6 top-7 left-0" style={{ left: `${widthInterval * (thumb - 1)}px` }}>
                    <div className="flex justify-center items-center rounded-lg bg-black text-sm text-white -translate-x-1/2">
                        {thumb}
                    </div>
                </div>
            </div>
        </div>
    )
}
