import {ObjectId} from "mongodb";

export interface Note {
    _id?: ObjectId;
    noteBookTitle: string;
    content: string;
    notebookId: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface CreateNoteInput extends Note {

}


export interface UpdateNoteInput {
    id: ObjectId;
    noteBookTitle?: string;
    updatedAt: Date;
}


export interface DeleteNoteInput {
    id: ObjectId;
}


export interface GetNoteInput {
    id: ObjectId;
}
