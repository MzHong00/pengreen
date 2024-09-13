import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { CgArrowAlignV } from "@react-icons/all-files/cg/CgArrowAlignV";

import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

import { TextChoiceInput } from "../input/textChoiceInput";
import {
  useAddChoice,
  useSetChoiceList,
  useSwapItemsByDrag,
} from "../../model/choiceList";
import { Button } from "shared/ui/Button";
import { ImageChoiceInput } from "../input/imageChoiceInput";

interface Props {
  isVoteText: boolean;
}

export const DraggableChoiceList = ({ isVoteText }: Props) => {
  const { newChoice, addChoice, addChoiceByEnterKey, onChangeNewChoice } =
    useAddChoice();
  const { choiceList, removeChoice, updateChoice } = useSetChoiceList();
  const { onDragEnd } = useSwapItemsByDrag();

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {choiceList.map((choice, idx) => (
                <Draggable key={choice} draggableId={choice} index={idx}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      {isVoteText ? (
                        <TextChoiceInput
                          name="choice"
                          defaultValue={choice}
                          dataIndex={idx}
                          icon={<IoMdClose color="red" size={18} />}
                          onClickIcon={removeChoice}
                          onKeyDown={updateChoice}
                        >
                          <Button {...provided.dragHandleProps}>
                            <CgArrowAlignV size={18} color="silver" />
                          </Button>
                        </TextChoiceInput>
                      ) : (
                          <ImageChoiceInput
                            name="choice"
                            defaultValue={choice}
                            dataIndex={idx}
                            onClickCloseButton={removeChoice}
                            onKeyDown={updateChoice}
                          >
                            <Button {...provided.dragHandleProps}>
                            <CgArrowAlignV size={18} color="silver" />
                          </Button>
                          </ImageChoiceInput>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TextChoiceInput
        icon={<FaPlus color="#0099FF" size={18} />}
        onClickIcon={addChoice}
        placeholder="항목"
        value={newChoice}
        onChange={onChangeNewChoice}
        onKeyDown={addChoiceByEnterKey}
      />
    </div>
  );
};
