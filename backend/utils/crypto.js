import CryptoJS from 'crypto-js';

// Función para cifrar texto
const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, process.env.ENCRYPT_KEY).toString();
};

// Función para descifrar texto cifrado
const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, process.env.ENCRYPT_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
