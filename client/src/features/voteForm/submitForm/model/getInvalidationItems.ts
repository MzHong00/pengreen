import { type VoteFormDto } from "entities/voteForm";

export const getInvalidationItems = (vote: Omit<VoteFormDto, 'owner'>) => {
    const invalidationItems = [];

    if(!vote.title) invalidationItems.push("제목");
    if(vote.choice.length < 2) invalidationItems.push("투표");
    if(!vote.category) invalidationItems.push("카테고리")

    return invalidationItems;
}