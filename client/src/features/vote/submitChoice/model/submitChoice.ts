import { useUpdateChoice } from "./queries";
import { type VoteActionDto } from "entities/vote";

export const useSubmitChoice = ({
  user_id,
  vote_id,
}: Omit<VoteActionDto, "choiceList">) => {
  const { mutate: submit } = useUpdateChoice({
    user_id: user_id,
    vote_id: vote_id,
  });

  return (event: any) => {
    event.preventDefault();

    let selectedChoice: Array<string> = [];

    const pickInputList = Array.from(event.target.form.children[1].children);
    pickInputList.forEach((ele: any) => {
      if (ele.children[0].checked) {
        const pickText = ele.children[1].innerText;
        selectedChoice.push(pickText);
      }
    });

    if (selectedChoice.length === 0) {
      console.log("Pick 없음");
      return;
    }

    submit(selectedChoice);
  };
};
