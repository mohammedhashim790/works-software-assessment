import {Db, MongoClient, ServerApiVersion} from 'mongodb';
import assert from "node:assert";
import {logInfo} from "../utils/logger";

export class MongoDbConnection {

    private _uri: string | undefined = process.env.MONGODB_URL;
    private _databaseName: string | undefined = process.env.DB_NAME;
    private client: MongoClient | undefined;

    private constructor() {
    }

    private static _instance: MongoDbConnection;

    public static get instance() {
        if (this._instance == null) {
            this._instance = new MongoDbConnection();
        }
        return this._instance;
    }

    private _database!: Db;

    get database(): Db {
        return this._database;
    }

    public async connect(): Promise<MongoClient> {
        assert(this._uri, "Mongo DB URI is undefined.");
        if (this.client) {
            return this.client;
        }
        this.client = new MongoClient(this._uri, {
            serverApi: {
                version: ServerApiVersion.v1, strict: true, deprecationErrors: true,
            }
        });
        await this.client.connect();
        this._database = this.client.db(this._databaseName);
        return this.client;
    }

    private async testConnection(): Promise<void> {
        try {
            assert(this._uri, "Mongo DB URI is undefined.");
            await this.client?.connect();
            await this.client?.db("admin").command({ping: 1});
            logInfo("Pinged MongoDB.", "Connection Successful");
        } catch (error) {
            throw error;
        } finally {
            await this.client?.close();
        }
    }


}
