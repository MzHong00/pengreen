import { User } from "../models/user";
import { Vote } from "../models/vote";

export const toUserFormat = (userData: any): User => {
    
    return {
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture
    };
};

export const toVoteFormat = (data: any): Vote => {
    return {
        _id: data._id,
        owner: toUserFormat(data.owner),
        title: data.title,
        max_choice: data.max_choice,
        start_time: data.start_time,
        deadline: data.deadline,
        choice: data.choice,
        like: data.like,
        participant: data.participant
    }
}