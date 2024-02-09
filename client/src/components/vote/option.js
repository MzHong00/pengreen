import RangeBox from "./rangeBox";
import Datetime from "./datetime";

export default function Option() {
    
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col w-1/2">
                <label htmlFor="max" className="text-base font-semibold">선택 개수</label>
                <div className="relative">
                    <RangeBox/>
                </div>
            </div>
            <div className="flex flex-col w-1/2">
                <label htmlFor="date" className="text-base font-semibold">기간</label>
                <div>
                    <Datetime />
                </div>
            </div>
        </div>
    )
}