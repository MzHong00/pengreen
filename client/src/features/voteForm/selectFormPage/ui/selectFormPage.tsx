import { LimitChoiceCount } from "features/voteForm/limitChoiceCount";
import { SetDeadline } from "features/voteForm/setDeadline";
import { SetChoice } from "features/voteForm/setChoice";
import { useGlobalStore } from "shared/stores/useStore";
import { pageTypes } from "../consts/voteFormPageTypes";
import { useState } from "react";

export const SelectFormPage = () => {
  const [page, setPage] = useState("항목 추가");

  return (
    <div className="h-112 flex flex-col border-solid border-2 rounded-2xl overflow-hidden">
      <div className="w-full h-[10%] px-1 flex items-end bg-black/5 gap-1">
        {pageTypes.map((type, idx) => (
          <div
            key={type}
            className={`w-full h-full px-1 flex items-center cursor-pointer rounded-t-lg hover:bg-white ${
              type === page && "bg-white"
            }`}
            onClick={() => setPage(type)}
          >
            <div className={`flex items-center text-sm text-gray-800 gap-3`}>
              <span>{page}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[90%] p-3 flex flex-col flex-wrap bg-white rounded-b-2xl gap-3">
        {page === pageTypes[0] && <SetChoice />}
        {page === pageTypes[1] && (
          <div className="flex flex-col gap-5">
            <LimitChoiceCount />
            <SetDeadline />
          </div>
        )}
      </div>
    </div>
  );
};
