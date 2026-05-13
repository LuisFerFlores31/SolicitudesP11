# Sistema de Solicitudes Internas

Repositorio base para las prácticas del Módulo 3 — Desarrollo avanzado de aplicaciones Web.

Stack: React + Express + PostgreSQL · Docker (solo DB) · node-pg-migrate

---

## Requisitos previos

- [Node.js 20+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- npm

---

## Instalación y puesta en marcha

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

### 2. Levantar la base de datos

```bash
docker compose up -d
```

Esto levanta PostgreSQL 16 en el puerto `5432`. Solo la base de datos corre en Docker — el servidor y el cliente corren directamente en tu máquina.

### 3. Configurar variables de entorno

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Los `.env` ya vienen configurados para desarrollo local. No necesitas cambiar nada para empezar.

### 4. Instalar dependencias

```bash
cd server && npm install
cd ../client && npm install
cd ..
```

### 5. Ejecutar migraciones

```bash
cd server && npm run migrate
```

Esto crea todas las tablas en la base de datos.

### 6. Cargar datos de prueba

```bash
npm run seed
cd ..
```

---

## Ejecutar en desarrollo

Necesitas dos terminales abiertas, ambas desde la raíz del repositorio.

**Terminal 1 — Servidor** (puerto 3000):

```bash
cd server
npm run dev
```

**Terminal 2 — Cliente** (puerto 5173):

```bash
cd client
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

---

## Usuarios de prueba

| Email                 | Contraseña   | Rol   |
|-----------------------|--------------|-------|
| admin@example.com     | Password123. | admin |
| alice@example.com     | Password123. | user  |
| bob@example.com       | Password123. | user  |
| charlie@example.com   | Password123. | user  |

---

## Estructura del proyecto

```
/
├── docker-compose.yml       ← solo PostgreSQL
│
├── server/
│   ├── .env                 ← variables de entorno (no se sube a git)
│   ├── .env.example
│   └── src/
│       ├── index.js         ← entrada del servidor
│       ├── app.js           ← Express + middlewares
│       ├── config/db.js     ← conexión a PostgreSQL
│       ├── routes/          ← rutas por entidad
│       ├── controllers/     ← lógica de cada endpoint
│       ├── middleware/      ← isAuthenticated, checkRole (aún no aplicados)
│       └── db/
│           ├── migrations/  ← archivos node-pg-migrate
│           └── seeds/       ← datos iniciales
│
└── client/
    ├── .env                 ← variables de entorno (no se sube a git)
    ├── .env.example
    └── src/
        ├── api/             ← funciones de fetch por entidad
        ├── context/         ← AuthContext
        ├── hooks/           ← useAuth, useRequests
        └── pages/           ← Login, Dashboard, Requests, Areas, Admin
```

---

## Scripts disponibles

### Servidor

| Comando                | Descripción                        |
|------------------------|------------------------------------|
| `npm run dev`          | Inicia el servidor con nodemon     |
| `npm run migrate`      | Aplica migraciones pendientes      |
| `npm run migrate:down` | Revierte la última migración       |
| `npm run seed`         | Carga datos de prueba              |
| `npm test`             | Ejecuta los tests con Vitest       |

### Cliente

| Comando         | Descripción                     |
|-----------------|---------------------------------|
| `npm run dev`   | Inicia el cliente con Vite      |
| `npm run build` | Genera el build de producción   |
| `npm test`      | Ejecuta los tests con Vitest    |

---

## Detener la base de datos

```bash
docker compose down
```

Para borrar también los datos:

```bash
docker compose down -v
```
