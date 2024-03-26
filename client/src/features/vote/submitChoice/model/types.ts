export interface VotePickDto {
    user_id?: string;
    vote_id?: string;
    selected?: Array<string>
}

export interface VoteChoiceDto {
    user_id?: string;
    vote_id: string;
    choiceList?: Array<string>
}