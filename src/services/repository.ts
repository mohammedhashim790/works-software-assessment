import {MongoDbConnection} from "../bloc/database/mongo-db-connection";
import {Collection, ObjectId} from "mongodb";

export abstract class Repository<T> {
    protected collection: Collection;

    protected constructor(collectionName:string) {
        this.collection = MongoDbConnection.instance.database.collection(collectionName)
    }

    /**
     * insert a document onto MongoDB collection
     * @param obj
     * @return Document
     */
    abstract insert(obj: T): Promise<T>;

    /**
     * Update a document in the MongoDB collection
     * @param obj
     * @return updated Document
     */
    abstract update(obj: T): Promise<T>;

    /**
     * deletes a document from MongoDB collection
     * @param id
     * @return true, if deletion successful, else false.
     */
    abstract delete(id: string): Promise<boolean>;

    /**
     * Get a document by its _id.
     * @param id
     * @return Document or null
     */
    abstract get(id: ObjectId): Promise<T | null>;

    /**
     * Returns Lists of Documents from the collection
     * @return Array<Document>
     */
    abstract list(): Promise<T[]>;


}
