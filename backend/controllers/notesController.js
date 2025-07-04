import Note from '../models/Note.js';
import { encrypt, decrypt } from '../utils/crypto.js';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();




export const downloadNote = async (req, res) => {
  try {
    const userId = req.user.id; // viene de auth middleware
    const noteId = req.params.id;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });

    if (note.therapistId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No autorizado para esta nota' });
    }

    const tempToken = jwt.sign(
      { noteId, userId },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    res.status(200).json({
      encryptedTitle: note.title,
      encryptedBody: note.body,
      token: tempToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la nota', error: error.message });
  }
};




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

// export const getNotes = async (req, res) => {
//   try {
//     const therapistId = req.user.id;             // ✅ ID del terapeuta desde el token
//     const notes = await Note.find({ therapistId });

//     const decryptedNotes = notes.map(note => ({
//       id: note._id,
//       therapistId: note.therapistId,
//       title: decrypt(note.title),
//       body: decrypt(note.body),
//       createdAt: note.createdAt
//     }));

//     res.json(decryptedNotes);
//   } catch (error) {
//     console.error('❌ Error al obtener notas:', error);
//     res.status(500).json({ error: 'Error al obtener notas' });
//   }
// };








export const getNotes = async (req, res) => {
  try {
    const therapistId = req.user.id;
    const notes = await Note.find({ therapistId });

    // Envía directamente los datos cifrados
    const encryptedNotes = notes.map(note => ({
      id: note._id,
      therapistId: note.therapistId,
      title: note.title,  // Cifrado
      body: note.body,    // Cifrado
      createdAt: note.createdAt
    }));

    res.json(encryptedNotes);
  } catch (error) {
    console.error('❌ Error al obtener notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};



// Solo accesible para admins (proteger con middleware de auth y rol)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find(); // Sin filtro para traer todas las notas

    const decryptedNotes = notes.map(note => ({
      id: note._id,
      therapistId: note.therapistId,
      title: decrypt(note.title),
      body: decrypt(note.body),
      createdAt: note.createdAt
    }));

    res.json(decryptedNotes);
  } catch (error) {
    console.error('❌ Error al obtener todas las notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
};
