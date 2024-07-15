import { type VoteFormDto } from "entities/voteForm";

export const getInvalidationItems = (vote: VoteFormDto) => {
    const invalidationItems = [];

    if(!vote.title) invalidationItems.push("제목");
    if(vote.choice.length < 2) invalidationItems.push("투표 항목");

    return invalidationItems;
}