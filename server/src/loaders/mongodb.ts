import { MongoClient } from "mongodb";

import config from "../config";
import { MongoDBService } from "../data-access/mongodb";

const uri = `mongodb+srv://admin:${config.mongodbPassword}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;
const client = new MongoClient(uri);

export default new MongoDBService(client, "pengreen");