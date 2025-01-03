#Imagen de node:
FROM node:20

#Establece el directorio de trabajo
WORKDIR /app

#Copia el archivo package.json al directorio de trabajo
COPY package.json package-lock.json ./

# Instalación de dependencias
RUN npm ci

# Copia el resto de los archivos del backend
COPY . .

# Expone el puerto en el que corre tu servidor
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["node", "server.js"]