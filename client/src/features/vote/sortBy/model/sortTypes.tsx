import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa"

export type SortType = "like" | "participant"

interface SortTypes {
    text: SortType
    img: React.JSX.Element
}

export const sortTypes: SortTypes[] = [
    {
        text: 'like',
        img: <IoMdHeart color='red' />
    },
    {
        text: 'participant',
        img: <FaUser/>
    },
]