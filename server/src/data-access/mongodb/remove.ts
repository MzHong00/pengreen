import { client } from "../../loaders/mongodb";

export async function mongodbRemove(col: string, query: Object): Promise<void> {
  const database = client.db("pengreen");
  const movies = database.collection(col);

  const result = await movies.deleteMany(query);

  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  } else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }
}
