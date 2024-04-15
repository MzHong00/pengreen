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
                        className={`px-2 shadow hover:shadow-inner text-xs text-white font-light rounded cursor-pointer ${!myPick ? "bg-sky-300" : "bg-green-300"} `} />
                </span>
                <div className='flex justify-center items-center rounded gap-1 px-2 bg-sky-300 shadow hover:shadow-inner cursor-default'>
                    <div className='text-xs text-white font-light'>
                        <span>{`선택: ${maxChoice}`}</span>
                    </div>
                </div>
            </div>
            {toggleState ? <SelectChoice choice={choice} maxChoice={maxChoice} /> : <NumChart data={choiceData} />}
        </form>
    )
}