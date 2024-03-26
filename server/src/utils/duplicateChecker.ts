import { mongodbFindOne } from "../data-access/mongodb";

export const duplicateChecker = async (
    collection: string, checkQuery: Object
): Promise<boolean> => {
    try {
        const duplication: Object = await mongodbFindOne(collection, checkQuery);
        const isDuplication: boolean = !!duplication;

        return isDuplication;
    } catch (error) {
        throw error
    }
}