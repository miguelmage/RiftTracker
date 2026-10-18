# ⚡ RiftTracker — eSports Data & SoloQ Tracker

RiftTracker es una aplicación web full-stack para consultar ligas, equipos y jugadores de League of Legends, con una interfaz inspirada en la estética Hextech de Runeterra.

El proyecto utiliza Node.js y Express para el backend, MySQL para almacenar la información y HTML, CSS y JavaScript para el frontend. También incorpora autenticación de usuarios mediante JWT y `bcryptjs`.

## 📋 Índice

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y configuración](#-instalación-y-configuración)
- [Configuración de la base de datos](#-configuración-de-la-base-de-datos)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución del proyecto](#-ejecución-del-proyecto)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Solución de problemas](#-solución-de-problemas)
- [Seguridad](#-seguridad)

## 🚀 Características

- Consulta de ligas competitivas de League of Legends.
- Visualización de equipos y sus jugadores.
- Información de los jugadores, sus posiciones y fotografías.
- Consulta del palmarés de los equipos.
- Buscador de jugadores de SoloQ.
- Registro e inicio de sesión de usuarios.
- Autenticación mediante JSON Web Tokens (JWT).
- Contraseñas protegidas mediante `bcryptjs`.
- Base de datos MySQL.
- Interfaz adaptable con temática oscura inspirada en Hextech.
- Logotipos e imágenes almacenados localmente en el frontend.

## 🛠️ Tecnologías

**Backend**
- Node.js
- Express
- MySQL2
- JSON Web Token (`jsonwebtoken`)
- Bcrypt (`bcryptjs`)
- CORS
- dotenv

**Frontend**
- HTML5
- CSS3
- JavaScript ES6+
- Fetch API

**Base de datos**
- MySQL
- phpMyAdmin, como herramienta de administración opcional

## 💻 Requisitos previos

Antes de instalar el proyecto, asegúrate de disponer de:

1. **Node.js 18 o superior**, preferiblemente una versión LTS compatible con las dependencias del proyecto.
2. **npm**, incluido normalmente con Node.js.
3. **MySQL** o XAMPP con el servicio MySQL iniciado.
4. **Git**, para clonar el repositorio.
5. Un navegador web actualizado.

Puedes descargar las herramientas desde sus páginas oficiales:

- Node.js: https://nodejs.org/
- MySQL: https://www.mysql.com/
- XAMPP: https://www.apachefriends.org/
- Git: https://git-scm.com/

## 📥 Instalación y configuración

### 1. Clonar el repositorio

Abre una terminal o PowerShell y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/RIFTTRACKER.git
cd RIFTTRACKER
```

Sustituye `TU_USUARIO/RIFTTRACKER` por la URL real del repositorio de GitHub.

Si ya has descargado el proyecto, entra directamente en la carpeta `RIFTTRACKER`.

### 2. Preparar la base de datos

Inicia MySQL desde XAMPP o desde el servicio que utilices.

Abre phpMyAdmin:

http://localhost/phpmyadmin/

Crea una base de datos llamada `rifttracker`, utilizando la codificación `utf8mb4` si está disponible.

### 3. Importar la base de datos

El proyecto incluye un archivo SQL con la estructura y los datos iniciales:

```text
database/rifttracker.sql
```

Para importarlo:

1. Selecciona la base de datos `rifttracker` en phpMyAdmin.
2. Abre la pestaña **Importar**.
3. Selecciona el archivo `database/rifttracker.sql`.
4. Mantén el formato SQL.
5. Pulsa **Importar** o **Continuar**.
6. Comprueba que las tablas se hayan creado correctamente.

El archivo debe contener la exportación actualizada de la base de datos del proyecto, incluyendo las tablas y los datos de demostración necesarios.

**Importante:** si el repositorio no incluye todavía `database/rifttracker.sql`, tendrás que exportar tu base de datos desde phpMyAdmin y añadir el archivo antes de que otras personas puedan seguir este paso.

Si el script contiene instrucciones para crear o seleccionar una base de datos con otro nombre, comprueba que coincidan con la configuración del apartado siguiente.

### 4. Configurar las variables de entorno

Entra en la carpeta del backend:

```bash
cd backend
```

Crea un archivo llamado `.env` dentro de `backend/`.

Si existe un archivo `backend/.env.example`, puedes copiarlo y renombrar la copia como `.env`.

Configura los valores según tu instalación local:

```dotenv
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rifttracker

JWT_SECRET=cambia_este_secreto_por_uno_aleatorio
```

**Configuración de MySQL:**

- `DB_HOST`: dirección del servidor MySQL.
- `DB_USER`: usuario de MySQL.
- `DB_PASSWORD`: contraseña de ese usuario.
- `DB_NAME`: nombre de la base de datos importada.

Si tu usuario `root` tiene contraseña, debes introducirla en `DB_PASSWORD`.

`JWT_SECRET` debe ser una cadena aleatoria, privada y diferente en cada instalación. No utilices el valor de ejemplo en un despliegue real.

### 5. Instalar las dependencias

Asegúrate de estar dentro de `backend/` y ejecuta:

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

No es necesario instalar Express, MySQL2 o las demás dependencias individualmente si ya están declaradas correctamente en ese archivo.

### 6. Iniciar el servidor

Para iniciar el servidor en modo desarrollo, si el proyecto tiene configurado el script `dev`:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

El script de desarrollo puede utilizar Nodemon para reiniciar el servidor automáticamente cuando se detecten cambios.

Si alguno de estos comandos no está definido en `package.json`, comprueba los scripts disponibles antes de ejecutarlo.

Cuando el servidor se inicie correctamente, debería mostrar un mensaje similar a:

```text
Servidor backend corriendo en http://localhost:3000
```

Mantén la terminal abierta mientras utilizas la aplicación.

### 7. Abrir RiftTracker

Una vez iniciado el servidor, abre el navegador y accede a:

| Sección | Dirección |
|---|---|
| Inicio y ligas | http://localhost:3000/ |
| Inicio de sesión | http://localhost:3000/login.html |
| Registro | http://localhost:3000/registro.html |