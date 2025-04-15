import {Repository} from "./repository";
import {ObjectId} from "mongodb";
import {NoteBook} from "../bloc/models/notebook.model";

export class NotebookRepository extends Repository<NoteBook> {

    constructor() {
        super("notebook");
    }

    async insert(noteBook: NoteBook): Promise<NoteBook> {
        await this.collection.insertOne(noteBook);
        return noteBook;
    }


    async list(): Promise<NoteBook[]> {
        return (await this.collection.find().toArray()) as NoteBook[];
    }


    async get(id: ObjectId): Promise<NoteBook | null> {
        const res = await this.collection.find({_id: id}).toArray();
        return (res[0]) as NoteBook;
    }


    async update(noteBook: NoteBook): Promise<NoteBook> {
        const updatedNotebook = {...noteBook};
        delete updatedNotebook['_id'];
        await this.collection.updateOne({_id: new ObjectId(noteBook._id)}, {$set: updatedNotebook});
        return updatedNotebook;
    }

    async delete(id: string): Promise<boolean> {
        const res = await this.collection.deleteOne({_id: new ObjectId(id)});
        return res.deletedCount > 0;
    }

}



