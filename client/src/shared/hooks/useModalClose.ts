import { useEffect, useRef } from "react";

export const useModalClose = (closeHandler: () => void) => {
  const Ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        closeHandler();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.addEventListener("click", handleClickOutside);
    };
  }, [closeHandler]);

  return Ref;
};
