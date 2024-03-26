import { useReadLike, useUpdateLike } from "../model/queries"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface Liker {
    _id?: string;
    userId: string;
    voteId: string;
}

export function UpdateLike({
    userId, voteId
}: Liker) {
    const { data } = useReadLike(userId, voteId);
    const updateHandler = useUpdateLike(userId, voteId);
    
    return (
        <div className='flex items-center'>
            {
                data?.isLiker ?
                    <IoMdHeart onClick={updateHandler} className='cursor-pointer' /> :
                    <IoMdHeartEmpty onClick={updateHandler} className='cursor-pointer' />
            }
            <span className='text-base'>{data?.likesCount}</span>
        </div>
    )
}