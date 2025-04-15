import {Router} from "express";

import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";

export const noteBookControllerRoutes = Router();

noteBookControllerRoutes.get('/', async (req, res) => {
    try {
        // const notes = await new NoteRepository().list();
        ResponseStatus.OK(res, '');
    } catch (err) {
        logError('Failed to list notes', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});
