import Label from "shared/ui/label";

import styles from './choice.module.css';

import { NumChart } from "entities/chart/numChart";
import { SelectChoice } from "features/vote/selectChoice";

import { useUserFetch } from "features/authentication/login";
import { useReadEachChoiceCount, useReadMyPick } from "../model/queries";
import { useToggle } from "shared/hooks/useToggle";
import { useSubmitChoice } from "../model/submitChoice";

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
    const { data: myPick } = useReadMyPick(user?._id, voteId);
    const { state: toggleState, handler: toggleHandler } = useToggle({});
    const submitHandler = useSubmitChoice(user?._id, voteId);
    
    return (
        <form className='h-full'>
            <div className={`relative flex h-4 gap-2 mb-2`}>
                <span className={`flex ${myPick && styles.console}`} data-username={user?.name} data-pick={myPick && myPick.join("\n")}>
                    <input
                        type="submit"
                        value={`${!toggleState ? "참여" : "제출"}`}
                        onClick={(event) => {
                            toggleHandler();
                            submitHandler(event);
                        }}
                        className={`px-2 shadow hover:shadow-inner text-xs text-white font-light rounded cursor-pointer ${!myPick ? "bg-[#4b4b4b]" : "bg-purple-600/30"} `} />
                </span>
                <Label
                    name={`최대: ${maxChoice}`}
                    containerStyles='px-2 bg-[#7b7b7b] shadow hover:shadow-inner cursor-default'
                    contentStyles='text-xs text-white font-light' />
            </div>
            {toggleState ? <SelectChoice choice={choice} maxChoice={maxChoice} /> : <NumChart data={choiceData} />}
        </form>
    )
}