import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Asegúrate de tener este modelo
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
