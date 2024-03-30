import { useState } from "react";

export const useChartTypeState = () => {
    const view = ['기본', '막대', '파이'];

    const [chartTypeIdx, setChartTypeIdx] = useState(0);
    const [chartType, setTypeName] = useState(view[0]);

    const chartTypeHandler = () => {
        const nextIdx = (chartTypeIdx + 1) % 3;
        setChartTypeIdx(nextIdx);
        setTypeName(view[nextIdx]); // chartTypeIdx가 업데이트된 이후에 새로운 chartType를 설정
    }

    return { chartType, chartTypeHandler }
}
