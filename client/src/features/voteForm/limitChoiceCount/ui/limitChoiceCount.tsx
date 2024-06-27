import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGlobalStore } from "shared/stores/useStore";

export const LimitChoiceCount = () => {
    const {formData, setFormData} =useGlobalStore();
    
    const rangeRef = useRef<HTMLInputElement>(null);
    const [thumb, setThumb] = useState(0);
    //const [thumb, setThumb] = useState(vote.max_choice);
    const [widthInterval, setWidthInterval] = useState(0);

    // useEffect(() => {
    //     setWidthInterval(rangeRef.current?.clientWidth / (vote.choice.length - 1))
    // }, [vote])

    const rangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        // setThumb(event.target.value);
        setFormData({max_choice: parseInt(event.target.value)})
    }

    return (
        <div className="flex flex-col w-1/2">
            <label className="text-base font-semibold">선택 개수</label>
            <div className="relative">
                <input ref={rangeRef} type="range" value={thumb} min="1" max={formData.max_choice} className="w-full text-sm" onChange={rangeHandler} />
                <div className="absolute w-6 h-6 top-7 left-0" style={{ left: `${widthInterval * (thumb - 1)}px` }}>
                    <div className="flex justify-center items-center rounded-lg bg-black text-sm text-white -translate-x-1/2">
                        {formData.max_choice}
                    </div>
                </div>
            </div>
        </div>
    )
}