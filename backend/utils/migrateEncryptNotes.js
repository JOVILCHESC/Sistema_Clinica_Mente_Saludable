// backend/utils/migrateEncryptNotes.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Note from '../models/Note.js';
import { encrypt, decrypt } from './crypto.js';

dotenv.config();

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB para migración');

    const notes = await Note.find();
    console.log(`🔄 Encontradas ${notes.length} notas en total.`);

    let updatedCount = 0;

    for (const note of notes) {
      // Intentamos descifrar; si lanza error, asumimos que está en texto plano
      let isEncrypted = true;
      try {
        decrypt(note.title);
        decrypt(note.body);
      } catch {
        isEncrypted = false;
      }

      if (!isEncrypted) {
        // Ciframos y guardamos
        note.title = encrypt(note.title);
        note.body  = encrypt(note.body);
        await note.save();
        updatedCount++;
        console.log(`🔒 Nota ${note._id} cifrada.`);
      }
    }

    console.log(`✅ Migración completada. Notas actualizadas: ${updatedCount}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error en migración:', err);
    process.exit(1);
  }
}

migrate();
