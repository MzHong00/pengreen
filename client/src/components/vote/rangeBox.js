import { useContext, useEffect, useRef, useState } from "react";
import { ItemContext } from "../common/PvoteCreator";

export default function RangeBox() {
    const rangeRef = useRef()
    const { items, setItems } = useContext(ItemContext);
    const [thumb, setThumb] = useState(items.max_choice);
    const [widthInterval, setWidthInterval] = useState(0);

    useEffect(() => {
        setWidthInterval(rangeRef.current.clientWidth / (items.choice.length - 1))
    }, [items])

    useEffect(() => {
        setItems(prev => ({
            ...prev,
            max_choice: parseInt(thumb)
        }))
    }, [thumb, setItems])

    const rangeHandler = (e) => {
        setThumb(e.target.value)
    }

    return (
        <div>
            <input ref={rangeRef} type="range" value={thumb} id="max" min="1" max={items.choice.length} className="w-full text-sm" onChange={rangeHandler} />
            <div className="absolute w-6 h-6 top-7 left-0" style={{ left: `${widthInterval * (thumb - 1)}px` }}>
                <div className="flex justify-center items-center rounded-lg bg-black text-sm text-white -translate-x-1/2">
                    {thumb}
                </div>
            </div>
        </div>
    )
}
