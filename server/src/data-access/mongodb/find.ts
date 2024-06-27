import { FindOptions, type Document, type Filter } from "mongodb";
import { client } from "../../loaders/mongodb";

export const mongodbFind = async (
  col: string,
  query: Filter<Document>,
  option?: FindOptions<Document>
): Promise<any> => {
  try {
    const database = client.db("pengreen");
    const selected_collection = database.collection(col);

    const cursor = selected_collection.find(query, option);
    const data = await cursor.toArray(); // 커서를 배열로 변환

    return data;
  } catch (error) {
    throw error;
  }
};

export const mongodbFindOne = async (
  col: string,
  query: Filter<Document>,
  option?: FindOptions<Document>
): Promise<any> => {
  try {
    const database = client.db("pengreen");
    const selected_collection = database.collection(col);

    const data = await selected_collection.findOne(query, option);

    return data;
  } catch (error) {
    throw error;
  }
};
