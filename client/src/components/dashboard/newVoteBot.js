import CreateItem from "./createItem";

export default function NewVoteBot({ setItems }) {


    return (
        <div className={`flex`}>
            <div className={`flex items-center w-full h-full`}>
                <CreateItem setItems={setItems} sizeClass={'w-full h-10'}/>
            </div>
        </div>
    )
}