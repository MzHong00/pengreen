import { useState, useEffect } from "react";

import { fetchChoice, fetchPick } from "../../fetch/choice";
import Label from "./label";

import styles from './console.module.css';

export default function PchoiceForm({ user, vote_id = "", max_choice, choice = [], setChoice }) {
    const [count, setCount] = useState(0);
    const [alreadyPick, setAlreadyPick] = useState(false);
    const [userPick, setUserPick] = useState("");

    useEffect(() => {
        const fetchChoiceChecked = async () => {
            const pick = await fetchPick(user.id, vote_id);

            let picks_text = "";
            for (let element of pick) {
                picks_text += element.content + '\n';
            }

            setUserPick(picks_text);
            setAlreadyPick(pick.length !== 0);
        }

        fetchChoiceChecked();
    }, [user.id, vote_id, alreadyPick, choice]);

    const limit_check = (e) => {
        const isChecked = e.target.checked;

        if (isChecked && count < max_choice) {
            setCount(prev => prev + 1);
        } else if (!isChecked) {
            setCount(prev => prev - 1);
        } else {
            e.preventDefault(); // 선택 제한 조건을 충족하지 않으면 체크박스 변경을 취소합니다.
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let selectedChoice = [];
        const choiceList = Array.from(e.target.form.children[1].children);

        choiceList.forEach((ele) => {
            if (ele.children[0].checked) {
                selectedChoice.push(ele.children[1].innerText);
            }
        })

        if (selectedChoice.length === 0) {
            console.log("Pick 없음");
            return;
        }

        const updatedChoice = await fetchChoice(user.id, vote_id, selectedChoice);
        setChoice(updatedChoice);
        setAlreadyPick(true);
    }

    return (
        <form className='h-full'>
            <div className={`relative flex h-4 gap-2 mb-2`}>
                <span className={`flex ${alreadyPick && styles.console}`} data-username={user.name} data-pick={userPick}>
                    <input
                        type="submit"
                        value={`${!alreadyPick ? "제출" : "수정"}`}
                        onClick={submitHandler}
                        className={`px-2 shadow hover:shadow-inner text-xs text-white font-light rounded-3xl cursor-pointer ${!alreadyPick ? "bg-blue-300" : "bg-yellow-300"} `} />
                </span>
                <Label
                    name={`최대: ${max_choice}`}
                    containerStyles='px-2 bg-blue-300 shadow hover:shadow-inner cursor-default'
                    contentStyles='text-xs text-white font-light' />
            </div>
            <div className="h-40 flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
                {
                    choice.map((value, idx) =>
                        <div key={idx} className="w-fit flex items-center gap-2">
                            <input type="checkbox" id={value.id} onClick={limit_check} className="w-4 h-4" />
                            <label htmlFor={value.id} className={`text-sm font-normal truncate`}>{value.content}</label>
                        </div>)
                }
            </div>
        </form>
    )
}