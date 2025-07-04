// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../models/User.js'; // Asegúrate de tener este modelo
// import dotenv from 'dotenv';

// dotenv.config();

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

//     // Crear token JWT incluyendo el rol
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     // Enviar user con el rol incluido
//     res.status(200).json({ 
//       user: { id: user._id, email: user.email, role: user.role },
//       token 
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error del servidor' });
//   }
// };










import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validar que role sea 'user' o 'admin' (seguridad básica)
    const allowedRoles = ['user', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'user';

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed, role: userRole }); // usa rol validado
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      user: { id: user._id, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', error: err.message });
  }
};
