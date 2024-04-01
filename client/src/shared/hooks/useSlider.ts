import { useRef, useState, type MouseEvent, useEffect } from "react"

export const useSlider = (limitSlide: number, eleWidth: number) => {
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
            const showState = pointer !== limitSlide - 1 ? 'visible' : 'hidden';
            rightArrowRef.current.style.visibility = showState;
        }

        ShowLeftArrow();
        ShowRightArrow();
    }, [pointer, limitSlide]);

    const leftArrowHandler = () => {
        containerRef.current.scrollLeft -= eleWidth;
        setPointer(prev => prev - 1);
    }

    const rightArrowHandler = () => {
        containerRef.current.scrollLeft += eleWidth;
        setPointer(prev => prev + 1);
    }

    const translateElePosHandler = (e: MouseEvent<HTMLElement>) => {
        const elePosX = e.currentTarget.offsetLeft;
        containerRef.current.scrollLeft = elePosX;
        setPointer(elePosX / eleWidth);
    }

    const arrowActiveHandler = (e: any) => {
        const elePosX = e.currentTarget.offsetLeft;

        const elePointer = elePosX / eleWidth;
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