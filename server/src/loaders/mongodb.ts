import { MongoClient } from "mongodb";
import config from "../config";

const uri = `mongodb+srv://admin:${config.mongodbPassword}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;

export const client = new MongoClient(uri);

export { mongodbInsert } from "../data-access/mongodb/insert";
export { mongodbFind, mongodbFindOne } from "../data-access/mongodb/find";
export { mongodbAggregate } from "../data-access/mongodb/aggregate";
export { mongodbUpdate } from "../data-access/mongodb/update";
export { mongodbRemove } from "../data-access/mongodb/remove";
