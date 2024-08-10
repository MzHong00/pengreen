import { MongoClient } from "mongodb";

import config from "../config";
const uri = `mongodb+srv://admin:${config.mongodbPassword}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;

export default new MongoClient(uri);