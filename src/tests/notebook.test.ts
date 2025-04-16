import request from 'supertest';
import {ObjectId} from "mongodb";
import express from "express";
import {MongoDbConnection} from "../bloc/database/mongo-db-connection";
import {noteBookControllerRoutes} from "../controllers/notebook/notebook.controller";


const app = express();
app.use(express.json());
app.use('/notebook', noteBookControllerRoutes);

describe('notebook API Testing', () => {
    let createdNoteId: ObjectId;

    const mockNote = {
        noteBookTitle: "Test Title", content: "Test Content", notebookId: new ObjectId(),
    };

    beforeAll(async () => {
        process.env.DB_NAME = 'test_db';
        await MongoDbConnection.instance.connect();
    });


    it('should create a new notebook', async () => {
        const res = await request(app)
            .post('/notebook/create')
            .send(mockNote)
            .expect(200);

        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data.noteBookTitle).toBe(mockNote.noteBookTitle);
        createdNoteId = res.body.data._id;
    });


    it('should get the created notebook using created id', async () => {
        const res = await request(app)
            .get(`/notebook/${createdNoteId}`)
            .expect(200);

        expect(res.body.data._id).toBe(createdNoteId);
        expect(res.body.data.noteBookTitle).toBe(mockNote.noteBookTitle);
    });


    it('should update the notebook content', async () => {
        const updatedContent = 'Updated content New Version';
        const res = await request(app)
            .post(`/notebook/update`)
            .send({...mockNote, content: updatedContent, _id: createdNoteId})
            .expect(200);

        expect(res.body.data.content).toBe(updatedContent);
    });


    it('should delete the notebook', async () => {
        await request(app)
            .delete(`/notebook/delete/${createdNoteId}`)
            .expect(200);
    });
});
