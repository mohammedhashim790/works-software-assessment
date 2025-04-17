import {Router} from 'express';
import {NoteRepository} from "../../services/note.repository";
import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";
import {BadRequest} from "../../bloc/errors/BadRequest";
import {ObjectId} from "mongodb";

export const noteControllerRoutes = Router();

/**
 * @route GET /note/
 * @description Fetches list of all notes
 * @returns {Note[]} 200 - An array of note objects
 * @returns {string} 500 - Internal server error message
 */
noteControllerRoutes.get('/', async (req, res) => {
    try {
        const notes = await new NoteRepository().list();
        ResponseStatus.OK(res, notes);
    } catch (err) {
        logError('Failed to list notes', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});

/**
 * @route GET /note/:id
 * @description Fetch a single note by its ObjectId
 * @param {string} id - The ID of the note (MongoDB ObjectId)
 * @returns {Note} 200 - The note object
 * @returns {string} 400 - Bad request if ID is missing or invalid
 * @returns {string} 500 - Internal server
*/
noteControllerRoutes.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new BadRequest('Id is required');
        }
        const notes = await new NoteRepository().get(new ObjectId(req.params.id));
        ResponseStatus.OK(res, notes);
    } catch (err) {
        logError('Failed to list notes', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});


/**
 * @route POST /note/create
 * @description Create a new note
 * @param {Note.model} req.body - Note object to create
 * @returns {Note} 200 - Successfully created note
 * @returns {string} 400 - Bad request if body is missing
 * @returns {string} 500 - Internal server error
 */
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

/**
 * @route GET /note/delete/:id
 * @description Delete a single note by its ObjectId
 * @param {string} id - The ID of the note (MongoDB ObjectId)
 * @returns {Note} 200 - boolean value denoting deletion status of the document.
 * @returns {string} 400 - Bad request if ID is missing or invalid
 * @returns {string} 500 - Internal server
 */
noteControllerRoutes.delete('/delete/:id', async (req, res) => {
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

/**
 * @route POST /note/create
 * @description Update an existing note
 * @param {Note.model} req.body - Note object to update
 * @returns {Note} 200 - Successfully updated note and returns the updated note
 * @returns {string} 400 - Bad request if body is missing
 * @returns {string} 500 - Internal server error
 */
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




