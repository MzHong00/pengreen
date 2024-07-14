import { ChoiceDto } from "entities/vote/choice";

export const NumChart = ({ data = [] }: { data: ChoiceDto[] }) => {
  return (
    <div>
      <div className="h-40 flex flex-col overflow-y-auto overflow-x-hidden gap-3">
        {data.map((value, idx) => (
          <div key={idx} className={`relative w-fit flex items-center gap-2`}>
            <span>{value.count}</span>
            <span className="text-sm font-normal truncate">
              {value.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
