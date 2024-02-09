import { createContext, useState, useMemo } from "react";

import VoteForm from "../vote/voteForm";
import Dialog from './dialog'

export const ItemContext = createContext();

export default function PvoteCreator({ setModalOpen }) {
    const getInitialDate = useMemo(() => {
        const oneDayLater = new Date().setTime(new Date().getTime() + 24 * 60 * 60 * 1000);
        return new Date(oneDayLater).toISOString().slice(0, 16);
    }, [])

    const [items, setItems] = useState({
        title: "",
        choice: [],
        max_choice: 1,
        deadline: getInitialDate
    });
    
    const voteForm = () => 
    <ItemContext.Provider value={{ items, setItems }}>
        <VoteForm />
    </ItemContext.Provider>

    return (
        <Dialog
            contentsComponent={voteForm}
            setModalOpen={setModalOpen}
            dialogStyles={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 !p-0`}
            outsideStyles={'bg-black/40'} />
    )
}