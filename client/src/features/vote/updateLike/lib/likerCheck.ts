import { useEffect, useState } from "react";

export const useLikerCheck = (userId: string, likeMember: Array<string>) => {
    const [isLiker, setIsLiker] = useState(false);

    useEffect(() => {
        const isLikerInclude = likeMember.includes(userId);
        setIsLiker(isLikerInclude)
    }, [likeMember, userId])

    return isLiker;
}