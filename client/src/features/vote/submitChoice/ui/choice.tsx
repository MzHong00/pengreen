import Label from "shared/ui/label";

import styles from './choice.module.css';
import { useUserFetch } from "features/authentication/login";
import { NumChart } from "entities/chart/numChart";
import { SelectChoice } from "features/vote/selectChoice";
import { useReadEachChoiceCount, useReadIsParticipant } from "../model/queries";
import { useToggle } from "shared/hooks/useToggle";

interface Props {
    voteId: string;
    choice: Array<string>;
    maxChoice: number;
}

export const Choice = ({
    voteId, choice, maxChoice
}: Props) => {
    const { data: user } = useUserFetch();
    const { data: choiceData } = useReadEachChoiceCount(voteId, choice);
    const { data: isParticipant } = useReadIsParticipant(user?._id, voteId);
    const { state: toggleState, handler: toggleHandler } = useToggle({});

    const submitHandler = async (e: any) => {
        toggleHandler();
        e.preventDefault();
        console.log(e);
        
        let selectedChoice: Array<string> = [];
        const pick = Array.from(e.target.form.children[1].children);
        
        pick.forEach((ele: any) => {
            if (ele.children[0].checked) {
                selectedChoice.push(ele.children[1].innerText);
            }
        })

        if (selectedChoice.length === 0) {
            console.log("Pick 없음");
            return;
        }
    }

    return (
        <form className='h-full'>
            <div className={`relative flex h-4 gap-2 mb-2`}>
                <span className={`flex ${isParticipant && styles.console}`} data-username={user?.name} data-pick={'userPick'}>
                    <input
                        type="submit"
                        value={`${!toggleState ? "참여" : "제출"}`}
                        onClick={submitHandler}
                        className={`px-2 shadow hover:shadow-inner text-xs text-white font-light rounded-3xl cursor-pointer ${!isParticipant ? "bg-blue-300" : "bg-yellow-300"} `} />
                </span>
                <Label
                    name={`최대: ${maxChoice}`}
                    containerStyles='px-2 bg-blue-300 shadow hover:shadow-inner cursor-default'
                    contentStyles='text-xs text-white font-light' />
            </div>
            {toggleState ? <SelectChoice choice={choice} maxChoice={maxChoice} /> : <NumChart data={choiceData} />}
        </form>
    )
}