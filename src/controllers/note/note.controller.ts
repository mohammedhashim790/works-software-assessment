import {Router} from 'express';
import {NoteRepository} from "../../services/note.repository";
import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";
import {BadRequest} from "../../bloc/errors/BadRequest";

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

noteControllerRoutes.post('/create', async (req, res) => {
    try {
        if (!req.body) {
            throw new BadRequest('Body is Empty');
        }
        const noteBooks = await new NoteRepository().insert(req.body);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to create note', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to create note', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list note', err);
    }
});

noteControllerRoutes.put('/delete/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new BadRequest('Id is required');
        }
        const noteBooks = await new NoteRepository().delete(req.params.id);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to delete note', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to delete note', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to delete note', err);
    }
});

noteControllerRoutes.post('/update', async (req, res) => {
    try {
        if (!req.body) {
            throw new BadRequest('Body is Empty');
        }
        const noteBooks = await new NoteRepository().update(req.body);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to update note', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to update note', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to update note', err);
    }
});




