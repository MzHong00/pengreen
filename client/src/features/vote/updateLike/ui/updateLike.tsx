import { useLikerCheck } from "../model/likerCheck";
import { useUpdateLike } from "../model/queries"
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

interface Props {
    userId: string;
    voteId: string;
    likeMember: Array<string> | undefined
}

export function UpdateLike({
    userId, voteId, likeMember = []
}: Props) {
    
    const isLiker= useLikerCheck(userId, likeMember);
    const updateHandler = useUpdateLike(userId, voteId);  
    
    return (
        <div className='flex items-center'>
            {
                isLiker ?
                    <IoMdHeart onClick={updateHandler} className='cursor-pointer' color="red"/> :
                    <IoMdHeartEmpty onClick={updateHandler} className='cursor-pointer' />
            }
            <span className='text-base'>{likeMember.length}</span>
        </div>
    )
}