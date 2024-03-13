import { client } from './index'

export async function mongodbUpdate<T>(
    col: string,
    data?: T
) {
    const database = client.db("pengreen");
    const movies = database.collection<any>(col);
    
    const query = {name:"jm"}
    const result = await movies.updateOne(
        query,
        {
            $set: {
                name: `mz`,
            },
        },
        /* Set the upsert option to insert a document if no documents
        match the filter */
        { upsert: true }
    );
    // Print the number of matching and modified documents
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
}