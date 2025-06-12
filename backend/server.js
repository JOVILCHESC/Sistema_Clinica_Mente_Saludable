// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import notesRoutes from './routes/notes.js';
// import authRoutes from './routes/auth.js';

// dotenv.config();

// const app = express();

// // ✅ Configurar CORS según entorno
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5173'
//     : 'https://tu-dominio-produccion.com' // Reemplaza con el dominio real en producción
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Rutas de la API
// app.use('/api/notes', notesRoutes);
// app.use('/api/auth', authRoutes);

// // Conexión a MongoDB y arranque del servidor
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('✅ Conectado a MongoDB');
//   app.listen(process.env.PORT, () => {
//     console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
//   });
// })
// .catch(err => {
//   console.error('❌ Error al conectar a MongoDB:', err);
// });
















import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import notesRoutes from './routes/notes.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

// Configurar CORS según entorno
const corsOptions = {
  origin: process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://tu-dominio-produccion.com'
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas de la API
app.use('/api/notes', notesRoutes);
app.use('/api/auth', authRoutes);

// Cargar certificados SSL desde la carpeta ./cert
const httpsOptions = {
  key: fs.readFileSync('./cert/localhost-key.pem'),
  cert: fs.readFileSync('./cert/localhost.pem'),
};

// Conexión a MongoDB y arranque del servidor HTTPS
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  https.createServer(httpsOptions, app).listen(process.env.PORT || 5000, () => {
    console.log(`🔐 Servidor HTTPS activo en https://localhost:${process.env.PORT || 5000}`);
  });
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});
