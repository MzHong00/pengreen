import { useLocation } from "react-router-dom";

import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";
import { useNavSidebar } from "../model/sidebar";

import { Logo } from "widgets/LayoutHeader";
import { Button } from "shared/ui/Button";
import { useToggle } from "shared/hooks/useToggle";

export function Sidebar() {
  const location = useLocation();
  const sideList = useNavSidebar();

  const [arrowState, arrowDirHandler, arrowDir] = useToggle({
    ifTrue: () => <LuArrowBigLeftDash color="white" />,
    ifFalse: () => <LuArrowBigRightDash color="white" />,
  });

  return (
    <aside
      className={`absolute flex flex-col ${
        arrowState ? "w-40 " : "!w-14"
      } h-full left-0 top-0 bg-white duration-500`}
    >
      <div className="w-full h-12 pl-5 overflow-hidden">
        {arrowState && <Logo />}
      </div>
      <nav className="min-w-14 h-full overflow-hidden">
        {sideList.map((path, idx) => (
          <div className="w-full" key={idx}>
            {/* <Button
                                text={arrowState ? path.name : ""}
                                componentImg={path.icon}
                                handler={path.handler}
                                btnStyles="w-full hover:border-r-2 hover:border-solid hover:border-blue-300 !rounded-none"
                                contentStyles={`!justify-start w-full h-10 px-5 hover:text-blue-400 gap-2 ${location.pathname === path.path && '!text-blue-400'}`} /> */}
            <Button onClick={path.handler}>
              {path.icon}
              {arrowState ? path.name : ""}
            </Button>
          </div>
        ))}
      </nav>
      {/* <Button
                componentImg={arrowDir}
                btnStyles='absolute left-full bg-slate-300 !rounded-none'
                handler={arrowDirHandler} /> */}
    </aside>
  );
}
