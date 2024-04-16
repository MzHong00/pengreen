import { useState, useRef, useEffect } from "react";

interface Props {
    trueState?: any;
    falseState?: any;
}

export const useHover = ({
    trueState,
    falseState
}: Props = {}) => {
    const ref = useRef<HTMLDivElement>(null); // useRef 제네릭으로 DOM 요소의 타입을 지정
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => {
            setHover(true);
        };
        const handleMouseLeave = () => {
            setHover(false);
        };

        const node = ref.current;
        if (node) {
            node.addEventListener('mouseenter', handleMouseEnter);
            node.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                node.removeEventListener('mouseenter', handleMouseEnter);
                node.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, [ref]); // ref가 변경될 때마다 useEffect 다시 실행

    return {
        ref: ref,
        state: hover,
        value: hover ? trueState : falseState
    };
};
