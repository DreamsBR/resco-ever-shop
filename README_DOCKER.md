# Guia de Despliegue con Docker

## Requisitos previos

- [Docker](https://www.docker.com/get-started) instalado y ejecutandose.
- [Docker Compose](https://docs.docker.com/compose/install/) (generalmente incluido con Docker Desktop).

## Estructura de Archivos

- **Dockerfile**: Imagen de la app Node.js. Compila TypeScript de extensiones y temas, construye los assets de EverShop y prepara la app para produccion.
- **docker-compose.yml**: Orquesta los servicios `app` (EverShop) y `database` (PostgreSQL 16).
- **config/custom-environment-variables.json**: Mapea variables de entorno a la configuracion de EverShop.

## Despliegue inicial

```bash
# 1. Construir y levantar los contenedores
docker compose up -d --build

# 2. Crear usuario administrador
docker compose exec app npm run user:create -- -n "Nombre" -e "email@ejemplo.com" -p "contraseña"
```

## Comandos frecuentes

### Levantar los contenedores

```bash
docker compose up -d
```

### Reconstruir la imagen (cambios en tema, extensiones o dependencias)

```bash
docker compose up -d --build
```

> El build tarda ~6-7 minutos (compilacion Client + Server).

### Reconstruir sin cache (si los cambios no se reflejan)

```bash
docker compose build --no-cache && docker compose up -d
```

### Reiniciar la app (cambios en config o variables de entorno)

```bash
docker compose restart app
```

> No requiere rebuild. La config se monta como volumen y las variables de entorno se leen en runtime.

### Ver logs

```bash
# Logs de la app
docker compose logs app

# Logs en tiempo real
docker compose logs -f app

# Logs de la base de datos
docker compose logs database
```

### Ver estado de los contenedores

```bash
docker compose ps
```

### Detener los contenedores

```bash
# Detener sin borrar datos
docker compose down

# Detener Y BORRAR la base de datos (CUIDADO)
docker compose down --volumes
```

### Administracion de usuarios

```bash
# Crear usuario admin
docker compose exec app npm run user:create -- -n "Nombre" -e "email@ejemplo.com" -p "contraseña"

# Cambiar contraseña
docker compose exec app npm run user:changePassword
```

### Acceder al contenedor

```bash
docker compose exec app sh
```

### Conectarse a la base de datos

```bash
# Desde el contenedor
docker compose exec database psql -U postgres

# Desde el host
psql -h localhost -p 5433 -U postgres
```

## Variables de entorno

Configuradas en `docker-compose.yml`:

| Variable | Descripcion | Ejemplo |
|---|---|---|
| `SHOP_HOME_URL` | URL publica de la tienda | `http://34.135.184.185:3000` |
| `DB_HOST` | Host de la base de datos | `database` |
| `DB_PORT` | Puerto de PostgreSQL | `5432` |
| `DB_USER` | Usuario de la base de datos | `postgres` |
| `DB_PASSWORD` | Contraseña de la base de datos | `postgres` |
| `DB_NAME` | Nombre de la base de datos | `postgres` |

Para cambiar la IP publica, edita `SHOP_HOME_URL` en `docker-compose.yml` y reinicia:

```bash
docker compose restart app
```

## Acceso

| Servicio | URL |
|---|---|
| Tienda (front) | `http://<IP>:3000` |
| Panel admin | `http://<IP>:3000/admin` |
| PostgreSQL (host) | `localhost:5433` |

## Persistencia de datos

- **Base de datos**: Volumen nombrado `postgres-data`. Persiste entre reinicios y rebuilds. Solo se borra con `docker compose down --volumes`.
- **Media**: Carpeta `./media` montada como volumen.
- **Config**: Carpeta `./config` montada como volumen. Cambios se aplican con `restart`.

## Desarrollo local

Para desarrollo sin Docker:

```bash
npm run dev
```

No necesita `SHOP_HOME_URL`. Usa `http://localhost:3000` por defecto.

## Notas importantes

- El tema (`themes/sample/package.json`) debe tener `"type": "module"` para que EverShop detecte los componentes correctamente.
- Los archivos no-TypeScript (`.graphql`, `route.json`, `.css`) se copian automaticamente de `src/` a `dist/` durante el build de Docker.
- Si el puerto 5432 esta ocupado en el host, el contenedor de PostgreSQL mapea al puerto `5433`.
