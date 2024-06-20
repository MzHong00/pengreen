import { createVote } from "entities/vote";

export default function PublicButton({ vote }) {
    const submitHandler = () => {
        createVote(vote);
    }

    return (
        <input
            type="button"
            value='게시'
            onClick={submitHandler}
            className={`w-12 h-10 flex justify-center items-center bg-gradient-to-br from-cyan-100 to-blue-200 rounded-xl shadow-lg cursor-pointer hover:shadow-inner text-sm`} />
    )
}