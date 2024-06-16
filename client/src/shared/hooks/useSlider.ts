import { useRef, useState, type MouseEvent, useEffect } from "react"

/*
    1 args: 오른쪽으로 슬라이드를 할 수 있는 최대 횟수
    2 args: 슬라이드를 한 번 실행했을 때, 이동하는 거리 (단위: px)
*/
export const useSlider = (maxSlideCount: number, distance: number) => {
    const containerRef = useRef<any>();
    const leftArrowRef = useRef<any>();
    const rightArrowRef = useRef<any>();
    
    const [pointer, setPointer] = useState(0);

    useEffect(() => {
        const ShowLeftArrow = () => {
            const showState = pointer !== 0 ? 'visible' : 'hidden';
            leftArrowRef.current.style.visibility = showState;
        }
        const ShowRightArrow = () => {
            const showState = pointer !== maxSlideCount - 1 ? 'visible' : 'hidden';
            rightArrowRef.current.style.visibility = showState;
        }

        ShowLeftArrow();
        ShowRightArrow();
    }, [pointer, maxSlideCount]);

    const leftArrowHandler = () => {
        containerRef.current.scrollLeft -= distance;
        setPointer(prev => prev - 1);
    }

    const rightArrowHandler = () => {
        containerRef.current.scrollLeft += distance;
        setPointer(prev => prev + 1);
    }

    const translateElePosHandler = (e: MouseEvent<HTMLElement>) => {
        const elePosX = e.currentTarget.offsetLeft;
        containerRef.current.scrollLeft = elePosX;
        setPointer(elePosX / distance);
    }

    const arrowActiveHandler = (e: any) => {
        const elePosX = e.currentTarget.offsetLeft;

        const elePointer = elePosX / distance;
        if (elePointer < pointer) {
            leftArrowRef.current.style.backgroundColor = 'skyblue';
        } else if (elePointer > pointer) {
            rightArrowRef.current.style.backgroundColor = 'skyblue';
        }
    }

    const arrowInActiveHandler = (e: any) => {
        leftArrowRef.current.style.backgroundColor = '#514d4a';
        rightArrowRef.current.style.backgroundColor = '#514d4a';
    }

    return ({
        ref: {
            containerRef: containerRef,
            rightArrowRef: rightArrowRef,
            leftArrowRef: leftArrowRef,
        },
        pointer: pointer,
        handler: {
            rightArrowHandler: rightArrowHandler,
            leftArrowHandler: leftArrowHandler,
            arrowActiveHandler: arrowActiveHandler,
            arrowInActiveHandler: arrowInActiveHandler,
            translateElePosHandler: translateElePosHandler,
        }
    })
}