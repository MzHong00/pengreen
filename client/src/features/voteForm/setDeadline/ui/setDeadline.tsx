import { type ChangeEvent } from "react";
import { useGlobalStore } from "shared/stores/useStore";

export const SetDeadline = () => {
  const { formData, setFormData } = useGlobalStore();

  console.log(formData);
  
  const dateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ deadline: new Date(event.target.value) });
  };

  return (
    <div className="flex flex-col w-1/2">
      <label className="text-base font-semibold">기간</label>
      <input
        type="datetime-local"
        className="text-sm hover:cursor-pointer"
        onChange={dateHandler}
      />
    </div>
  );
};
