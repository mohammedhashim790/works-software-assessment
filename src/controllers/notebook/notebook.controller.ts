import {Router} from "express";

import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";
import {NotebookRepository} from "../../services/notebook.repository";
import {BadRequest} from "../../bloc/errors/BadRequest";

export const noteBookControllerRoutes = Router();

noteBookControllerRoutes.get('/', async (req, res) => {
    try {
        const noteBooks = await new NotebookRepository().list();
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to list notebook', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});

noteBookControllerRoutes.post('/create', async (req, res) => {
    try {
        if (!req.body) {
            throw new BadRequest('Body is Empty');
        }
        const noteBooks = await new NotebookRepository().insert(req.body);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to create notebook', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to create notebook', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notebook', err);
    }
});

noteBookControllerRoutes.put('/delete/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new BadRequest('Id is required');
        }
        const noteBooks = await new NotebookRepository().delete(req.params.id);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to delete notebook', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to delete notebook', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to delete notebook', err);
    }
});

noteBookControllerRoutes.post('/update', async (req, res) => {
    try {
        if (!req.body) {
            throw new BadRequest('Body is Empty');
        }
        const noteBooks = await new NotebookRepository().update(req.body);
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to update notebook', err);
        if (err instanceof BadRequest) {
            ResponseStatus.BAD_REQUEST(res, 'Failed to update notebook', err.message);
            return;
        }
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to update notebook', err);
    }
});
