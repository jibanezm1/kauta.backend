# Usa una imagen de Node.js como base
FROM node:16 AS base

# Instala el cliente MySQL, Python y herramientas de compilación
RUN apt-get update && apt-get install -y default-mysql-client python build-essential

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Instala el controlador MySQL para Sequelize
RUN npm install mysql2

# Compila bcrypt dentro del contenedor
RUN npm rebuild bcrypt --build-from-source

# Copia el código de la aplicación al contenedor
COPY . .

# Expone el puerto 3000 para que la aplicación pueda ser accedida
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["node", "app.js"]
