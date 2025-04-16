import express from "express";
import {logError, logInfo} from "./bloc/utils/logger";
import {MongoDbConnection} from "./bloc/database/mongo-db-connection";
import {noteControllerRoutes} from "./controllers/note/note.controller";
import {noteBookControllerRoutes} from "./controllers/notebook/notebook.controller";

// Load Environment variables;
import bodyParser from "body-parser";

require('dotenv').config({path: '../.env'});
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;


async function main() {
    try {
        await MongoDbConnection.instance.connect();
        app.listen(port, () => {
            logInfo(`Server is running on port ${port}`);
        });
    } catch (error) {
        logError('Server Failed to start', error);
    }
}

app.use('/note', noteControllerRoutes);

app.use('/notebook', noteBookControllerRoutes);


main();

// async function doJob() {
//     const mongo = MongoDbConnection.instance;
//
//     await mongo.connect();
//     const noteRepository = new NoteRepository();
//
//     const id = new ObjectId();
//     const noteBookId = new ObjectId();
//     // //
//     await noteRepository.insert({_id: id, noteBookTitle: '', notebookId: noteBookId, content: ''});
//
//     const note = await noteRepository.get(new ObjectId(id));
//
//     const notes = await noteRepository.list();
// }







