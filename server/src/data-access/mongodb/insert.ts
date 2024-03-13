import { client } from './index'

export async function mongodbInsert<T>(
    col: string,
    data: T
) {
    try {
        const database = client.db("pengreen");
        const collection_data = database.collection<any>(col);
        
        const result = await collection_data.insertOne(data);
        console.log(`A document in ${col} was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
        console.log(error);
    }
}