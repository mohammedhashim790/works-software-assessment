import request from 'supertest';
import {ObjectId} from "mongodb";
import express from "express";
import {noteControllerRoutes} from "../controllers/note/note.controller";
import {MongoDbConnection} from "../bloc/database/mongo-db-connection";


const app = express();
app.use(express.json());
app.use('/note', noteControllerRoutes);

describe('Note API Testing', () => {
    let createdNoteId: ObjectId;

    const mockNote = {
        noteBookTitle: "Test Title", content: "Test Content", notebookId: new ObjectId(),
    };

    beforeAll(async () => {
        process.env.DB_NAME = 'test_db';
        await MongoDbConnection.instance.connect();
    });


    it('should create a new note', async () => {
        const res = await request(app)
            .post('/note/create')
            .send(mockNote)
            .expect(200);

        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.noteBookTitle).toBe(mockNote.noteBookTitle);
        createdNoteId = res.body.data._id;
    });


    it('should get the created note using created id', async () => {
        const res = await request(app)
            .get(`/note/${createdNoteId}`)
            .expect(200);

        expect(res.body.data._id).toBe(createdNoteId);
        expect(res.body.data.noteBookTitle).toBe(mockNote.noteBookTitle);
    });


    it('should update the note content', async () => {
        const updatedContent = 'Updated content New Version';
        const res = await request(app)
            .post(`/note/update`)
            .send({...mockNote, content: updatedContent, _id: createdNoteId})
            .expect(200);

        expect(res.body.data.content).toBe(updatedContent);
    });


    it('should delete the note', async () => {
        await request(app)
            .delete(`/note/delete/${createdNoteId}`)
            .expect(200);
    });
});
