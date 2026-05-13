# Práctica 1 — Migraciones

**Objetivo:** Entender qué es una migración, leer las migraciones existentes del proyecto, y crear dos nuevas migraciones: una que agregue `priority` a `requests` y otra que agregue `phone` a `users`.

**Archivos a revisar:** `server/src/db/migrations/`, `server/src/db/migrate.js`, `server/package.json`

---

## Contexto

El proyecto ya tiene 7 migraciones aplicadas que crean todas las tablas del sistema. Tu tarea es agregar una nueva columna a una tabla existente usando el mismo mecanismo — sin tocar las migraciones anteriores ni modificar la base de datos a mano.

---

## Parte 1 — Leer las migraciones existentes

Abre la carpeta `server/src/db/migrations/` y responde:

1. ¿Qué tabla crea la migración `1746000005000_create-requests.js`? ¿Qué columnas tiene?
2. ¿Qué hace el método `exports.down` en cualquiera de los archivos? ¿Para qué sirve?
3. ¿Por qué los archivos tienen un número tan largo al inicio (ej. `1746000001000`)? ¿Qué representa ese número?

---

## Parte 2 — Crear la migración

Crea una nueva migración que agregue la columna `priority` a la tabla `requests`.

**Especificaciones de la columna:**
- Tipo: `VARCHAR(20)`
- No nula
- Valor por defecto: `'normal'`
- Valores válidos a usar en la app: `'low'`, `'normal'`, `'high'`

**Pasos:**

1. Crea el archivo de migración usando el comando de `node-pg-migrate`, que genera el timestamp automáticamente y crea el archivo con la estructura base lista:

```bash
cd server
npx node-pg-migrate create add-priority-to-requests -m src/db/migrations
```

Esto genera un archivo como `1746123456789_add-priority-to-requests.js` con el siguiente contenido:

```js
exports.up = (pgm) => {

}

exports.down = (pgm) => {

}
```

2. Implementa `exports.up` para agregar la columna y `exports.down` para revertirla:

```js
exports.up = (pgm) => {
  pgm.addColumn('requests', {
    priority: { type: 'varchar(20)', notNull: true, default: 'normal' }
  })
}

exports.down = (pgm) => {
  pgm.dropColumn('requests', 'priority')
}
```

3. Aplica la migración:

```bash
cd server
npm run migrate
```

4. Verifica que la columna existe conectándote a la base de datos o revisando que no hubo errores en la consola.

5. Revierte la migración:

```bash
npm run migrate:down
```

6. Vuelve a aplicarla:

```bash
npm run migrate
```

---

## Parte 3 — Segunda migración (por tu cuenta)

Ahora crea una segunda migración que agregue la columna `phone` a la tabla `users`, usa la documentación de referencia al final de esta guía.

**Especificaciones de la columna:**
- Tipo: `VARCHAR(20)`
- Nullable (no todos los usuarios tendrán teléfono)
- Sin valor por defecto

> Pista: una columna nullable no necesita `notNull` ni `default`. Revisa la documentación para ver cómo declarar solo el tipo.

Aplica la migración, verifícala, reviértela y vuelve a aplicarla — igual que en la Parte 2.

---

## Parte 4 — Frontend (libre)

Las dos columnas ya existen en la base de datos. Elige al menos una y muéstrala en algún lugar de la interfaz:

- `priority` en `requests` ideas: columna en `RequestList`, badge en `RequestDetail`
- `phone` en `users` ideas: columna en `UserList`, detalle de perfil

No hay una respuesta correcta única. Lo importante es que el dato llegue desde el backend y se muestre en pantalla.

---

## Referencias

- [node-pg-migrate — Tables](https://salsita.github.io/node-pg-migrate/migrations/tables) — documentación de `addColumn`, `dropColumn` y el resto de operaciones sobre tablas.

---

## Requisitos de entrega

1. Existe una migración para `priority` en `requests`: `VARCHAR(20)`, `NOT NULL`, default `'normal'`.
2. Existe una migración para `phone` en `users`: `VARCHAR(20)`, nullable, sin default.
3. Ambas migraciones tienen `exports.down` que revierte exactamente lo que hace `exports.up`.
4. Ambas migraciones se aplican sin errores con `npm run migrate`.
5. Ambas migraciones son idempotentes: `migrate:down` + `migrate` da el mismo resultado.
6. Al menos una de las dos columnas se muestra en algún lugar de la interfaz.
