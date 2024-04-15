import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa"

export type SortType = "likes" | "participant"

interface SortTypes {
    text: SortType
    img: React.JSX.Element
}

export const sortTypes: SortTypes[] = [
    {
        text: 'likes',
        img: <IoMdHeart color='red' />
    },
    {
        text: 'participant',
        img: <FaUser/>
    },
]