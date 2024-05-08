# Usa una imagen de Node.js como base
FROM node:alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el código de la aplicación al contenedor
COPY . .

# Expone el puerto 3000 para que la aplicación pueda ser accedida
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["node", "app.js"]

