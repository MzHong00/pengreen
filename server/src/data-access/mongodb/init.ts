import { MongoClient } from "mongodb";
import config from "../../config";

const uri = `mongodb+srv://admin:${config.mongodb_password}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;
export const client = new MongoClient(uri);