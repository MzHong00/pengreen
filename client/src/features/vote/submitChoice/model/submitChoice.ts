import { useUpdateChoice } from "./queries";

export const useSubmitChoice = (userId:string, voteId: string) => {
    const { mutate: submit } = useUpdateChoice(userId, voteId);

    return (event: any) => {
        event.preventDefault();

        let selectedChoice: Array<string> = [];

        const pickInputList = Array.from(event.target.form.children[1].children);
        pickInputList.forEach((ele: any) => {
            if (ele.children[0].checked) {
                const pickText = ele.children[1].innerText
                selectedChoice.push(pickText);
            }
        })

        if (selectedChoice.length === 0) {
            console.log("Pick 없음");
            return
        }

        submit(selectedChoice)
    }
}