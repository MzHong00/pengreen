import { IoIosArrowDown } from "react-icons/io";

interface Props {
  onClick?: any;
  icon?: string;
}

export function ProfilesCard({ onClick, icon }: Props) {
  return (
    <div
      className={`flex justify-center rounded-3xl hover:bg-zinc-200 hover:outline outline-zinc-200`}
    >
      <button
        className={`flex justify-center items-center rounded-3xl gap-2`}
        onClick={onClick}
      >
        {icon ? (
          <>
            <img src={icon} alt="" className="w-8 h-8 rounded-full" />
            <IoIosArrowDown />
          </>
        ) : (
          <span>로그인</span>
        )}
      </button>
    </div>
  );
}
