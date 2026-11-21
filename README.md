# ⚡ RiftTracker — eSports Data & SoloQ Tracker

RiftTracker es una aplicación web full-stack para consultar y gestionar información relacionada con el entorno competitivo de League of Legends. Permite explorar ligas profesionales, consultar equipos y jugadores, visualizar palmarés y buscar jugadores de SoloQ.

La aplicación cuenta con una interfaz inspirada en la estética Hextech de Runeterra y dispone de un sistema de autenticación de usuarios, además de un panel de administración para gestionar la información almacenada.

El proyecto utiliza Node.js y Express para el backend, MySQL para almacenar la información y HTML, CSS y JavaScript para el frontend. También incorpora autenticación mediante JWT, protección de contraseñas con `bcryptjs` e integración con la API de Riot Games.

---

## Índice

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos previos](#-requisitos-previos)
- [Instalación y configuración](#-instalación-y-configuración)
- [Configuración de la base de datos](#-configuración-de-la-base-de-datos)
- [Variables de entorno](#-variables-de-entorno)
- [Ejecución del proyecto](#-ejecución-del-proyecto)
- [Primer inicio y pruebas](#-primer-inicio-y-pruebas)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Panel de administración](#-panel-de-administración)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Solución de problemas](#-solución-de-problemas)
- [Seguridad](#-seguridad)

---

## Características

### Exploración competitiva

- Consulta de las principales ligas competitivas de League of Legends.
- Visualización de los equipos asociados a cada liga.
- Fichas individuales de equipos.
- Información de los jugadores, sus posiciones y fotografías.
- Consulta del palmarés de los equipos.

### Seguimiento de SoloQ

- Buscador de jugadores mediante su Riot ID.
- Consulta de información de cuentas de League of Legends.
- Obtención de estadísticas relacionadas con SoloQ mediante la API de Riot Games.

### Usuarios y autenticación

- Registro de nuevos usuarios.
- Inicio y cierre de sesión.
- Gestión del perfil de usuario.
- Autenticación mediante JSON Web Tokens (JWT).
- Contraseñas protegidas mediante `bcryptjs`.
- Diferenciación entre usuarios normales y administradores.

### Panel de administración

- Acceso exclusivo para usuarios con rol `ADMIN`.
- Gestión de ligas.
- Gestión de equipos.
- Gestión de jugadores.
- Operaciones CRUD: creación, consulta, modificación y eliminación de registros.
- Protección de las operaciones administrativas tanto en el frontend como en el backend.

### Interfaz

- Diseño oscuro inspirado en la estética Hextech.
- Interfaz organizada y adaptable.
- Logotipos e imágenes almacenados localmente en el frontend.
- Navegación entre las distintas secciones de la aplicación.

---

## Tecnologías

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

**Servicios externos**

- Riot Games API
- Data Dragon

---

## Requisitos previos

Antes de instalar el proyecto, es necesario disponer de:

1. **Node.js 18 o superior**, preferiblemente una versión LTS compatible con las dependencias.
2. **npm**, incluido normalmente con Node.js.
3. **MySQL** o XAMPP con el servicio MySQL iniciado.
4. **Git**, para clonar el repositorio.
5. Un navegador web actualizado.
6. Una clave de desarrollo válida de Riot Games para las funcionalidades que necesiten acceder a su API.

Puedes descargar las herramientas desde sus páginas oficiales:

- Node.js: https://nodejs.org/
- MySQL: https://www.mysql.com/
- XAMPP: https://www.apachefriends.org/
- Git: https://git-scm.com/

---

## Instalación y configuración

### 1. Clonar el repositorio

Abre una terminal o PowerShell y ejecuta:

```bash
git clone https://github.com/TU_USUARIO/RIFTTRACKER.git
cd RIFTTRACKER
```

Sustituye `TU_USUARIO/RIFTTRACKER` por la dirección real del repositorio.

Si ya has descargado el proyecto, simplemente abre la carpeta `RIFTTRACKER` en Visual Studio Code.

### 2. Preparar MySQL

Inicia MySQL desde XAMPP o desde el servicio que utilices.

Si utilizas XAMPP, comprueba que el módulo MySQL esté iniciado.

Abre phpMyAdmin:

http://localhost/phpmyadmin/

### 3. Importar la base de datos

El proyecto debe incluir un archivo SQL con la estructura y los datos iniciales:

```text
database/rifttracker.sql
```

Para importarlo:

1. Accede a phpMyAdmin.
2. Selecciona la opción de importar o crea previamente una base de datos llamada `rifttracker`.
3. Selecciona el archivo `database/rifttracker.sql`.
4. Mantén el formato SQL.
5. Pulsa el botón de importar o continuar.
6. Comprueba que las tablas se hayan creado correctamente.

La base de datos contiene las entidades necesarias para el funcionamiento de la aplicación, entre ellas:

- `usuarios`
- `ligas`
- `equipos`
- `jugadores`
- `palmares`

**Importante:** el repositorio debe incluir una exportación actualizada de la base de datos. Si el archivo SQL todavía no está incluido, tendrás que exportarlo desde phpMyAdmin y añadirlo al proyecto.

### 4. Configurar las variables de entorno

Entra en la carpeta del backend:

```bash
cd backend
```

Crea un archivo llamado `.env` dentro de `backend/`.

Configura los valores correspondientes a tu instalación:

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
- `DB_PASSWORD`: contraseña del usuario.
- `DB_NAME`: nombre de la base de datos.

Si el usuario `root` tiene contraseña, introdúcela en `DB_PASSWORD`.

**JWT_SECRET:**

Debe ser una cadena aleatoria, privada y diferente en cada instalación. No utilices el valor de ejemplo en un despliegue real.

**API de Riot Games:**

Para utilizar las funcionalidades de SoloQ, configura también la clave de Riot Games según el nombre de variable que utilice el backend en `index.js`.

No publiques esta clave ni la subas al repositorio.

### 5. Instalar las dependencias

Asegúrate de estar dentro de la carpeta `backend/` y ejecuta:

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

No es necesario instalar Express, MySQL2 o las demás librerías individualmente si ya están declaradas en ese archivo.

### 6. Iniciar el servidor

Para iniciar el servidor en modo desarrollo, si el proyecto tiene configurado el script `dev`:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

Si alguno de estos comandos no está definido en `package.json`, puedes iniciar el servidor directamente con:

```bash
node index.js
```

Cuando el servidor se inicie correctamente, debería aparecer un mensaje similar a:

```text
Servidor backend corriendo en http://localhost:3000
```

Mantén la terminal abierta mientras utilizas la aplicación.

---

## Configuración de la base de datos

RiftTracker utiliza MySQL para almacenar la información de las ligas, equipos, jugadores, palmarés y usuarios.

Las relaciones entre las tablas permiten consultar los equipos pertenecientes a cada liga y los jugadores asociados a cada equipo.

La conexión se realiza desde el backend mediante la librería `mysql2`.

Para comprobar que la base de datos está correctamente configurada:

1. Abre phpMyAdmin.
2. Selecciona la base de datos `rifttracker`.
3. Comprueba que aparecen las tablas.
4. Verifica que existen registros de ligas y equipos.
5. Comprueba que los jugadores y el palmarés están asociados a sus respectivos equipos.

Si la aplicación no muestra información, comprueba primero que la base de datos contiene los datos necesarios.

---

## Variables de entorno

El backend utiliza un archivo `.env` para almacenar la configuración del servidor, los datos de conexión con MySQL y las credenciales de acceso a la API de Riot Games.

Crea un archivo llamado `.env` dentro de la carpeta `backend/` con la siguiente estructura:

```dotenv
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=rifttracker_db
RIOT_API_KEY=
```

**Descripción de las variables:**

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que se ejecuta el servidor Express. |
| `DB_HOST` | Dirección del servidor MySQL. |
| `DB_USER` | Usuario utilizado para conectarse a MySQL. |
| `DB_PASSWORD` | Contraseña del usuario de MySQL. |
| `DB_NAME` | Nombre de la base de datos utilizada por RiftTracker. |
| `RIOT_API_KEY` | Clave de acceso necesaria para realizar peticiones a la API de Riot Games. |

**Importante:**

- Si el usuario `root` no tiene contraseña, `DB_PASSWORD` puede permanecer vacío.
- La base de datos debe llamarse exactamente `rifttracker_db`.
- Para utilizar las funcionalidades de SoloQ, introduce una clave válida en `RIOT_API_KEY`.

El archivo `.env` debe permanecer en la carpeta `backend/` y estar excluido del repositorio mediante `.gitignore`.

## Ejecución del proyecto

Una vez completados los pasos anteriores:

1. Comprueba que MySQL está iniciado.
2. Abre una terminal en la carpeta `backend`.
3. Ejecuta `npm install` si todavía no has instalado las dependencias.
4. Inicia el servidor con `node index.js`, `npm start` o el script configurado.
5. Abre el navegador.
6. Accede a la aplicación:

| Sección | Dirección |
|---|---|
| Inicio y ligas | http://localhost:3000/ |
| Inicio de sesión | http://localhost:3000/login.html |
| Registro | http://localhost:3000/registro.html |

El servidor Express sirve los archivos del frontend, por lo que no es necesario abrir los HTML directamente ni utilizar Live Server.

---

## Primer inicio y pruebas

Para comprobar que RiftTracker funciona correctamente, se recomienda realizar las siguientes pruebas.

### 1. Comprobar la página principal

- Acceder a `http://localhost:3000/`.
- Comprobar que aparecen las ligas disponibles.
- Seleccionar una liga.
- Verificar que se muestran sus equipos.

### 2. Comprobar las fichas de equipos

- Seleccionar un equipo.
- Comprobar que aparece su información.
- Verificar que se muestran sus jugadores.
- Comprobar que los jugadores aparecen ordenados por posición.
- Revisar las fotografías y el palmarés.

### 3. Comprobar el registro y el inicio de sesión

- Acceder a la página de registro.
- Crear una cuenta nueva.
- Iniciar sesión con esa cuenta.
- Comprobar que se muestra correctamente la información del usuario.
- Verificar que las rutas protegidas requieren autenticación.

Los usuarios que se registran desde la aplicación reciben automáticamente el rol `USER`.

### 4. Comprobar SoloQ

- Acceder a la sección de SoloQ.
- Introducir un Riot ID válido.
- Realizar una búsqueda.
- Comprobar que se obtiene la información disponible de la cuenta y sus estadísticas.

Esta funcionalidad depende de que la clave de Riot Games esté correctamente configurada y de que la API permita realizar la consulta.

### 5. Comprobar el panel de administración

Para probar las funcionalidades administrativas es necesario disponer de una cuenta cuyo rol sea `ADMIN`.

Después de crear una cuenta normal, puedes asignarle el rol de administrador desde phpMyAdmin:

```sql
UPDATE usuarios
SET rol = 'ADMIN'
WHERE email = 'tu_correo@gmail.com';
```

Sustituye el correo por el de la cuenta que quieras utilizar.

Puedes comprobar el cambio ejecutando:

```sql
SELECT id, username, email, rol
FROM usuarios;
```

Después:

1. Cierra la sesión de RiftTracker.
2. Vuelve a iniciar sesión con esa cuenta.
3. Comprueba que aparece el acceso a Administración.
4. Entra en el panel.
5. Prueba a crear, editar y eliminar una liga, un equipo o un jugador.

Las operaciones de administración están protegidas por el backend y requieren un token válido y permisos de administrador.

**Importante:** al eliminar equipos o ligas pueden verse afectados registros relacionados, como jugadores o palmarés, dependiendo de las relaciones y restricciones configuradas en la base de datos. Utiliza registros de prueba para estas comprobaciones.

### 6. Comprobar los permisos de usuario

Inicia sesión con una cuenta normal (`USER`) y comprueba que:

- No aparece el botón de administración.
- No puede acceder al panel administrativo.
- No puede realizar operaciones CRUD administrativas.

También puedes probar a acceder directamente a las rutas administrativas para comprobar que el backend rechaza las peticiones sin los permisos necesarios.

---

## Endpoints de la API

El backend dispone de rutas para consultar la información pública, gestionar los usuarios y realizar operaciones administrativas.

### Rutas públicas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/ligas` | Obtiene las ligas disponibles. |
| GET | `/api/ligas/:id/equipos` | Obtiene los equipos de una liga. |
| GET | `/api/equipos/:id/jugadores` | Obtiene los jugadores de un equipo. |
| GET | `/api/equipos/:id/palmares` | Obtiene el palmarés de un equipo. |

### Autenticación y perfil

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/registro` | Registra un nuevo usuario. |
| POST | `/api/login` | Inicia sesión y devuelve el token de autenticación. |
| GET | `/api/perfil` | Consulta el perfil del usuario autenticado. |
| PUT | `/api/perfil` | Actualiza la información del perfil del usuario autenticado. |

### Administración de ligas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/admin/ligas` | Consulta las ligas. |
| POST | `/api/admin/ligas` | Crea una liga. |
| PUT | `/api/admin/ligas/:id` | Modifica una liga. |
| DELETE | `/api/admin/ligas/:id` | Elimina una liga. |

### Administración de equipos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/admin/equipos` | Consulta los equipos. |
| POST | `/api/admin/equipos` | Crea un equipo. |
| PUT | `/api/admin/equipos/:id` | Modifica un equipo. |
| DELETE | `/api/admin/equipos/:id` | Elimina un equipo. |

### Administración de jugadores

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/admin/jugadores` | Consulta los jugadores. |
| POST | `/api/admin/jugadores` | Crea un jugador. |
| PUT | `/api/admin/jugadores/:id` | Modifica un jugador. |
| DELETE | `/api/admin/jugadores/:id` | Elimina un jugador. |

Las rutas administrativas requieren autenticación y permisos de administrador.

Las rutas relacionadas con Riot Games se encuentran implementadas en el backend y dependen de la configuración de la API. Sus direcciones concretas pueden consultarse en `backend/index.js`.

---

##  Panel de administración

RiftTracker incorpora un panel de administración para gestionar los datos principales de la aplicación.

El acceso está reservado a usuarios que tengan asignado el rol `ADMIN`.

Desde el panel es posible:

- Consultar las ligas, equipos y jugadores almacenados.
- Crear nuevos registros.
- Modificar registros existentes.
- Eliminar registros.

El panel utiliza las rutas `/api/admin/` del backend y envía el token JWT en las peticiones protegidas.

La comprobación de permisos se realiza también en el servidor, por lo que ocultar el botón de administración en el frontend no constituye por sí solo una medida de seguridad.

---

## Estructura del proyecto

La organización general del proyecto sigue una separación entre frontend y backend.

```text
RIFTTRACKER/
│
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── admin.html
│   ├── css/
│   ├── js/
│   └── logos/
│
├── database/
│   └── rifttracker.sql
│
└── README.md
```

Esta estructura es orientativa. Las carpetas y archivos adicionales del frontend contienen las distintas páginas, hojas de estilo, scripts y recursos gráficos de la aplicación.

El archivo `.env` es local y no debe incluirse en el repositorio.

---

## Solución de problemas

### El servidor no inicia

Comprueba que:

- Node.js está instalado correctamente.
- Has ejecutado `npm install`.
- Estás dentro de la carpeta `backend`.
- El puerto 3000 no está siendo utilizado por otro proceso.
- El archivo `.env` existe y contiene los valores necesarios.

### No se conecta a MySQL

Comprueba que:

- El servicio MySQL está iniciado.
- El nombre de la base de datos es `rifttracker`.
- El usuario y la contraseña son correctos.
- La base de datos se ha importado correctamente.

### No aparecen las ligas o los equipos

Comprueba que:

- La base de datos contiene registros.
- Las relaciones entre ligas y equipos son correctas.
- El servidor está funcionando.
- Las peticiones a la API devuelven respuestas correctas.

### No se muestran las fotografías o los logotipos

Comprueba que:

- Los archivos existen en las carpetas locales.
- Las rutas almacenadas o utilizadas por el frontend son correctas.
- Los nombres y extensiones coinciden.
- Las imágenes se encuentran dentro de la carpeta pública servida por Express.

### No funciona el inicio de sesión

Comprueba que:

- El usuario está registrado.
- La contraseña introducida es correcta.
- La conexión con MySQL funciona.
- `JWT_SECRET` está configurado.
- El navegador está almacenando correctamente el token.

### No aparece el panel de administración

Comprueba que:

- Has iniciado sesión.
- La cuenta tiene el rol `ADMIN`.
- Has cerrado y vuelto a iniciar sesión después de modificar el rol.
- El frontend está leyendo correctamente la información del usuario.

### No funciona SoloQ

Comprueba que:

- La clave de Riot Games está configurada.
- La clave sigue siendo válida.
- El Riot ID está escrito correctamente.
- El backend puede comunicarse con los servicios de Riot Games.
- No se ha alcanzado un límite de peticiones de la API.

---

## Seguridad

RiftTracker incorpora diferentes medidas para proteger la información de los usuarios y las operaciones administrativas:

- Las contraseñas se almacenan mediante hashes generados con `bcryptjs`.
- La autenticación utiliza JSON Web Tokens.
- Las rutas privadas requieren un token válido.
- Las rutas administrativas comprueban que el usuario tenga el rol `ADMIN`.
- El registro público asigna automáticamente el rol `USER`.
- Las variables sensibles se configuran mediante un archivo `.env`.
- Las credenciales de Riot Games no deben publicarse en el repositorio.

Para utilizar el proyecto en un entorno real, es necesario configurar correctamente las credenciales, utilizar secretos seguros y revisar la configuración de seguridad del servidor.

---

## RiftTracker

Aplicación web desarrollada como proyecto de Desarrollo de Aplicaciones Web, combinando tecnologías frontend, backend y bases de datos para centralizar información del entorno competitivo de League of Legends.