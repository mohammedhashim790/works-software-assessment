import {Repository} from "./repository";
import {Note} from "../bloc/models/note.model";
import {ObjectId} from "mongodb";
import {logInfo} from "../bloc/utils/logger";

export class NoteRepository extends Repository<Note> {

    constructor() {
        super("note");
    }

    async insert(note: Note): Promise<Note> {
        await this.collection.insertOne(note);
        return note;
    }


    async list(): Promise<Note[]> {
        return (await this.collection.find().toArray()) as Note[];
    }


    async get(id: ObjectId): Promise<Note | null> {
        const res = await this.collection.find({_id:id}).toArray();
        return (res[0]) as Note;
    }


    async update(note: Note): Promise<Note> {
        const updatedNote = note;
        delete updatedNote['_id'];
        await this.collection.updateOne({_id: new ObjectId(note._id)}, {$set: updatedNote});
        return updatedNote;
    }


    async delete(note: Note): Promise<Note> {
        await this.collection.deleteOne({_id: new ObjectId(note._id)});
        return note;
    }

}



