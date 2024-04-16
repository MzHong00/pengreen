import { client } from './index';

export async function mongodbAggregate(
    col: string,
    pipeline: Array<Object>,
): Promise<any> {
    try {
        const database = client.db("pengreen");
        const selected_collection = database.collection(col);

        const cursor = selected_collection.aggregate(pipeline);
        const data = await cursor.toArray(); // 정렬된 데이터를 배열로 변환

        return data;
    } catch (error) {
        throw error
    }
}