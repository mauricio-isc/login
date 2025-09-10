FROM python:3.11-slim-bullseye

#Establecer variables de entorno
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#ESTABLECER DIRECTORIO DE TRABAJO
WORKDIR /app

#INSTALAR LAS DEPENDENCIAS DEL SISTEMA
RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*


# Copiar requirements e isntalar las dependencias de python

COPY requeriments.txt .
RUN pip install --no-cache-dir -r requeriments.txt


#copiar wait-for-it.sh y dar permisos de ejecucion
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

#copiar resto del proyecto
COPY . .

#EXPONER PUERTO
EXPOSE 8080

# COMANDO PARA EJECUTAR LA APLICACION
CMD ["/wait-for-it.sh", "db:5432", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]