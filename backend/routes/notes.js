// import express from 'express';
// import { createNote, getNotes } from '../controllers/notesController.js';

// const router = express.Router();

// // Ruta para crear una nueva nota
// router.post('/', createNote);

// // Ruta para obtener todas las notas
// router.get('/', getNotes);

// export default router;



// import express from 'express';
// import Note from '../models/Note.js';
// import { verifyToken } from '../middleware/verifyToken.js';

// const router = express.Router();

// // 🛡️ Ruta protegida: solo usuarios autenticados pueden acceder
// router.get('/', verifyToken, async (req, res) => {
//   try {
//     const notes = await Note.find();
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al obtener las notas' });
//   }
// });

// // Si tienes POST, también protégelo
// router.post('/', verifyToken, async (req, res) => {
//   try {
//     const newNote = new Note(req.body);
//     await newNote.save();
//     res.status(201).json(newNote);
//   } catch (err) {
//     res.status(500).json({ message: 'Error al guardar la nota' });
//   }
// });

// export default router;










import express from 'express';
import { downloadNote } from '../controllers/notesController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { createNote, getNotes } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', verifyToken, getNotes);
router.post('/', verifyToken, createNote);
router.get('/download/:id', verifyToken, downloadNote);
export default router;
