# Guía de Despliegue con Docker

Este proyecto ha sido dockerizado para facilitar su despliegue en producción. A continuación se detallan los pasos para construir y ejecutar la aplicación.

## Requisitos previos

- [Docker](https://www.docker.com/get-started) instalado y ejecutándose.
- [Docker Compose](https://docs.docker.com/compose/install/) (generalmente incluido con Docker Desktop).

## Estructura de Archivos

Se han creado los siguientes archivos clave:

- **Dockerfile**: Define la imagen de la aplicación Node.js, copiando los archivos necesarios (`themes`, `extensions`, `config`, `public`, `translations`), instalando dependencias, construyendo el proyecto y moviendo los assets generados a `public/assets`.
- **docker-compose.yml**: Orquesta los servicios `app` (la tienda Evershop) y `database` (PostgreSQL 16).

## Despliegue

Para levantar el entorno, ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d --build
```

- La opción `-d` ejecuta los contenedores en segundo plano (detached mode).
- La opción `--build` fuerza la reconstrucción de la imagen de la aplicación para asegurar que los últimos cambios se incluyan.

## Verificar el estado

Puedes verificar que los contenedores estén corriendo con:

```bash
docker compose ps
```

## Acceso

Una vez desplegado:

- **Aplicación**: Accesible en `http://localhost:3000`
- **Base de datos**: Expuesta en el puerto `5432` (Usuario: `postgres`, Password: `postgres`, DB: `postgres`)

## Notas Importantes

- **Carpeta `translations`**: Se ha creado una carpeta vacía `translations` ya que es requerida por el proceso de construcción en el Dockerfile (`COPY translations ./translations`). Si tienes archivos de traducción, colócalos ahí.
- **Persistencia de Datos**: Los datos de PostgreSQL se guardan en el volumen `postgres-data`. Las imágenes y medios se guardan en la carpeta local `./media` que está montada en el contenedor.
