# ⚡ RiftTracker - eSports Data & SoloQ Tracker

**RiftTracker** es una aplicación web full-stack para el seguimiento de datos, estadísticas y ligas competitivas de eSports (League of Legends). Cuenta con interfaz temática Hextech, autenticación de usuarios mediante JWT y conexión a base de datos MySQL.

---

## 🚀 Guía de Inicio Rápido (Desde Terminal)

Sigue estos pasos para clonar, configurar y ejecutar el proyecto localmente en tu máquina.

### 1. Requisitos Previos

Asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/) (Versión 18 o superior)
- Servidor [MySQL](https://www.mysql.com/) o [XAMPP](https://www.apachefriends.org/) corriendo en segundo plano.

---

### 2. Clonar el Repositorio

Abre la terminal o PowerShell y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/RIFTTRACKER.git
cd RIFTTRACKER
```

---

### 3. Configurar la Base de Datos

1. Abre tu gestor de base de datos (MySQL Workbench, phpMyAdmin, DBeaver, etc.).
2. Crea una base de datos llamada `rifttracker` (o el nombre que prefieras).
3. Asegúrate de tener la tabla de usuarios creada ejecutando la siguiente consulta SQL:

```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4. Configurar Variables de Entorno

Entra en la carpeta del backend y crea un archivo llamado `.env`:

```bash
cd backend
```

Crea el archivo `.env` en la ruta `backend/.env` con tus credenciales locales de MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rifttracker
JWT_SECRET=secreto_hextech_rifttracker_2026
```

---

### 5. Instalar Dependencias

Estando dentro de la carpeta `backend`, instala todos los paquetes requeridos:

```bash
npm install
```

---

### 6. Iniciar la Aplicación

Para iniciar el servidor de desarrollo con autorecarga (Nodemon):

```bash
npm run dev
```

O para iniciar el servidor estándar de Node:

```bash
npm start
```

---

### 7. Abrir en el Navegador

Una vez que veas el mensaje `🚀 Servidor backend corriendo en http://localhost:3000`, abre tu navegador en:

- **Inicio / Ligas:** `http://localhost:3000/`
- **Iniciar Sesión:** `http://localhost:3000/login.html`
- **Registro:** `http://localhost:3000/registro.html`

---

## 🛠️ Tecnologías

- **Backend:** Node.js, Express (v5), JWT (`jsonwebtoken`), `bcryptjs`, `mysql2`
- **Frontend:** HTML5, CSS3 (Hextech Dark Theme), JavaScript ES6+ (Fetch API)
- **Base de Datos:** MySQL