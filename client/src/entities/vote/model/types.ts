export interface VoteActionDto {
    user_id: string;
    vote_id: string;
    choiceList: Array<string>;
}