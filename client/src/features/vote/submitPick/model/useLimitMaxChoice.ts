import { useState } from "react";

import { ChoiceDto } from "entities/vote/choice";
import { VoteDto } from "entities/vote/vote";

export const useLimitChoiceCount = (max_choice: VoteDto["max_choice"]) => {
  const [selectedChoices, setSelectedChoices] = useState<
    ChoiceDto["content"][]
  >([]);

  const limitChoiceCount = (choice: ChoiceDto["content"]) => {
    setSelectedChoices((prevChoice) => {
      // 선택을 해제
      if (prevChoice.includes(choice)) {
        return prevChoice.filter((content) => content !== choice);
      }

      return prevChoice.length >= max_choice
        ? [...prevChoice.slice(1), choice]
        : [...prevChoice, choice];
    });
  };

  return {
    selectedChoices: selectedChoices,
    limitChoiceCount: limitChoiceCount,
  };
};
