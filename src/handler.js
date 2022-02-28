import { nanoid } from "nanoid";
import notes from "./notes.js";

// CREATE / POST DATA HANDLER
const addNoteHandler = (request, h) => {
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const { title, tags, body } = request.payload;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// READ / GET ALL DATA HANDLER
const getAllNotes = () => ({
  status: "succes",
  data: {
    notes,
  },
});

// READ / GET DATA BY ID
const getNoteById = (request, h) => {
  // ambi id dari parameter request
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

// PUT / EDIT NOTE BY
const editNoteById = (request, h) => {
  // define new data/note
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // Find old data by index
  const index = notes.findIndex((note) => note.id === id);

  // Pengkondisian untuk menimpa data jika data ada (!= -1)
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// DELETE NOTE BY ID
const deleteNoteById = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

export {
  addNoteHandler,
  getAllNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
};
