# Imagen base de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto (opcional si usas docker-compose)
EXPOSE 5000

# Comando de inicio
CMD ["node", "server.js"]
