import { client } from './index';

export async function mongodbFind(
    col: string,
    query: Object
) {
    try {
        const database = client.db("pengreen");
        const selected_collection = database.collection(col);
        
        const cursor = selected_collection.find(query);
        const data = await cursor.toArray(); // 커서를 배열로 변환
        
        return data;
    } catch(error) {
        console.log(error);
    }
}