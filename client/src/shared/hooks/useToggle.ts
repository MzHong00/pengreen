import { useState } from "react";

/*
    default: false,
    arg:
    {
        trueState: ture일 때, 보여질 값 또는 컴포넌트 등
        falseState: false일 때, 보여질 값 또는 컴포넌트 등
    }
    return:
    [
        {
            state: toggle의 상태 <boolean>
            value: 인자로 받았던 것을 state에 따라 반환
            changeState: toggle의 상태 변경 handler 함수
        },
    ]
*/

export const useToggle = (
  ifTrue: any = undefined,
  ifFalse: any = undefined
) => {
  const [toggleState, setToggleState] = useState(false);

  const setToggleHandler = (state?: boolean) => {
    !state ? setToggleState(!toggleState) : setToggleState(state);
  };

  return [toggleState, setToggleHandler, toggleState ? ifTrue : ifFalse];
};
