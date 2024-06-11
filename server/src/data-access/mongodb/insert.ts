import { client } from "../../loaders/mongodb";

export async function mongodbInsert<T>(col: string, data: T) {
  try {
    const database = client.db("pengreen");
    const collection_data = database.collection<any>(col);

    const result = await collection_data.insertOne(data);
    console.log(`${col} 컬렉션에 ${data}입력 성공`);
  } catch (error) {
    throw error;
  }
}
