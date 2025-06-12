import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  therapistId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true // Encriptado
  },
  body: {
    type: String,
    required: true // Encriptado
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Note', noteSchema);
