import { FindOptions, type Document, type Filter } from "mongodb";
import mongoClient from "../loaders/mongodb";

export async function mongodbInsert<T>(col: string, data: T) {
  try {
    const database = mongoClient.db("pengreen");
    const collection_data = database.collection<any>(col);

    const result = await collection_data.insertOne(data);
    console.log(`${col} 컬렉션에 ${data}입력 성공`);
  } catch (error) {
    throw new Error(`MongoDb Insert Error in ${error}`);
  }
}

export const mongodbFind = async (
  col: string,
  query: Filter<Document>,
  option?: FindOptions<Document>
): Promise<any> => {
  try {
    const database = mongoClient.db("pengreen");
    const selected_collection = database.collection(col);

    const cursor = selected_collection.find(query, option);
    const data = await cursor.toArray(); // 커서를 배열로 변환

    return data;
  } catch (error) {
    throw new Error(`MongoDb Read Error in ${error}`);
  }
};

export const mongodbFindOne = async (
  col: string,
  query: Filter<Document>,
  option?: FindOptions<Document>
): Promise<any> => {
  try {
    const database = mongoClient.db("pengreen");
    const selected_collection = database.collection(col);

    const data = await selected_collection.findOne(query, option);

    return data;
  } catch (error) {
    throw new Error(`MongoDb ReadOne Error in ${error}`);
  }
};

export async function mongodbUpdate<T>(
  col: string,
  query: Object,
  update: Object,
  data?: T
) {
  try {
    const database = mongoClient.db("pengreen");
    const movies = database.collection<any>(col);

    const result = await movies.updateOne(query, update, { upsert: true });

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    throw new Error(`MongoDb Update Error in ${error}`);
  }
}

export async function mongodbRemove(col: string, query: Object): Promise<void> {
  try {
    const database = mongoClient.db("pengreen");
    const movies = database.collection(col);

    const result = await movies.deleteMany(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    throw new Error(`MongoDb Remove Error in ${error}`);
  }
}

export async function mongodbAggregate(
  col: string,
  pipeline: Array<Object>
): Promise<any> {
  try {
    const database = mongoClient.db("pengreen");
    const selected_collection = database.collection(col);

    const cursor = selected_collection.aggregate(pipeline);
    const data = await cursor.toArray(); // 정렬된 데이터를 배열로 변환

    return data;
  } catch (error) {
    throw new Error(`MongoDb Aggregate Error in ${error}`);
  }
}
