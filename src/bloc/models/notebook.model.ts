import {ObjectId} from "mongodb";

export interface NoteBook {
    id?: ObjectId;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CreateNotebookInput {
    title: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface UpdateNotebookInput {
    id: ObjectId;
    title?: string;
    updatedAt: Date;
}


export interface DeleteNotebookInput {
    id: ObjectId;
}


export interface GetNotebookInput {
    id: ObjectId;
}
