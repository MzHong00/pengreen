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