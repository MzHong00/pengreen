import { client } from "../../loaders/mongodb";

export async function mongodbFind(
  col: string,
  query: Object,
  sort?: any,
  projection?: any
): Promise<any> {
  try {
    const database = client.db("pengreen");
    const selected_collection = database.collection(col);

    const cursor = selected_collection.find(query, {
      sort: sort,
      projection: projection,
    });
    const data = await cursor.toArray(); // 커서를 배열로 변환

    return data;
  } catch (error) {
    throw error;
  }
}

export async function mongodbFindOne(
  col: string,
  query: Object,
  sort?: any,
  projection?: any
): Promise<any> {
  try {
    const database = client.db("pengreen");
    const selected_collection = database.collection(col);

    const data = await selected_collection.findOne<any>(query, {
      sort: sort,
      projection: projection,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
