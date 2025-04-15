import {Router} from 'express';
import {NoteRepository} from "../../services/note.repository";
import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";

export const noteControllerRoutes = Router();

noteControllerRoutes.get('/', async (req, res) => {
    try {
        const notes = await new NoteRepository().list();
        ResponseStatus.OK(res, notes);
    } catch (err) {
        logError('Failed to list notes', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});



