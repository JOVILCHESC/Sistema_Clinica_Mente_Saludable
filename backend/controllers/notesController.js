import Note from '../models/Note.js';
import { encrypt, decrypt } from '../utils/crypto.js';


export const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;
    const therapistId = req.user.id;

    if (!title || !body) {
      return res.status(400).json({ message: 'Título y cuerpo son obligatorios' });
    }

    const encryptedTitle = encrypt(title);
    const encryptedBody = encrypt(body);

    const note = new Note({ therapistId, title: encryptedTitle, body: encryptedBody });
    await note.save();
    res.status(201).json({ message: 'Nota guardada exitosamente' });
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
};
// backend/controllers/notesController.js

export const getNotes = async (req, res) => {
  try {
    const therapistId = req.user.id;             // ✅ ID del terapeuta desde el token
    const notes = await Note.find({ therapistId });

    const decryptedNotes = notes.map(note => ({
      id: note._id,
      therapistId: note.therapistId,
      title: decrypt(note.title),
      body: decrypt(note.body),
      createdAt: note.createdAt
    }));

    res.json(decryptedNotes);
  } catch (error) {
    console.error('❌ Error al obtener notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};
