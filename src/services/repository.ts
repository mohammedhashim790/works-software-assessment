import {MongoDbConnection} from "../bloc/database/mongo-db-connection";
import {Collection, ObjectId} from "mongodb";

export abstract class Repository<T> {
    protected collection: Collection;

    protected constructor(collectionName:string) {
        this.collection = MongoDbConnection.instance.database.collection(collectionName)
    }

    abstract insert(obj: T): Promise<T>;

    abstract update(obj: T): Promise<T>;

    abstract delete(obj: string): Promise<boolean>;

    abstract get(id: ObjectId): Promise<T | null>;

    abstract list(): Promise<T[]>;


}
