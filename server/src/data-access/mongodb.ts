import {
  AnyBulkWriteOperation,
  BulkWriteOptions,
  FindOptions,
  MongoClient,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  type Document,
  type Filter,
} from "mongodb";

export class MongoDBService {
  private db;

  constructor(private client: MongoClient, private dbName: string) {
    this.db = client.db(dbName);
  }

  // 컬렉션을 가져오는 메서드
  private getCollection<T extends Document>(col: string) {
    return this.db.collection<T>(col);
  }

  // 커스텀 에러 핸들링 메서드
  private customError(action: string, error: any): never {
    throw new Error(`MongoDB ${action} Error: ${error.message || error}`);
  }

  async insert<T extends Document>(
    col: string,
    data: OptionalUnlessRequiredId<T>
  ): Promise<void> {
    try {
      const collection = this.getCollection<T>(col);
      await collection.insertOne(data);
      console.log(`${col} 컬렉션에 데이터 입력 성공`);
    } catch (error) {
      this.customError("Insert", error);
    }
  }

  async find<T extends Document>(
    col: string,
    query: Filter<T>,
    options?: FindOptions<T>
  ): Promise<T[]> {
    try {
      const collection = this.getCollection<T>(col);
      return (await collection.find(query, options).toArray()) as T[];
    } catch (error) {
      this.customError("Find", error);
    }
  }

  async findOne<T extends Document>(
    col: string,
    query: Filter<T>,
    options?: FindOptions<T>
  ): Promise<T | null> {
    try {
      const collection = this.getCollection<T>(col);
      return await collection.findOne(query, options);
    } catch (error) {
      this.customError("FindOne", error);
    }
  }

  async update<T extends Document>(
    col: string,
    query: Filter<T>,
    update: UpdateFilter<T>,
    options?: UpdateOptions
  ): Promise<void> {
    try {
      const collection = this.getCollection<T>(col);
      const result = await collection.updateOne(query, update, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) updated`
      );
    } catch (error) {
      this.customError("Update", error);
    }
  }

  async remove<T extends Document>(
    col: string,
    query: Filter<T>
  ): Promise<void> {
    try {
      const collection = this.getCollection<T>(col);
      const result = await collection.deleteMany(query);
      console.log(`Deleted ${result.deletedCount} document(s)`);
    } catch (error) {
      this.customError("Remove", error);
    }
  }

  async aggregate<T extends Document>(
    col: string,
    pipeline: Document[]
  ): Promise<T[]> {
    try {
      const collection = this.getCollection<T>(col);
      return (await collection.aggregate(pipeline).toArray()) as T[];
    } catch (error) {
      this.customError("Aggregate", error);
    }
  }

  async bulkWrite<T extends Document>(
    col: string,
    operations: AnyBulkWriteOperation<T>[],
    options?: BulkWriteOptions
  ): Promise<void> {
    try {
      const collection = this.getCollection<T>(col);
      const result = await collection.bulkWrite(operations, options);
      console.log(
        `${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} document(s) updated`
      );
    } catch (error) {
      this.customError("BulkWrite", error);
    }
  }
}
