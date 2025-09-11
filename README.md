1. Crea el archivo README.md en la raíz del proyecto
markdown
# 🚀 Django + React + PostgreSQL Login System

![Django](https://img.shields.io/badge/Django-5.2.5-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue.svg)
![Docker](https://img.shields.io/badge/Docker-✓-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-✓-3178C6.svg)

Un sistema de autenticación moderno y escalable construido con Django REST Framework, React con TypeScript, PostgreSQL y Docker.

## ✨ Características

### 🔐 Autenticación
- **JWT Authentication** - Tokens seguros para sesiones
- **Registro de usuarios** - Formulario de registro elegante
- **Login seguro** - Validación de credenciales
- **Logout** - Gestión de sesiones
- **Protección de rutas** - Middleware de autenticación

### 🎨 Frontend
- **React 18** con TypeScript
- **Diseño responsive** y moderno
- **Formularios con validación** en tiempo real
- **Manejo de estados** con React Context
- **Interfaces de usuario** elegantes y profesionales

### 🐘 Backend
- **Django REST Framework** - API RESTful
- **PostgreSQL** - Base de datos robusta
- **Modelo de usuario personalizado** - CustomUser
- **Serializers** para validación de datos
- **CORS configurado** para desarrollo

### 🐳 Docker
- **Contenedorizado completo** - Todos los servicios en Docker
- **Docker Compose** - Orquestación sencilla
- **Entorno consistente** - Desarrollo y producción
- **Volúmenes persistentes** - Datos de PostgreSQL

## 🚀 Comenzando

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- **Node.js** (solo para desarrollo sin Docker)
- **Python 3.11+** (solo para desarrollo sin Docker)

### Instalación con Docker (Recomendado)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/django-react-login.git
   cd django-react-login
Construir y ejecutar con Docker Compose

bash
docker-compose up --build
Acceder a la aplicación

Frontend: http://localhost:3000

Backend API: http://localhost:8000

Admin Django: http://localhost:8000/admin

Instalación sin Docker
Backend (Django)
bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend (React)
bash
cd frontend
npm install
npm start
📦 Estructura del Proyecto
text
django-react-login/
├── backend/                 # Django REST API
│   ├── authentication/      # App de autenticación
│   │   ├── models.py       # Modelo CustomUser
│   │   ├── serializers.py  # Serializers JWT
│   │   ├── views.py        # Vistas de autenticación
│   │   └── urls.py         # Rutas de API
│   ├── Dockerfile          # Configuración Docker
│   ├── requirements.txt    # Dependencias Python
│   └── wait-for-it.sh      # Script de espera para DB
├── frontend/               # React TypeScript App
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── contexts/       # Auth Context
│   │   ├── services/       # API services
│   │   ├── styles/         # Estilos CSS
│   │   └── types/          # TypeScript types
│   ├── public/
│   ├── Dockerfile          # Configuración Docker
│   └── nginx.conf          # Configuración Nginx
└── docker-compose.yml      # Orquestación de containers
🛠️ Comandos Útiles
Docker Commands
bash
# Iniciar todos los servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Ejecutar comandos en el backend
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py migrate

# Reconstruir imágenes
docker-compose build --no-cache
Django Commands
bash
# Crear superusuario
python manage.py createsuperuser

# Hacer migraciones
python manage.py makemigrations
python manage.py migrate

# Ejecutar tests
python manage.py test
🔧 Configuración
Variables de Entorno
Crea un archivo .env en la raíz:

env
# Database
POSTGRES_DB=login_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=developer
POSTGRES_HOST=db
POSTGRES_PORT=5432

# Django
DEBUG=1
SECRET_KEY=tu-clave-secreta-aqui
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
Personalización
Cambiar puertos: Modifica docker-compose.yml

Configurar base de datos: Edita backend/settings.py

Modificar estilos: Edita archivos en frontend/src/styles/

Añadir nuevas apps: Crea nuevas apps en backend/

📋 API Endpoints
Método	Endpoint	Descripción
POST	/api/auth/login/	Iniciar sesión
POST	/api/auth/register/	Registrar usuario
POST	/api/auth/logout/	Cerrar sesión
GET	/api/auth/user/	Obtener usuario actual
POST	/api/auth/token/refresh/	Refresh JWT token
🧪 Testing
bash
# Ejecutar tests de Django
docker-compose exec backend python manage.py test

# Ejecutar tests de React
docker-compose exec frontend npm test
🤝 Contribución
Fork el proyecto

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👨‍💻 Autor
Mauricio Sanchez Nava - mauricioisc

🙌 Agradecimientos
Django

React

Docker

PostgreSQL