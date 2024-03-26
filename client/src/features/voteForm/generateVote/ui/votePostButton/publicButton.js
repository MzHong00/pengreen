import { createVote } from "shared/api";

export default function PublicButton({ vote }) {
    const submitHandler = () => {
        createVote(vote);
    }

    return (
        <input type="button" value='게시' onClick={submitHandler}
            className={`w-[10%] h-full flex justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg cursor-pointer hover:shadow-inner text-sm`} />
    )
}