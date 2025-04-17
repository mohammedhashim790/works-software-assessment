import {Router} from "express";

import {ResponseStatus} from "../../bloc/utils/response-status";
import {logError} from "../../bloc/utils/logger";
import {NotebookRepository} from "../../services/notebook.repository";
import {BadRequest} from "../../bloc/errors/BadRequest";
import {ObjectId} from "mongodb";

export const noteBookControllerRoutes = Router();

/**
 * @route GET /notebook/
 * @description Fetches list of all notebooks
 * @returns {Note[]} 200 - An array of notebook objects
 * @returns {string} 500 - Internal server error message
 */
noteBookControllerRoutes.get('/', async (req, res) => {
    try {
        const noteBooks = await new NotebookRepository().list();
        ResponseStatus.OK(res, noteBooks);
    } catch (err) {
        logError('Failed to list notebook', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});

/**
 * @route GET /notebook/:id
 * @description Fetch a single notebook by its ObjectId
 * @param {string} id - The ID of the notebook (MongoDB ObjectId)
 * @returns {Note} 200 - The notebook object
 * @returns {string} 400 - Bad request if ID is missing or invalid
 * @returns {string} 500 - Internal server
 */
noteBookControllerRoutes.get('/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new BadRequest('Id is required');
        }
        const notes = await new NotebookRepository().get(new ObjectId(req.params.id));
        ResponseStatus.OK(res, notes);
    } catch (err) {
        logError('Failed to list notes', err);
        ResponseStatus.INTERNAL_SERVER_ERROR(res, 'Failed to list notes', err);
    }
});

/**
 * @route POST /notes/create
 * @description Create a new notebook
 * @param {Note.model} req.body - Note object to create
 * @returns {Note} 200 - Successfully created notebook
 * @returns {string} 400 - Bad request if body is missing
 * @returns {string} 500 - Internal server error
 */
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

/**
 * @route GET /notebook/delete/:id
 * @description Delete a single notebook by its ObjectId
 * @param {string} id - The ID of the notebook (MongoDB ObjectId)
 * @returns {Note} 200 - boolean value denoting deletion status of the document.
 * @returns {string} 400 - Bad request if ID is missing or invalid
 * @returns {string} 500 - Internal server
 */
noteBookControllerRoutes.delete('/delete/:id', async (req, res) => {
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

/**
 * @route POST /notebook/create
 * @description Update an existing notebook
 * @param {Note.model} req.body - Note object to update
 * @returns {Note} 200 - Successfully updated notebook and returns the updated notebook
 * @returns {string} 400 - Bad request if body is missing
 * @returns {string} 500 - Internal server error
 */
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
