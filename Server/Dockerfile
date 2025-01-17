# Usa una imagen oficial de Node.js
FROM node:20

# Instala netcat para wait-for-it.sh
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el script wait-for-it al contenedor
COPY esperardb.sh /usr/local/bin/

# Da permisos de ejecución al script dentro del contenedor
RUN chmod +x /usr/local/bin/esperardb.sh

# Copia los archivos de tu proyecto
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm install 

# Copia el resto del proyecto
COPY . .

# Expone el puerto en el que corre tu backend
EXPOSE 5000

# Comando para esperar la base de datos y luego ejecutar el servidor
CMD ["esperardb.sh", "db", "3306", "--", "node", "server.js"]

