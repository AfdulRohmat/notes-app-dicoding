import {addNoteHandler, getAllNotes, getNoteById, editNoteById, deleteNoteById} from "./handler.js";

const routes = [
    // CREATE DATA
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },

    // GET ALL DATA
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotes,
    },

    // GET PARTICULAR DATA BY ID
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteById,
    },

    // PUT / EDIT DATA BY ID
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteById,
    },

    // DELETE NOTE BY ID
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteById
    }
];

export default routes;