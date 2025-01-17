# Usa una imagen oficial de Node.js para construir el proyecto
FROM node:20 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto y compila
COPY . .
RUN npm run build

# Usa una imagen ligera de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos de la carpeta dist generada por Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Expone el puerto en el que corre Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
