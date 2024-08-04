import { User } from "../types/user";

export const toUserFormat = (userData: any): User => {
    return {
        _id: userData._id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture
    };
};